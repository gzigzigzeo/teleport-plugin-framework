import { HandleEvent } from "./event_handler"
import { handleEvent as handle } from '../vendor/handle_event';

// handleEvent is the event handler plugin entry point. It decodes the request and returns the encoded response.
export function handleEvent(requestData: ArrayBuffer): ArrayBuffer {
    return handle<HandleEvent>(requestData);
}            
