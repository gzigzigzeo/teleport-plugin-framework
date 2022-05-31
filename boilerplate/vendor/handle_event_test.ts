import { getFixture as getRawFixture, getLatestAPIRequest } from './test';
import { events, Request, HandleEventBase, Response } from './handle_event';
import { handleEvent as handleEventBase } from './handle_event';

export { getLatestAPIRequest };

// Wraps fixture to HandleEventRequest object and returns it
export function getFixture(n: i32): ArrayBuffer {
    const fixture = getRawFixture(n)
    const request = new Request()
    const event = events.OneOf.decode(fixture)
    request.Event = event
    return request.encode()
}

// Wraps handleEvent<T> and returns response
export function handleEvent<T extends HandleEventBase>(requestData: ArrayBuffer): Response {
    const responseData = handleEventBase<T>(requestData)
    return Response.decode(responseData)
}