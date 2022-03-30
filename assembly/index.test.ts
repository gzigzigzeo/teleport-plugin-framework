export { __protobuf_alloc, __protobuf_getAddr, __protobuf_getLength } from "../boilerplate/vendor/teleport"
import { test as testEventHandler } from "./event_handler.test"

export function test(): void {
    testEventHandler()
}