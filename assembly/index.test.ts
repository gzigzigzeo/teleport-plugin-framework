import { test as testEventHandler } from "./event_handler.test"
import { test as testRewriteHeaders } from "./rewrite_headers.test"

export function test(): void {
    trace("teleport-plugin-framework tests")

    testEventHandler()
    testRewriteHeaders()

    trace("Success!")
}