import { types, google, events } from './teleport';

// usertLock calls API with the provided lock
export declare function upsertLock(lock: ArrayBuffer): void;

// createLock creates lock for user
export function createLock(user: events.UserMetadata, timeout: i64, message: string): void {
    const lock = new types.LockV2()
    lock.Metadata = new types.Metadata()
    lock.Metadata.Name = "wasm-plugin-lock-" + user.Login;
    
    lock.Spec = new types.LockSpecV2()
    lock.Spec.Message = message
    
    lock.Spec.Target = new types.LockTarget()
    lock.Spec.Target.Login = user.Login;
    lock.Spec.Target.User = user.User;
    
    lock.Spec.Expires = new google.protobuf.Timestamp()
    lock.Spec.Expires.seconds = (Date.now() / 100) + timeout;

    const encoded = lock.encode()
    upsertLock(encoded)
}
