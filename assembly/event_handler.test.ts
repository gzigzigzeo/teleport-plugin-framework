import { getFixture, getLatestAPIRequest } from '../boilerplate/vendor/handle_event_test';
import { events, plugin, types } from '../boilerplate/vendor/teleport/teleport';
import { handleEvent } from "../boilerplate/assembly/index"

// Main test function
export function test(): void {
    testRegularEvent();
    testSkipLoginSecretSanta();
    testAddAnnotation();
    testLocking();
}

// Ensure that nomal event passes through
function testRegularEvent(): void {
    const request = getFixture(1)
    assert(handleEvent(request) != null, "handleEvent returned null response")
}

// Ensure that secret santa login hids
function testSkipLoginSecretSanta(): void {
    const request = getFixture(2)
    const response = plugin.HandleEventResponse.decode(handleEvent(request))

    assert(response.Event.type == "", "Event was not rejected")
}

// Ensure that custom annotation is added to the create access request
function testAddAnnotation(): void {
    const request = getFixture(3)
    const response = plugin.HandleEventResponse.decode(handleEvent(request))

    assert(response.Event.AccessRequestCreate != null, "AccessRequestCreate is missing")

    const event = response.Event.AccessRequestCreate as events.AccessRequestCreate;
    assert(
        event.Annotations.fields.get("seen-by-us").string_value == "yes", 
        "seen-by-us annotation is not set"
    )
}

function testLocking(): void {
    const request = getFixture(4)

    handleEvent(request)
    handleEvent(request)
    handleEvent(request)

    const response = plugin.HandleEventResponse.decode(handleEvent(request))
    assert(response != null, "Event has not been processed")

    const apiRequest = getLatestAPIRequest()
    assert(apiRequest != null, "API request is missing")

    const lock = types.LockV2.decode(apiRequest)
    assert(lock.Spec.Target.Login == "foo", "Lock user foo has not been generated")
}
