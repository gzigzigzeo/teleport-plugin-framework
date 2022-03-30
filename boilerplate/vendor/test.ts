import { events, plugin } from './teleport';

// Returns size of a fixture with number n
declare function getFixtureSize(n: i32): i32;

// Copies fixture number n to the addr
declare function getFixtureBody(n: i32, addr: usize): void;

// Returns DataView of a fixture number n
export function getFixture(n: i32): DataView {
    const size = getFixtureSize(n);
    const view = new DataView(new ArrayBuffer(size));
    getFixtureBody(n, changetype<usize>(view.buffer) + view.byteOffset);
    return view;
}

// Returns HandleEventReuqest object with event taken from fixture n
export function getFixtureAsHandleEventRequest(n: i32): DataView {
    const fixture = getFixture(n)
    const request = new plugin.HandleEventRequest()
    request.Event = events.OneOf.decode(fixture)
    return request.encode()
}

// Returns size of a fixture with number n
declare function getLatestAPIRequestSize(): i32;

// Copies fixture number n to the addr
declare function getLatestAPIRequestBody(addr: usize): void;

// Returns DataView of a fixture number n
export function getLatestAPIRequest(): DataView {
    const size = getLatestAPIRequestSize();
    const view = new DataView(new ArrayBuffer(size));
    getLatestAPIRequestBody(changetype<usize>(view.buffer) + view.byteOffset);
    return view;
}
