import { encode, decode } from "as-base64/assembly/index"
export { encode, decode } from "as-base64/assembly/index"

// encodes string value to base64
export function encodeString(value: string): string {
    return encode(Uint8Array.wrap(String.UTF8.encode(value)))
}

// decodes string value from base64
export function decodeString(value: string): string {
    return String.UTF8.decode(decode(value))
}
