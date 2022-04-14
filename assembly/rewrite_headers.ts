import { getSecretString } from '../boilerplate/vendor/aws_secrets_manager'
import { plugin } from "../boilerplate/vendor/teleport"

// rewriteHeaders rewrites HTTP headers
export function rewriteHeaders(request: plugin.RewriteHeadersRequest): plugin.RewriteHeadersResponse {
    const response = new plugin.RewriteHeadersResponse()

    if (request.Headers.has("must-fail")) {
        response.Success = false
        response.Error = "failure"
        return response
    }

    const headers = request.Headers
    headers.set("foo", "bar")
    headers.set("secretmanager", getSecretString("baz"))

    response.Headers = headers
    response.Success = true
    
    return response
}