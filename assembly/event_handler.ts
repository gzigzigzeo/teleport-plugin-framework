// protobuf classes for host message exchange
import { events, google, Event, plugin } from '../boilerplate/vendor/teleport';
// memory data store for event count calculations
import * as store from '../boilerplate/vendor/store';
// API methods
import { createLock } from '../boilerplate/vendor/api';

const maxFailedLoginAttempts = 3;     // 3 tries
const failedAttemptsTimeout = 60 * 5; // within 5 minutes

// handleEvent is the main plugin function
export function handleEvent(request: plugin.HandleEventRequest): plugin.HandleEventResponse {
    const response = new plugin.HandleEventResponse();

    if (rejectEvent(request.Event)) {
        response.Success = true
        return response
    }

   const event = addRequiredLabels(request.Event)
   createLockBasedOnEvent(event)

   response.Event = request.Event
   response.Success = true

   return response
}

// Return true if an event must be rejected
function rejectEvent(event: Event): bool {
    if (event.UserLogin != null) {
        const userLogin = event.UserLogin as events.UserLogin
        if (userLogin.User.Login == "secret-santa") {
            return true;
        }
    }

    return false;
}

// Adds label to access request create
function addRequiredLabels(event: Event): Event {
    if (event.AccessRequestCreate != null) {
        const request = event.AccessRequestCreate as events.AccessRequestCreate;

        const value = new google.protobuf.Value()
        value.string_value = "yes"

        request.Annotations.fields.set("seen-by-us", value)
    }

    if (event.RoleCreate != null) {
        const roleCreate = event.RoleCreate as events.RoleCreate;

        roleCreate.Metadata.ClusterName = "changed-cluster-name"
    }

    return event;
}

function createLockBasedOnEvent(event: Event): void {
    if (event.UserLogin != null) {
        const login = event.UserLogin as events.UserLogin;

        // If a login was not successful        
        if (login.Status.Success == false) {
            // Record login attempt and get current attempts within the time frame for a user
            const count = store.takeToken(login.User.Login, failedAttemptsTimeout) // 5 minutes

            // If limit is exceeded
            if (count > maxFailedLoginAttempts) {
                trace("Suspicious login activity detected, attempts made:", 1, count)
                trace("Creaing lock for user " + login.User.Login)

                // Create lock
                createLock(login.User, 3600, "Suspicious login")
            }
        }
    }
}