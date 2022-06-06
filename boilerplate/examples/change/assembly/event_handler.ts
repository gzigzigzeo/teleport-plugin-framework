// Event protobuf class
import { AccessRequestCreate } from '../../../vendor/teleport/events';
import { HandleEventBase } from '../../../vendor/handle_event';

export class HandleEvent extends HandleEventBase {
    accessRequestCreate(event: AccessRequestCreate): void {
        event.Annotations.get("seen-by-us").set("yes")
    }
}