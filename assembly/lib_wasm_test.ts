import { sleep } from 'as-sleep/assembly/index';
import { getSecretString } from '../boilerplate/vendor/aws_secrets_manager';
import { events, plugin } from '../boilerplate/vendor/teleport';

export declare function goMethod():void;

export function ok():i32 {
    return 1;
}

export function throwError():void {
    throw new Error("Failure");
}

export function getStringReturnString(key: string): string {
    assert(key == "foo", "getStringReturnString string is not 'foo'")
    return "bar"
}

export function infiniteLoop():void {
    while(1);
}

export function delay100ms():void {
    sleep(100);
}

export function goMethodEntryPoint():void {
    goMethod();
}

export function getEventIndex(view: ArrayBuffer):i64 {
    const event = events.OneOf.decode(view)
    if (event.UserCreate == null) {
        return 0
    }
    const userCreate = event.UserCreate as events.UserCreate;
    return userCreate.Metadata.Index
}

export function handleEvent(view: ArrayBuffer): ArrayBuffer {
    const request = plugin.HandleEventRequest.decode(view)
    const response = new plugin.HandleEventResponse()

    response.Success = false;

    // On UserCreate return error
    if (request.Event.type == "UserCreate") {
        response.Error = "UserCreate event is not allowed"
    } 

    // On UserLogin return success, modified event
    if (request.Event.type == "UserLogin") {    
        response.Success = true;
        response.Event = request.Event;

        const userLogin = response.Event.UserLogin as events.UserLogin
        userLogin.Metadata.Index = 999;
    }

    // On UserDelete return success, no event
    if (request.Event.type == "UserDelete") {
        response.Success = true;
    }

    return response.encode();
}

export function getSecret(name: string): string {
    return getSecretString(name)
}