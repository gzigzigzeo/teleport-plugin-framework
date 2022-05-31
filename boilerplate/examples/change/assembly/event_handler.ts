// protobuf classes for host message exchange
import { google } from '../../../vendor/teleport/teleport';

// Event protobuf class
import { AccessRequestCreate } from '../../../vendor/teleport/events';
import { HandleEventBase } from '../../../vendor/handle_event';

export class HandleEvent extends HandleEventBase {
    accessRequestCreate(event: AccessRequestCreate): void {
        // Append "seen-by-us" annotation
        const value = new google.protobuf.Value()
        value.string_value = "yes"

        event.Annotations.fields.set("seen-by-us", value)        
    }
}