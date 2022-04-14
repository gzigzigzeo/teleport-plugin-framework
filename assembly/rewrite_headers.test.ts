import { plugin } from "../boilerplate/vendor/teleport";
import { rewriteHeaders } from "./index";
import { defineAWSsecret } from "../boilerplate/vendor/test"

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

    defineAWSsecret("baz", "baz")

    const requestData = request.encode()
    const responseData = rewriteHeaders(requestData)
    const response = plugin.RewriteHeadersResponse.decode(responseData)

    assert(response != null, "rewriteHeaders returned null response")
    assert(response.Headers.size == 3, "rewriteHeaders resulting headers length must be 2")
    assert(response.Success == true, "rewriteHeaders was not successfult")
    assert(response.Headers.get("foo") != null, "foo header is missing")
    assert(response.Headers.get("foo") == "bar", "foo header value is wrong")
    assert(response.Headers.get("secretmanager") != null, "secretmanager header is missing")
    assert(response.Headers.get("secretmanager") == "baz", "secretmanager header value is wrong")

}

// Ensure that nomal event passes through
function testAPIHeaderFailure(): void {
    const request = new plugin.RewriteHeadersRequest()

    request.Headers = new Map()
    request.Headers.set("must-fail", "true")

    defineAWSsecret("baz", "baz")

    const requestData = request.encode()
    const responseData = rewriteHeaders(requestData)
    const response = plugin.RewriteHeadersResponse.decode(responseData)

    assert(response != null, "rewriteHeaders returned null response")
    assert(response.Success == false, "rewriteHeaders was successful, must fail")
    assert(response.Error == "failure", "rewriteHeaders must be 'failure', is: " + response.Error)
}
