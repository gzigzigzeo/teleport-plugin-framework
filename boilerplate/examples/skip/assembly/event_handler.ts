import { HandleEventBase } from '../../../vendor/handle_event';
import { UserLogin } from '../../../vendor/teleport/events';

export class HandleEvent extends HandleEventBase {
    userLogin(event: UserLogin): void {
        if (event.User.Login == "secret-santa") {
            return this.skip() // Skip secret-santa login
        }        
    }
}