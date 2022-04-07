import { plugin } from "../vendor/teleport"

// rewriteHeaders rewrites HTTP headers
export function rewriteHeaders(request: plugin.RewriteHeadersRequest): plugin.RewriteHeadersResponse {
    const headers = request.Headers

    headers.set("API-Key", "foo")
    
    const response = new plugin.RewriteHeadersResponse()
    response.Headers = headers
    response.Success = true
    
    return response
}