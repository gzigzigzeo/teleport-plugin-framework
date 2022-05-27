// protobuf classes for host message exchange
import { events, google } from '../boilerplate/vendor/teleport/teleport';

// memory data store for event count calculations
import * as store from '../boilerplate/vendor/store';

// API methods
import { createLock } from '../boilerplate/vendor/api';

// Event protobuf class
import { HandleEventBase } from '../boilerplate/vendor/handle_event';

const maxFailedLoginAttempts = 3;     // 3 tries
const failedAttemptsTimeout = 60 * 5; // within 5 minutes

export class HandleEvent extends HandleEventBase {
    userLogin(event: events.UserLogin): void {
        // Skip secret santa login
        if (event.User.Login == "secret-santa") {
            return this.skip()
        }

        // Lock login after n attempts
        if (event.Status.Success == true) {
            return
        }

        // Record login attempt and get current attempts within the time frame for a user
        const count = store.takeToken(event.User.Login, failedAttemptsTimeout) // 5 minutes

        // If limit is exceeded
        if (count > maxFailedLoginAttempts) {
            trace("Suspicious login activity detected, attempts made:", 1, count)
            trace("Creaing lock for user " + event.User.Login)

            // Create lock
            createLock(event.User, 3600, "Suspicious login")
        }
    }

    accessRequestCreate(event: events.AccessRequestCreate): void {
        // Append "seen-by-us" annotation
        const value = new google.protobuf.Value()
        value.string_value = "yes"

        event.Annotations.fields.set("seen-by-us", value)        
    }

    roleCreate(event: events.RoleCreate): void {
        // Append cluster name
        event.Metadata.ClusterName = "changed-cluster-name"
    }
}