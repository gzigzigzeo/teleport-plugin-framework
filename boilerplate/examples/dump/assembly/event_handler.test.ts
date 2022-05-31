// Test helper methods
import { getFixture, handleEvent } from '../../../vendor/handle_event_test';

// Event handler class
import { HandleEvent } from './event_handler';

// UserCreate event
import { UserCreate } from '../../../vendor/teleport/events';

// test function
export function test(): void {
    // Load fixture #1 (UserCreate event) as protobuf message
    const request = getFixture(1)

    // Send message to the event handler
    const response = handleEvent<HandleEvent>(request)

    // Check that response contains UserCreate event
    const event = response.Event
    assert(event.UserCreate != null, "UserCreate event is missing in the response")

    // Check that response UserCreate event login is "foo"
    const userCreateEvent = event.UserCreate as UserCreate
    assert(userCreateEvent.User.Login == "foo", "UserCreate user login has changed")
}
