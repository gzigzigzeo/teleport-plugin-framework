import { events, plugin } from './teleport/teleport';

// Returns size of a fixture with number n
declare function getFixtureSize(n: i32): i32;

// Copies fixture number n to the addr
declare function getFixtureBody(n: i32, addr: usize): void;

// Returns DataView of a fixture number n
export function getFixture(n: i32): ArrayBuffer {
    const size = getFixtureSize(n);
    const buf = new ArrayBuffer(size);
    getFixtureBody(n, changetype<usize>(buf));
    return buf;
}

// Returns size of a fixture with number n
declare function getLatestAPIRequestSize(): i32;

// Copies fixture number n to the addr
declare function getLatestAPIRequestBody(addr: usize): void;

// Returns DataView of a fixture number n
export function getLatestAPIRequest(): ArrayBuffer {
    const size = getLatestAPIRequestSize();
    const buf = new ArrayBuffer(size);
    getLatestAPIRequestBody(changetype<usize>(buf));
    return buf;
}

// Defines mock secret manager 
export declare function defineAWSsecret(name: string, value: string): void;
