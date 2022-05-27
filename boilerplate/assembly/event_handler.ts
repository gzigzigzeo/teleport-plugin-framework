// Event protobuf class
import { HandleEventBase, Event } from '../vendor/handle_event';

export class HandleEvent extends HandleEventBase {
    any(event: Event): void {
        trace(`Event received: ${event.type}, size: ${event.size()}`)
    }
}
