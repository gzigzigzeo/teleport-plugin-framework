# Teleport WASM plugin framework

Teleport WASM plugin framework allows to manipulate events forwarded by `event-handler`.

# Prerequisites

* go 1.17+
* node >= 16.3 < 17 (please, use [nvm](https://github.com/nvm-sh/nvm) to install specific version)
* yarn (check [YARN installation instructions](https://classic.yarnpkg.com/lang/en/docs/install/))

# Installation

## Conventional architecture

Run:

```sh
go install github.com/gzigzigzeo/teleport-plugin-framework@latest
```

## Mac M1

Install [Rust](https://www.rust-lang.org/tools/install).

Run:

```sh
git clone git@github.com:gzigzigzeo/teleport-plugin-framework.git
cd teleport-plugin-framework
make get-custom-wasmer-runtime
make build
```

_NOTE: Change repo URL once merged_

# Start the new plugin from scratch

## Generate the plugin

Run the following command to generate the minimal plugin setup:

```sh
./build/teleport-plugin-framework new ~/teleport-plugin
```

The tool will check if required node and yarn version is installed in the system, will create file structure for the example plugin and will run `yarn install` in the target folder.

## Check the generated plugin

Run:

```sh
cd ~/teleport-plugin && yarn test
```

This will show the following output:

```sh
INFO[0000] teleport-plugin-framework tests
INFO[0000] Event of type UserCreate received
INFO[0000] Success!
```

Meaning that the setup was successful.

# How plugins work

WASM plugins can be written in any language which supports [WASM as a target](https://webassembly.org/getting-started/developers-guide/). The most reliable choices are [Rust](https://rust-lang.org), C/C++ and [AssemblyScript](https://assemblyscript.org/). We chose [AssemblyScript](https://assemblyscript.org/) as it has the simplest TypeScript-linke syntax and tiny runtime compared to the most available WASM languages.

## The folder structure

Every plugin consists of the following folders:

* `assembly` - the plugin code and tests.
* `build` - the target WASM binaries.
* `fixtures` - the test fixtures.
* `vendor` - external method definitions and helper code.

## The host-plugin message exchange

Teleport API uses [protocol buffers](https://developers.google.com/protocol-buffers). It is the main protocol for message exchange in Teleport. We use the same protocol to exchange messages with plugins. 

### `event-handler` plugins

`event-handler` tool is used to forward Teleport cluster events to fluentd. WASM plugin can act as a middleware for event forwarding.

The plugin pipeline is the following:

1. Event gets received by `event-handler` (it either can be main log event or session event).
2. `event-handler` encodes an event to the protobuf binary message (`HandleEventRequest`), copies it to the WASM memory and calls the `handleEvent` method.
3. `handleEvent` method decodes binary message into the counterpart `AssemblyScript` class instance.
4. After the processing is done, `handleEvent` encodes the result into protobuf binary message (`HandleEventResponse`) and returns it. 
5. `event-handler` decodes the result and sends it to fluentd. If a resulting event is null, message is skipped.

`HandleEventRequest` has the following definition:

```proto
message HandleEventRequest {
    events.OneOf Event = 1;
}
```

`HandleEventResponse` has the following definition:

```proto
message HandleEventResponse {
    bool Success = 1; // Request was successful
    string Error = 2; // Error message if a request was not successful
    events.OneOf Event = 3 [ (gogoproto.nullable) = true ]; // Modified event
}
```

`Event` field can be blank.

### HTTP header modifier plugins

This type of plugins are used to modify headers of a requests sent to Teleport applications.

`RewriteHeaderRequest` has the following definition:

```proto
message RewriteHeadersRequest {
    map<string, string> Headers = 1;
}
```

`RewriteHeaderResponse` is defined as:

```proto
message RewriteHeadersResponse {
    bool Success = 1;
    string Error = 2;
    map<string, string> Headers = 3;
}
```

# Minimal event plugin and test

The following code receives an upcoming event and returns it unchanged. Put it to `assembly/event_handler.ts`.

```ts
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
```

Now, put the following content into `assembly/event_handler.test.ts`:

```ts
import { getFixtureAsHandleEventRequest } from '../vendor/test';
import { events, plugin } from '../vendor/teleport';
import { handleEvent } from './index';

// Main test function
export function test(): void {
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
}
```

Run:

```sh
yarn test
```

You should see the following output:

```sh
INFO   teleport-plugin-framework tests  wasm/assembly_script_env.go:146
INFO   Success!  wasm/assembly_script_env.go:146
✨  Done in 2.23s.
```

Tests are run in the same environment and follow the same message exchange pipeline as the production environment do.

# Test fixtures

Test events are loaded from json files located in the `fixtures` folder. The fixture file name has the following template: `<id>-<description>.json` where id is the sequential fixture number.

## Fixture file structure

The fixture has the following structure:

```json
{
  "name": "events.user_create",
  "type": "types.OneOf",
  "description": "User login event",
  "data": {
    "UserCreate": {
      "Metadata": {
        "Index": 1,
        "ID": "36da4091-eb14-f814-69f8-5b97bd919e3d",
        "Type": "user.create",
        "ClusterName": "test-cluster",
        "Time": "2021-12-17T17:11:33+03:00"
      },
      "User": {
        "Login": "foo",
        "User": "foo"
      },
      "Resource": {
        "Name": "foo"
      },
      "Roles": [
        "test-user"
      ]
    }
  }
}
```

* `name` - internal fixture type name
* `type` - the protobuf message type name (would be `types.OneOf` for all events).
* `description` - fixture description
* `data` - fixture data

## Generating the fixture file

In the plugin folder, run the following command:

```sh
./teleport-plugin-framework fixtures list-templates
```

You will see the list of available fixture templates:

```sh
./teleport-plugin-framework fixtures generate events.user_create <name> - Create user event (types.OneOf)
./teleport-plugin-framework fixtures generate events.user_login <name> - User login event (types.OneOf)
```

To generate the fixture file from a template, choose the required type from the list and run:

```sh
./teleport-plugin-framework fixtures generate events.user_create supervisor
```

Where `supervisor` is the description.

You will get the following response:

```sh
Fixture generated: fixtures/5-supervisor.json
```

Now, you can open the file and change fixture data manually.

## Using the fixture file

To load a fixture in a test, use the following method:

```ts
let createSupervisorUserEvent = getFixture(5) // Where 5 is the fixture number
```

This would return `DataView` with protobuf-encoded fixture data. You can decode it:

```ts
const event = events.OneOf.decode(createSupervisorUserEvent)
```

To use fixture with `handleEvent`, call:

```ts
const request = getFixtureAsHandleEventRequest(5)
```

This method will treat fixture data as an event and will construct `plugin.HandleEventRequest` object.

Now, you can send this data to the `handlePlugin` method:

```ts
const response = handleEvent(request)
```

# Skipping events

Let's say we want to skip logins from a user named `secret-santa`.

Put the following code into `assembly/event_handler.ts`:

```ts
import { plugin, events } from '../vendor/teleport';

// Plugin entry point
export function handleEvent(request: plugin.HandleEventRequest): plugin.HandleEventResponse {
    const event = request.Event;
    const response = new plugin.HandleEventResponse();

    // If this is the login event
    if (event.UserLogin != null) {
        const userLogin = event.UserLogin as events.UserLogin

        // And secret santa tries to login - return success response with blank event
        if (userLogin.User.Login == "secret-santa") {
            response.Success = true;
            return response;
        }
    }

    // Pass the event through
    response.Event = event;
    response.Success = true;

    return response;
}
```

Fixture #2 in the test setup represents the login event of `secret-santa` user. Given that, put the following in `assembly/event_handler.test.ts`:

```ts
import { getFixtureAsHandleEventRequest } from '../vendor/test';
import { plugin } from '../vendor/teleport';
import { handleEvent } from './index';

// Main test function
export function test(): void {
    const request = getFixtureAsHandleEventRequest(2)
    const response = plugin.HandleEventResponse.decode(handleEvent(request))

    assert(response.Success == true, "Response was not successful")
    assert(response.Event.type == "", "Event was not rejected")
}
```

And run: `yarn test`.

# Modifying events

Let's say we want to add a label `'seen-by-us': 'yes'` to all access requests.

Put the following contents in the `assembly/event_handler.ts`:

```ts
import { plugin, events, google } from '../vendor/teleport';

// Plugin entry point
export function handleEvent(request: plugin.HandleEventRequest): plugin.HandleEventResponse {
    const event = request.Event;
    const response = new plugin.HandleEventResponse();

    if (event.AccessRequestCreate != null) {
        const request = event.AccessRequestCreate as events.AccessRequestCreate;

        const value = new google.protobuf.Value()
        value.string_value = "yes"

        request.Annotations.fields.set("seen-by-us", value)
    }

    // Pass the modified event through
    response.Event = event;
    response.Success = true;

    return response;
}
```

Fixture #3 in the test setup represents AccessRequest create event. Given that, put the following contents into `assembly/event_handler.test.ts`:

```ts
import { getFixtureAsHandleEventRequest } from '../vendor/test';
import { plugin, events } from '../vendor/teleport';
import { handleEvent } from './index';

// Main test function
export function test(): void {
    const request = getFixtureAsHandleEventRequest(3)
    const response = plugin.HandleEventResponse.decode(handleEvent(request))
    assert(response.Event.AccessRequestCreate != null, "AccessRequestCreate is missing")

    const event = response.Event.AccessRequestCreate as events.AccessRequestCreate;
    assert(
        event.Annotations.fields.get("seen-by-us").string_value == "yes", 
        "seen-by-us annotation is not set"
    )
}
```

Run: `yarn test`.

# Counting events and calling Teleport API

Let's say we want to lock user if he fails to login 3 times within latest 5 minutes.

Put the following content into `assembly/event_handler.ts`:

```ts
import { plugin, events } from '../vendor/teleport';
import * as store from '../vendor/store'
import { createLock } from '../vendor/api';

const maxFailedLoginAttempts = 3;     // 3 tries
const failedAttemptsTimeout = 60 * 5; // within 5 minutes

// Plugin entry point
export function handleEvent(request: plugin.HandleEventRequest): plugin.HandleEventResponse {
    const event = request.Event;
    const response = new plugin.HandleEventResponse();

    // If this event is a user login event
    if (event.UserLogin != null) {
        const login = event.UserLogin as events.UserLogin;
    
        // If a login was not successful        
        if (login.Status.Success == false) {
            // Record login attempt and get current attempts within the time frame for a user
            const count = store.takeToken(login.User.Login, failedAttemptsTimeout) // 5 minutes
    
            // If limit is exceeded
            if (count > maxFailedLoginAttempts) {
                trace("Suspicious login activity detected, attempts made:", 1, count)
    
                // Create lock
                createLock(login.User, 3600, "Suspicious login activity")
            }
        }
    }
    
    // Pass the event through
    response.Event = event;
    response.Success = true;

    return response;
}
```

Fixture #4 in the test setup represents failed login attempt. Given that, put the following contents into `assembly/event_handler.test.ts`:

```ts
import { getFixtureAsHandleEventRequest, getLatestAPIRequest } from '../vendor/test';
import { plugin, types } from '../vendor/teleport';
import { handleEvent } from './index';

// Main test function
export function test(): void {
    const request = getFixtureAsHandleEventRequest(4)

    handleEvent(request)
    handleEvent(request)
    handleEvent(request)

    const response = plugin.HandleEventResponse.decode(handleEvent(request))
    assert(response != null, "Event has not been processed")

    const apiRequest = getLatestAPIRequest()
    assert(apiRequest != null, "API request is missing")

    const lock = types.LockV2.decode(apiRequest)
    assert(lock.Spec.Target.Login == "foo", "Lock user foo has not been generated")
    assert(lock.Spec.Message == "Suspicious login activity", "Lock has the wrong message: " + lock.Spec.Message)
}
```

And run `yarn test`.

Please note `getLatestAPIRequest()` method call. Tests call mock API. Mock API methods are always successful. Latest API request is saved in memory and returned by this method. In our example, this method will return binary representation of `types.LockV2` object constructed in `index.ts`.

# Minimal rewrite headers plugin and test

Put the following content into `assembly/rewrite_headers.ts`:

```ts
import { plugin } from "../boilerplate/vendor/teleport"

// rewriteHeaders rewrites HTTP headers
export function rewriteHeaders(request: plugin.RewriteHeadersRequest): plugin.RewriteHeadersResponse {
    const response = new plugin.RewriteHeadersResponse()

    const headers = request.Headers
    headers.set("foo", "bar")
    
    response.Headers = headers
    response.Success = true
    
    return response
}
```

Put the test into `assembly/rewrite_headers.test.ts`:

```ts
import { plugin } from "../boilerplate/vendor/teleport";
import { rewriteHeaders } from "./index";

// Main test function
export function test(): void {
    const request = new plugin.RewriteHeadersRequest()

    request.Headers = new Map()
    request.Headers.set("Content-Type", "text/plain")

    const requestData = request.encode()
    const responseData = rewriteHeaders(requestData)
    const response = plugin.RewriteHeadersResponse.decode(responseData)

    assert(response != null, "rewriteHeaders returned null response")
    assert(response.Headers.size == 2, "rewriteHeaders resulting headers length must be 2")
    assert(response.Success == true, "rewriteHeaders was not successfult")
    assert(response.Headers.get("foo") != null, "foo header is missing")
    assert(response.Headers.get("foo") == "bar", "foo header value is wrong")
}
```

Run `yarn test`.

# Retreiving secrets from the Amazon Secrets Manager

You need to provide correct AWS credentials. Secret must exist. The code would look as following (`assembly/rewrite_header.ts`):

```ts
import { plugin } from "../vendor/teleport"
import { encodeString } from "../vendor/base64"
import { getSecretString } from '../vendor/aws_secrets_manager'

// rewriteHeaders rewrites HTTP headers
export function rewriteHeaders(request: plugin.RewriteHeadersRequest): plugin.RewriteHeadersResponse {
    const headers = request.Headers
    const token = getSecretString("mailgun_token") // getSecretString 
    const apiKey = encodeString(token) // base64 encode token

    headers.set("Authorization", "Basic " + apiKey)
    
    const response = new plugin.RewriteHeadersResponse()
    response.Headers = headers
    response.Success = true
    
    return response
}
```

The corresponding test (`assembly/rewrite_headers.test.ts`):

```ts
import { plugin } from "../vendor/teleport";
import { rewriteHeaders } from "./index";
import { defineAWSsecret } from "../vendor/test"

// Main test function
export function test(): void {
    const request = new plugin.RewriteHeadersRequest()

    request.Headers = new Map()
    request.Headers.set("Content-Type", "text/plain")

    defineAWSsecret("mailgun_token", "api:key")

    const requestData = request.encode()
    const responseData = rewriteHeaders(requestData)
    const response = plugin.RewriteHeadersResponse.decode(responseData)

    assert(response != null, "rewriteHeaders returned null response")
    assert(response.Headers.size == 2, "rewriteHeaders resulting headers length must be 2")
    assert(response.Success == true, "rewriteHeaders was not successfult")
    assert(response.Headers.get("Authorization") != null, "Authorization header is missing")
    assert(response.Headers.get("Authorization") == "Basic YXBpOmtleQ==", "Authorization header value is wrong")
}
```

# AssemblyScript `env` functions

`teleport-plugin-framework` provides [special imports](https://www.assemblyscript.org/concepts.html#special-imports) implementation. 

The only function you would use directly is `trace`:

```ts
trace("foo")                // Prints "foo"
trace("bar", 1, 100)        // Prints "foo 100"
trace("foo", 2, 100, 200)   // Prints "foo 100 200"
```

It prints data to the plugin log.

# Connecting the plugin to `event-handler`

## Prepare the plugin

The following code receives an upcoming event and returns it unchanged. Put it to `assembly/event_handler.ts`.

```ts
// event protobuf class
import { Event } from '../vendor/teleport';

// plugin entry point
export function handleEvent(event: Event): Event | null {
    trace("Event of type" + event.type + " received, size:", 1, event.size()) // Print event type and size
    return event
}
```

Put the following content into `assembly/event_handler.test.ts`:

```ts
import { getFixture } from '../vendor/test';
import { handleEvent } from './index';

// Main test function
export function test(): void {
    // Send test event to the plugin
    const result = handleEvent(getFixture(1))
    assert(result != null, "Event is not handled")
}
```

This snippet would print received event type to logs.

## Installation

Build `event-handler` plugin from source.

### Conventional architecture

```sh
git clone git@github.com/gravitational/teleport-plugins.git --branch feature/wasm
cd event-handler
make build
```

### Mac M1

Install [Rust](https://www.rust-lang.org/tools/install).

```sh
git clone git@github.com/gravitational/teleport-plugins.git --branch feature/wasm
cd event-handler
make get-custom-wasmer-runtime
CUSTOM_WASMER_RUNTIME=true make build
```

## Configuration

Please, follow the [official documentation](https://goteleport.com/docs/setup/guides/fluentd/#step-26-generate-configuration).

After you finished setting everything up, please run:

```sh
cd ~/teleport-plugin
yarn asbuild
```

After that, add the following lines to `teleport-event-handler.toml`:

```toml
[wasm]
plugin = "~/teleport-plugin/build/production.wasm"
```

Start `event-handler` with `-d` (debug output) flag. Wait an events and check logs:

```
INFO   Event of type RoleCreate received  wasm/assembly_script_env.go:144
```

To simulate events, you can recreate `teleport-event-handler` user and role using `tctl create -f teleport-event-handler-role.yaml`.