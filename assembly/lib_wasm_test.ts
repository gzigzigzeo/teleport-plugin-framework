import { sleep } from 'as-sleep/assembly/index';
import { events, plugin } from '../boilerplate/vendor/teleport';

export {
    __protobuf_alloc,
    __protobuf_getAddr,
    __protobuf_getLength,
} from '../boilerplate/vendor/teleport';

export function ok():i32 {
    return 1;
}

export function fail():i32 {
    throw new Error("Failure");
}

export function infinite():i32 {
    while(1);
    return 0;
}

export function delay100ms(): void {
    sleep(100);
}

export function getEventIndex(view: DataView):i64 {
    const event = events.OneOf.decode(view)
    if (event.UserCreate == null) {
        return 0
    }
    const userCreate = event.UserCreate as events.UserCreate;
    return userCreate.Metadata.Index
}

export function handleEvent(view: DataView): DataView {
    const request = plugin.HandleEventRequest.decode(view)
    const response = new plugin.HandleEventResponse()

    response.Success = false;

    // On UserCreate return error
    if (request.Event.__oneOf_Event == "UserCreate") {
        response.Error = "UserCreate event is not allowed"
    } 

    // On UserLogin return success, modified event
    if (request.Event.__oneOf_Event == "UserLogin") {    
        response.Success = true;
        response.Event = request.Event;

        const userLogin = response.Event.UserLogin as events.UserLogin
        userLogin.Metadata.Index = 999;
    }

    // On UserDelete return success, no event
    if (request.Event.__oneOf_Event == "UserDelete") {
        response.Success = true;
    }

    return response.encode();
}