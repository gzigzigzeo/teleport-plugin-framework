// Event protobuf class
import { plugin } from '../vendor/teleport';

// Plugin entry point
export function handleEvent(request: plugin.HandleEventRequest): plugin.HandleEventResponse {
    const event = request.Event;
    const response = new plugin.HandleEventResponse();

    trace("Event of type " + event.type + " received") // Print the event type

    response.Event = event;
    response.Success = true;

    return response;
}
