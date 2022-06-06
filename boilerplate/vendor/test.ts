// Gets fixture
declare function getFixture(n: i32): ArrayBuffer;

// Gets latest API request
declare function getLatestAPIRequest(): ArrayBuffer;

// Gets the next alert from the queue
declare function getAlert(): ArrayBuffer;

export { getFixture, getLatestAPIRequest, getAlert };
