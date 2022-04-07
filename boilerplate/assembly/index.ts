import { plugin } from "../vendor/teleport"
import { handleEvent as handleEventActual } from "./event_handler"
import { rewriteHeaders as rewriteHeadersActual } from "./rewrite_headers"

export { __protobuf_alloc, __protobuf_getAddr, __protobuf_getLength } from "../vendor/teleport"

// handleEvent is the event handler plugin entrypoint
export function handleEvent(requestData: DataView): DataView {
    let request:plugin.HandleEventRequest = plugin.HandleEventRequest.decode(requestData);
    const response = handleEventActual(request)
    return response.encode()
}            

// rewriteHeaders is the HTTP headers rewrite entrypoint
export function rewriteHeaders(requestData: DataView): DataView {
    let request:plugin.RewriteHeadersRequest = plugin.RewriteHeadersRequest.decode(requestData);
    const response = rewriteHeadersActual(request)
    return response.encode()
}