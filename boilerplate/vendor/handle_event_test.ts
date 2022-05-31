import { getFixture as getRawFixture, getLatestAPIRequest } from './test'
import { events, Request } from './handle_event'
import { handleEvent as handleEventBase } from '../assembly'
export { getLatestAPIRequest };

// Wraps fixture to HandleEventRequest object and returns it
export function getFixture(n: i32): ArrayBuffer {
    const fixture = getRawFixture(n)
    const request = new Request()
    const event = events.OneOf.decode(fixture)
    request.Event = event
    return request.encode()
}

// Calls handleEvent
export function handleEvent(requestData: ArrayBuffer): ArrayBuffer {
    return handleEventBase(requestData)
}