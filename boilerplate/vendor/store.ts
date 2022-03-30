// takeToken reserves token with TTL within the scope
export declare function takeToken(scope: string, ttl: i32): i32;

// releaseTokens removes tokens from the scope
export declare function releaseTokens(scope: string): void;