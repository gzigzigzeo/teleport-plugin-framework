import { plugin } from '../vendor/teleport';
import { handleEvent as handleEventActual } from "./event_handler"

export { __protobuf_alloc, __protobuf_getAddr, __protobuf_getLength } from "../vendor/teleport"

// handleEvent is the event handler plugin entrypoint
export function handleEvent(requestData: DataView): DataView {
    let request:plugin.HandleEventRequest = plugin.HandleEventRequest.decode(requestData);
    const response = handleEventActual(request)
    return response.encode()
}            
