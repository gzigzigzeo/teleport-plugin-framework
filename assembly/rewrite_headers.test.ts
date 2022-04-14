import { plugin } from "../boilerplate/vendor/teleport";
import { rewriteHeaders } from "./index";

// Main test function
export function test(): void {
    testAPIHeader()
    testAPIHeaderFailure()
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
    assert(response.Success == true, "rewriteHeaders was not successfult")
    assert(response.Headers.get("API-Key") != null, "API-Key header is missing")
    assert(response.Headers.get("API-Key") == "foo", "API-Key header value is wrong")
}

// Ensure that nomal event passes through
function testAPIHeaderFailure(): void {
    const request = new plugin.RewriteHeadersRequest()

    request.Headers = new Map()
    request.Headers.set("must-fail", "true")

    const requestData = request.encode()
    const responseData = rewriteHeaders(requestData)
    const response = plugin.RewriteHeadersResponse.decode(responseData)

    assert(response != null, "rewriteHeaders returned null response")
    assert(response.Success == false, "rewriteHeaders was successful, must fail")
    assert(response.Error == "failure", "rewriteHeaders must be 'failure', is: " + response.Error)
}
