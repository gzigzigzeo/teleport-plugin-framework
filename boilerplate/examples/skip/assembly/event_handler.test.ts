// Test helper methods
import { getFixture, handleEvent } from '../../../vendor/handle_event_test';

// Event handler class
import { HandleEvent } from './event_handler';

// UserLogin event
import { UserLogin } from '../../../vendor/teleport/events';

// test function
export function test(): void {
    testRegularUsersShown()
    testSecretSantaHidden()
}

// test that regular users UserLogin events are passed through
function testRegularUsersShown():void {
    // Load fixture #1 (UserCreate event) as protobuf message for regular login
    const request = getFixture(1)

    // Send message to the event handler
    const response = handleEvent<HandleEvent>(request)

    // Check that response contains UserLogin event
    const event = response.Event
    assert(event.UserLogin != null, "UserLogin event is missing in the response")

    // Check that response UserLogin event login is "foo"
    const userLoginEvent = event.UserLogin as UserLogin
    assert(userLoginEvent.User.Login == "not-secret-santa", "not-secret-santa UserLogin event is skipped")
}

// test that secret-santa user logins are hidden
function testSecretSantaHidden():void {
    // Load fixture #1 (UserCreate event) as protobuf message for secret santa
    const request = getFixture(2)

    // Send message to the event handler
    const response = handleEvent<HandleEvent>(request)

    // Check that response contains UserLogin event
    const event = response.Event
    assert(event.UserLogin == null, "secret-santa UserLogin event is not hidden")    
}