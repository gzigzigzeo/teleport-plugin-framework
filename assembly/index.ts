import { plugin } from '../boilerplate/vendor/teleport';
import { handleEvent as handleEventActual } from "./event_handler"

// handleEvent is the event handler plugin entrypoint
export function handleEvent(requestData: ArrayBuffer): ArrayBuffer {
    let request:plugin.HandleEventRequest = plugin.HandleEventRequest.decode(requestData);
    const response = handleEventActual(request)
    return response.encode()
}