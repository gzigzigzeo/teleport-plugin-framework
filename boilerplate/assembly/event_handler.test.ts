import { getFixtureAsHandleEventRequest } from '../vendor/test';
import { events, plugin } from '../vendor/teleport';
import { handleEvent } from './index';

// Main test function
export function test(): void {
    trace("teleport-plugin-framework tests")

    // Get event from fixture #1
    const request = getFixtureAsHandleEventRequest(1)

    // Send test event to the plugin
    const responseData = handleEvent(request)
    assert(responseData != null, "handleEvent returned null response")
    
    // Decode the response
    const response = plugin.HandleEventResponse.decode(responseData)

    // Ensure that user login has not been changed
    const event = response.Event
    assert(event.UserCreate != null, "Event has changed")

    // Ensure that login has not been changed
    const userCreateEvent = event.UserCreate as events.UserCreate
    assert(userCreateEvent.User.Login == "foo", "Login has changed")

    trace("Success!")
}
