import { plugin } from "../vendor/teleport";
import { handleEvent as handleEventActual } from "./event_handler"
import { rewriteHeaders as rewriteHeadersActual } from './rewrite_headers';

// handleEvent is the event handler plugin entrypoint
export function handleEvent(requestData: ArrayBuffer): ArrayBuffer {
    let request:plugin.HandleEventRequest = plugin.HandleEventRequest.decode(requestData);
    const response = handleEventActual(request)
    return response.encode()
}            

// rewriteHeaders is the HTTP headers rewrite entrypoint
export function rewriteHeaders(requestData: ArrayBuffer): ArrayBuffer {
    let request:plugin.RewriteHeadersRequest = plugin.RewriteHeadersRequest.decode(requestData);
    const response = rewriteHeadersActual(request)
    return response.encode()
}