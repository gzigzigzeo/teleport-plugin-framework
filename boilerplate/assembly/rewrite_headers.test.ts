import { plugin } from "../vendor/teleport";
import { rewriteHeaders } from "./index";

// Main test function
export function test(): void {
    testAPIHeader()
}

// Ensure that nomal event passes through
function testAPIHeader(): void {
    const request = new plugin.RewriteHeadersRequest()
    request.Headers = new Map()

    request.Headers.set("Content-Type", "text/plain")

    const requestData = request.encode()
    const responseData = rewriteHeaders(requestData)
    const response = plugin.RewriteHeadersResponse.decode(responseData)

    assert(response != null, "rewriteHeaders returned null response")
    assert(response.Headers.size == 2, "rewriteHeaders resulting headers length must be 2")
    assert(response.Success == true, "Response was not successfult")
    assert(response.Headers.get("API-Key") != null, "API-Key header is missing")
    assert(response.Headers.get("API-Key") == "foo", "API-Key header value is missing")
}
