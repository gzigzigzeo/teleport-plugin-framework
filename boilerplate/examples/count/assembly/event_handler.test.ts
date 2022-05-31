// Test helper methods
import { getFixture, getLatestAPIRequest, handleEvent } from '../../../vendor/handle_event_test';

// Event handler class
import { HandleEvent } from './event_handler';

// types namespace contains lock object
import { types } from '../../../vendor/handle_event';

// test function
export function test(): void {
    const request = getFixture(1)

    // Fail to login 4 times
    handleEvent<HandleEvent>(request)
    handleEvent<HandleEvent>(request)
    handleEvent<HandleEvent>(request)
    handleEvent<HandleEvent>(request)

    const apiRequest = getLatestAPIRequest()
    assert(apiRequest != null, "API request is missing")

    const lock = types.LockV2.decode(apiRequest)
    assert(lock.Spec.Target.Login == "foo", "Lock user foo has not been generated")
}
