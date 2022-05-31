import { HandleEventBase } from '../../../vendor/handle_event';
import { UserLogin } from '../../../vendor/teleport/events';
import * as store from '../../../vendor/store';
import { createLock } from '../../../vendor/api';

export class HandleEvent extends HandleEventBase {
    // maximum failed login attempts
    static readonly maxAttempts:i32 = 3;

    // within time window
    static readonly timeWindow:i32 = 5 * 60;

    userLogin(event: UserLogin): void {
        // We do not count success events
        if (event.Status.Success == true) {
            return
        }

        // Record login attempt and get current failed attempts count within the last 5 minutes
        const count = store.takeToken(event.User.Login, HandleEvent.timeWindow)

        // If there are more than 3 failed login attempts in last 5 minutes - create lock
        if (count > HandleEvent.maxAttempts) {
            trace("Suspicious login activity detected, attempts made:", 1, count)
            trace("Creaing lock for user " + event.User.Login)

            // Call API, create lock
            createLock(event.User, 3600, "Suspicious login")
        }
   }
}