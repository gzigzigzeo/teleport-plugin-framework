import { test as testEventHandler } from "./event_handler.test"

export function test(): void {
    trace("teleport-plugin-framework tests")

    testEventHandler()

    trace("Success!")
}