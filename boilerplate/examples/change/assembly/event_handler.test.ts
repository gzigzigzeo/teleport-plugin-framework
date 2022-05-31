// Test helper methods
import { getFixture, handleEvent } from '../../../vendor/handle_event_test';

// Event handler class
import { HandleEvent } from './event_handler';

// AccessRequestCreate event
import { AccessRequestCreate } from '../../../vendor/teleport/events';

// test function
export function test(): void {
    // Load fixture #1 (AccessRequestCreate event) as protobuf message
    const request = getFixture(1)

    // Send message to the event handler
    const response = handleEvent<HandleEvent>(request)

    // Check that response contains AccessRequestCreate event
    const event = response.Event
    assert(event.AccessRequestCreate != null, "AccessRequestCreate event is missing in the response")

    const accessRequestCreate = event.AccessRequestCreate as AccessRequestCreate
    assert(
        accessRequestCreate.Annotations.fields.get("seen-by-us").string_value == "yes", 
        "seen-by-us annotation is not set"
    )
}
