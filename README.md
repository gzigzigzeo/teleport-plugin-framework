# Teleport WASM plugin framework

Teleport WASM plugin framework allows to manipulate events forwarded by `event-handler`.

# Prerequisites

* go 1.17+
* node >= 16.3 < 17 (please, use [nvm](https://github.com/nvm-sh/nvm) to install specific version)
* yarn (check [YARN installation instructions](https://classic.yarnpkg.com/lang/en/docs/install/))

*Please be advised that M1 chip family is not fully supported by `wasmer`. You may encounter random segfaults under a heavy loads in production. However, development is possible with no restrictions.*

# Installation

## Non-M1 architecture

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

The tool will check if node and yarn are installed in the system and their versions are correct. It will create file structure for the example plugin and will run `yarn install` in the target folder.

## Use example as a source

Check the [boilerplate/examples](boilerplate/examples) folder for the list of available examples.

Run the command specifying example folder name in `--example` argument:

```sh
./build/teleport-plugin-framework new ~/teleport-plugin --example count
```

It will copy example files to the newly generated plugin. `trace` example is copied by default.

## Check the generated plugin

Run:

```sh
cd ~/teleport-plugin && yarn test
```

This will show the following output:

```sh
WASM plugin framework app v9.0.1

Running tests...
INFO[0000] Event received: UserCreate, size: 122
Success!
✨  Done in 3.01s.```
```

The setup was successful.

# How plugins work

WASM plugins can be written in any language which supports [WASM as a target](https://webassembly.org/getting-started/developers-guide/). The most reliable choices are [Rust](https://rust-lang.org), C/C++ and [AssemblyScript](https://assemblyscript.org/). We chose [AssemblyScript](https://assemblyscript.org/) as it has the simplest `TypeScript`-like syntax and tiny runtime compared to the most other available WASM languages.

## The folder structure

Every plugin consists of the following folders:

* `assembly` - the plugin code and tests.
* `build` - the target WASM binaries.
* `fixtures` - the test fixtures.
* `vendor` - external method definitions and helpers.

## The host-plugin message exchange

Teleport API uses [protocol buffers](https://developers.google.com/protocol-buffers). It is the main protocol for message exchange in Teleport. We use the same protocol to exchange messages with the plugins. 

### `event-handler` plugins

`event-handler` tool is used to forward Teleport cluster events to fluentd. WASM plugin can act as a middleware for event forwarding.

The plugin pipeline is the following:

1. Event gets received by `event-handler` (it either can be main audit log event or session event).
2. `event-handler` encodes an event to the protobuf binary message (`HandleEventRequest`), copies it to the WASM memory and calls the `handleEvent` method.
3. `handleEvent` method decodes binary message into the counterpart `AssemblyScript` class instance.
4. After the processing is done, `handleEvent` encodes the result into protobuf binary message (`HandleEventResponse`) and returns it. 
5. `event-handler` decodes the result and sends it to `fluentd`. If a resulting event is null, message is skipped.

`HandleEventRequest` has the following definition:

```proto
message HandleEventRequest {
    events.OneOf Event = 1;
}
```

`HandleEventResponse` has the following definition:

```proto
message HandleEventResponse {
    events.OneOf Event = 1 [ (gogoproto.nullable) = true ]; // Modified event
}
```

Response `Event` field can be null. If it is null, event is not forwarded to `fluentd`.

# Minimal event plugin and test

## The plugin

The following code receives an upcoming event and returns it unchanged. Put it to `assembly/event_handler.ts`.

```ts
import { HandleEventBase, Event } from '../../../vendor/handle_event';

export class HandleEvent extends HandleEventBase {
    any(event: Event): void {
        trace(`Event received: ${event.type}, size: ${event.size()}`)
    }
}
```

`HandleEventBase` is the base plugin class. `any` method receives each event, regardless of it's type (if defined).

You can use the following response methods:

* `this.skip()` will skip the event.
* `this.error("Error!")` will raise the exception and stop the plugin execution.

If none of them are called, the source event will be returned. You can modify the source event in-place.

## Test file

Put the following content into `assembly/event_handler.test.ts`:

```ts
// Test helper methods
import { getFixture, handleEvent } from '../vendor/handle_event_test';

// Event handler class
import { HandleEvent } from './event_handler';

// UserCreate event
import { UserCreate } from '../vendor/teleport/events';

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
```

This test requires the fixture. Put the following json into `fixtures/1-regular.json`:

```json
{
    "type": "types.OneOf",
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

Run:

```sh
yarn test
```

You should see the following output:

```sh
WASM plugin framework app v9.0.1

Running tests...
INFO[0000] Event received: UserCreate, size: 122
Success!
✨  Done in 3.01s.```
```

Tests are run in the same environment and follow the same message exchange pipeline as the production environment do. The only exception is that all external API methods are mocked.

# Test fixtures

Test events are loaded from json files located in the `fixtures` folder. The fixture file name has the following template: `<id>-<description>.json` where id is the sequential fixture number, and the description can be anything.

## Fixture file structure

The fixture has the following structure:

```json
{
    "name": "events.user_create",
    "type": "types.OneOf",
    "description": "User create event",
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

It represents protobuf message dump as json wrapped into helper structure.

Helper structure fields are:

* `name` - fixture template name.
* `type` - the protobuf message type name (would be `types.OneOf` for all events).
* `description` - fixture description.
* `data` - protobuf message json.

## List the available fixture templates

In the plugin folder, run the following command:

```sh
./teleport-plugin-framework fixtures list-templates
```

You will see the list of available fixture templates along with the command required for fixture generation:

```sh
WASM plugin framework app v9.0.1

events.access_request_create - Create access request
                               ./teleport-plugin-framework fixtures generate events.access_request_create <name>

        events.postgres_execute - Postgres client executes a previously bound prepared statement
                                ./teleport-plugin-framework fixtures generate events.postgres_execute <name>

            events.session_data - Data transfer event
                                ./teleport-plugin-framework fixtures generate events.session_data <name>
```

The fixture templates list represents fixtures for all available events.

## Generate fixture file

To generate the fixture file from a template, choose the required type from the list and run:

```sh
./teleport-plugin-framework fixtures generate events.user_create supervisor
```

Where `events.user_create` is the template name, and `supervisor` is the description part of a target file name.

You will get the following response:

```sh
Fixture generated: fixtures/5-supervisor.json
```

Id (5) would be automatically determined.

Now, you can open the file and change fixture data manually.

## Using the fixture

To load a fixture in a test, use the following method:

```ts
let createSupervisorUserEvent = getFixture(5) // Where 5 is the fixture number
```

This would return `ArrayBuffer` with protobuf-encoded fixture data. You can decode it:

```ts
const request = Request.decode(createSupervisorUserEvent)
```

You can send fixture data to the `handlePlugin` method:

```ts
const response = handleEvent<HandleEvent>(request)
```

# Changing events

Let's say we want to add a label `'seen-by-us': 'yes'` to all access request events.

Put the following contents to the `assembly/event_handler.ts`:

```ts
// Event protobuf class
import { AccessRequestCreate } from '../vendor/teleport/events';
import { HandleEventBase } from '../vendor/handle_event';

export class HandleEvent extends HandleEventBase {
    accessRequestCreate(event: AccessRequestCreate): void {
        event.Annotations.get("seen-by-us").set("yes")
    }
}
```

As you can see, we do not use `any` method anymore. Instead, we overload `accessRequestCreate` method of the base [`HandleEventBase`](`boilerplate/vendor/handle_event.ts`) class. Base methods exist for all available event types. You can check [handle_event.ts](`boilerplate/vendor/handle_event.ts`) for the list of all available methods.

If `any` method exists and it calls either `skip` or `error`, specific event handler methods won't be called.

Put the following content into `assembly/event_handler.test.ts`:

```ts
// Test helper methods
import { getFixture, handleEvent } from '../vendor/handle_event_test';

// Event handler class
import { HandleEvent } from './event_handler';

// AccessRequestCreate event
import { AccessRequestCreate } from '../vendor/teleport/events';

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
```

Copy fixture from [1-access_request.json](boilerplate/examples/1-access_request.json) to `fixtures/1-access_request.json`.

Run: `yarn test`.

You can use the following command to generate the example above from scratch:

```
./teleport-event-handler new ~/modify-plugin --example modify
```

# Skipping events

Let's say we want to prevent sending `secret-santa` user logins to `fluentd`.

Put the following content to the `assembly/event_handler.ts`:

```ts
import { HandleEventBase } from '../vendor/handle_event';
import { UserLogin } from '../vendor/teleport/events';

export class HandleEvent extends HandleEventBase {
    userLogin(event: UserLogin): void {
        if (event.User.Login == "secret-santa") {
            return this.skip() // Skip secret-santa login
        }        
    }
}
```

As you can see, `this.skip()` is called once `secret-santa` user tries to log in. This forces event handler to skip sending the event to `fluentd`.

Here is the test (`assembly/event_handler.test.ts`):

```ts
// Test helper methods
import { getFixture, handleEvent } from '../vendor/handle_event_test';

// Event handler class
import { HandleEvent } from './event_handler';

// UserLogin event
import { UserLogin } from '../vendor/teleport/events';

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
```

Here are the fixtures: [1-login.json]([boilerplate/examples/skip/fixtures/1-login.json]), [2-login.json]([boilerplate/examples/skip/fixtures/2-login.json]). Put them to `fixtures` folder.

Run:

```
yarn test
```

You can use the following command to generate the example above from scratch:

```
./teleport-event-handler new ~/skip-plugin --example skip
```

# Counting events and calling the Teleport API

Let's say we want to lock user if he fails to login 3 times within latest 5 minutes.

Put the following content into `assembly/event_handler.ts`:

```ts
import { HandleEventBase } from '../vendor/handle_event';
import { UserLogin } from '../vendor/teleport/events';
import * as store from '../vendor/store';
import { createLock } from '../vendor/api';

export class HandleEvent extends HandleEventBase {
    // maximum failed login attempts
    static readonly maxAttempts:i32 = 3;

    // within time window
    static readonly timeWindow:i32 = 5 * 60;

    userLogin(event: UserLogin): void {
        // We do not count success events
        if (event.Status.Success == true) {
            return
        }

        // Record login attempt and get current failed attempts count within the last 5 minutes
        const count = store.takeToken(event.User.Login, HandleEvent.timeWindow)

        // If there are more than 3 failed login attempts in last 5 minutes - create lock
        if (count > HandleEvent.maxAttempts) {
            trace("Suspicious login activity detected, attempts made:", 1, count)
            trace("Creaing lock for user " + event.User.Login)

            // Call API, create lock
            createLock(event.User, 3600, "Suspicious login")
        }
   }
}
```

`store.takeToken` is used to calculate a key occurence within the specified time frame. The following statement returns the count of `foo` appearances within last 5 minutes:

```ts
const count = store.takeToken("foo", 60 * 5)
```

`createLock` is the wrapper over the Teleport API `CreateLock` method.

The test looks as following (`assembly/event_handler.test.ts`):

```ts
// Test helper methods
import { getFixture, getLatestAPIRequest, handleEvent } from '../vendor/handle_event_test';

// Event handler class
import { HandleEvent } from './event_handler';

// types namespace contains lock object
import { types } from '../vendor/handle_event';

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
```

`getLatestAPIRequest` method is available in tests and is used to decode the latest request to the Teleport API. Please note that a type of request must be known onset. In our case, it's `types.LockV2`.

[1-login-failed.json]([boilerplate/examples/count/fixtures/1-login-failed.json]) fixture is required to run the test. Put it to `fixtures` folder.

Run `yarn test`.

You can use the following command to generate the example above from scratch:

```
./teleport-event-handler new ~/count-plugin --example count
```

# AssemblyScript `env` functions

`teleport-plugin-framework` provides [special imports](https://www.assemblyscript.org/concepts.html#special-imports) implementations. 

The only function you would use directly is `trace`:

```ts
trace("foo")                // Prints "foo"
trace("bar", 1, 100)        // Prints "foo 100"
trace("foo", 2, 100, 200)   // Prints "foo 100 200"
```

It prints data to the plugin log.

# Alerting

There is the way of sending alerts to the external messaging services. Here is the definition of the alert:

```proto
// Severity represents alert severity
enum Severity {
    DEBUG = 0;
    INFO = 1;
    NOTICE = 2;
    WARNING = 3;
    ERROR = 4;
    CRITICAL = 5;
    ALERT = 6;
    EMERGENCY = 7;
}

// Alert represents alert struct
message Alert {
    string Message  = 1;
    events.OneOf Event = 2 [ (gogoproto.nullable) = true ];
    map<string,string> Metadata = 3;
    Severity Severity = 4;
}
```

Here is the `HandleEventBase#alert` method signature:

```ts
protected alert(severity: Severity, message: string, event: bool, metadata: Map<string, string>):void
```

**Please note that for now actual alert sending is not implemented in the event handler. Alerts are put into the queue. You need to set up the queue consumer which implements actual sending on the `event-handler` side. Please, refer to [alerting.go](lib/wasm/alerting.go)**

# Connecting the plugin to `event-handler`

## Prepare the plugin

Generate the default plugin, which prints event type and size to the logs:

```
./teleport-event-handler new ~/teleport-plugin
```

## Installation

Build `event-handler` plugin from source.

### Non-M1 architecture

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
make build
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

# Implementation details

## Local development

### Installation

```sh
git clone git@github.com:gravitational/teleport-plugin-framework.git
cd teleport-plugin-framework
npm install
```

The additional step is required for Mac M1. Install [Rust](https://www.rust-lang.org/tools/install) and run:

```sh
make get-custom-wasmer-runtime
```

This recepie will download and build custom wasmer runtime in `wasmer-go` folder. If `wasmer-go` folder is present in the current build dir, required build flags and tags would be passed to `go build` automatically.

Now, build should pass:

```sh
make build
```

### Building AssemblyScript protobuf definitions for Teleport API

We use [`protobuf-as`](https://github.com/gravitational/protobuf-as.git) to compile Teleport API `.proto` files to AssemblyScript.

Run:

```sh
make gen-vendor-teleport
```

This command will generate [`teleport.ts`](boilerplate/vendor/teleport.ts) from Teleport API definitions and `lib/plugin/interop.pb.go` from [`interop.proto`](lib/plugin/interop.proto). `interop.proto` contains plugin request/response message definitions.

### Testing

Run:

```sh
make test
```

This command will:

1. Build AssemblyScript file [`lib_wasm_test.ts`](assembly/lib_wasm_test.ts), which contains WASM methods for [`pool_test.go`](lib/wasm/pool_test.go).
2. Run go tests in `lib/wasm` folder.
3. Build and run tests for all examples in `boilerplate/examples` folder.

## Integrating the plugin framework

### Installation

Add `teleport-plugin-framework` to `go.mod` and run `go mod tidy`:

```go
require (
    github.com/gravitational/teleport-plugin-framework
)
```

If you need to make your project usable on Mac M1, you'll have to build it with custom wasmer runtime. You can use the following `Makefile` snippet:

_TODO: Check if rust is installed_

```Makefile
CUSTOM_WASMER_RUNTIME_DIR ?= $(LOCALDIR)wasmer-go # LOCALDIR represents your Makefile directory

# If a custom wasmer runtime exists - provide required build flags
ifneq ($(wildcard $(CUSTOM_WASMER_RUNTIME_DIR)/.*),)
    CGO_CFLAGS ?= "-I$(CUSTOM_WASMER_RUNTIME_DIR)/wasmer/packaged/include/"
    CGO_LDFLAGS ?= "-Wl,-rpath,$(CUSTOM_WASMER_RUNTIME_DIR)/target/release/ -L$(CUSTOM_WASMER_RUNTIME_DIR)/target/release/ -lwasmer_go"
    TAGS ?= --tags custom_wasmer_runtime 
endif

# Download and build custom wasmer runtime (required for Mac M1)
.PHONY: get-custom-wasmer-runtime
get-custom-wasmer-runtime:
    git clone git@github.com:wasmerio/wasmer-go.git && cd wasmer-go && cargo build --release && cd ..

.PHONY: build
build: clean
    GOOS=$(OS) GOARCH=$(ARCH) $(CGOFLAG) CGO_CFLAGS=$(CGO_CFLAGS) CGO_LDFLAGS=$(CGO_LDFLAGS) go build -o $(BUILDDIR)/teleport-plugin-framework $(BUILDFLAGS) $(TAGS)
```

### Components

AssemblyScript runtime is not thread safe. Hence, to use it in concurrent environment, we have to use multiple `wasmer` instances having isolated memory spaces. 

The entity responsible for managing `wasmer` instances is called `ExecutionContextPool`. It represents the object pool of `ExecutionContext` instances. Each `ExecutionContext` is bound to separate `wasmer.Instance` and `wasmer.Memory`. Pool guarantees that an execution context is used in a single go routine at a given moment of time.

The functional blocks of the framework are called `traits`. Each trait declares two method sets: exports and imports. Exports are go methods which are available to WASM scripts. Imports are methods which are required to be defined in WASM module to make a trait work. 

### Initializing the pool

```go
package main

import (
    "github.com/gravitational/teleport-plugin-framework/lib/wasm"
    "github.com/sirupsen/logrus"
)

func main() {
    log := logrus.StandardLogger()

    plugin, err := os.ReadFile("build/production.wasm")
    if err != nil {
        log.Fatal(err)
    }

    opts := wasm.ExecutionContextPoolOptions{
        Log:           log,
        PluginBytes:   plugin,
        Timeout:       time.Second * 2,
        Concurrency:   4,
        MemoryInterop: wasm.NewAssemblyScriptMemoryInterop(),
        Traits: []interface{}{
            wasm.NewAssemblyScriptEnv()
        },
    }

    pool, err := wasm.NewExecutionContextPool(opts)
    if err != nil {
        log.Fatal(err)
    }
}
```

The following options were provided in the snippet above:

* `Timeout` sets the maximum execution time limit of a WASM method. If a WASM method runs longer, it gets terminated and error is returned.
* `Concurrency` sets the number of `ExecutionContext` instances in this pool.
* `MemoryInterop` provides the implementation of the interface which defines methods to work with memory objects on WASM side. It allows to read/write strings, allocate memory, send and receive protobuf messages, etc.
* `Traits` provides the array of trait structs. In the example above, the only one trait (`AssemblyScriptEnv`) is passed. This trait exports AssemblyScript [special imports](https://www.assemblyscript.org/concepts.html#special-imports) (`trace`, `Date.now`, etc). implementations to WASM side.

AssemblyScript uses UTF-16 encoded strings.

### Trait with exports

Trait can define methods which are usable on WASM side. Let's take a look on `Store` trait. It defines exported methods only (implements [`TraitWithExports`](lib/pool.go) interface).

```go
// Store represents store methods bound to specific execution context
type Store struct {
    db PersistentStore
}

// ExportMethodsToWASM exports Store methods to wasm
func (t *Store) ExportMethodsToWASM(exports *Exports) {
    // Exports store.takeToken to WASM side
    exports.Define(
        "store",
        map[string]Export{
            "takeToken": {
                wasmer.NewValueTypes(wasmer.I32, wasmer.I32), // prefix string, TTL i32
                wasmer.NewValueTypes(wasmer.I32),             // i32 - tokens count
                t.takeToken,
            },
        },
    )
}

// takeToken generates the new token with TTL
func (t *Store) takeToken(ectx *ExecutionContext, args []wasmer.Value) ([]wasmer.Value, error) {
    // Reads string from the instance memory, converts it to the UTF-8 and returns. args[0] is the memory address.
    scope := ectx.MemoryInterop.GetString(ectx, args[0])
    ttl := args[1].I32()
    n := t.db.TakeToken(scope, time.Duration(ttl)*time.Second)
    return []wasmer.Value{wasmer.NewI32(n)}, nil
}
```

This trait defines `takeToken` method, which can be used on WASM side. It requires to have the following declaration in `store.ts`:

```typescript
// takeToken reserves token with TTL within the scope
export declare function takeToken(scope: string, ttl: i32): i32;
```

Please note that both exported and imported methods should have `ectx *ExecutionContext` as a first argument on Go side.

### Trait with imports

The following trait implements [`TraitWithImports`](lib/pool.go) interface:

```go
// Testing represents WASM testing trait
type Testing struct {
    Test NativeFunctionWithExecutionContext
}

// ImportMethodsFromWASM imports WASM methods to go side
func (r *Testing) ImportMethodsFromWASM(getFunction GetFunction) error {
    var err error

    // Imports test function from WASM side
    r.Test, err = getFunction("test")
    if err != nil {
        return trace.Wrap(err)
    }

    return nil
}
```

This trait makes `Test` function usable on Go side. The function should be defined in the WASM module as following:

```ts
export function test(attempts: i32): bool {}
```

The imported function signature (`NativeFunctionWithExecutionContext`) looks as following:

```go
type NativeFunctionWithExecutionContext = func(*ExecutionContext, ...wasmer.Value) (wasmer.Value, error)
```

The first argument is the current `ExecutionContext`. Unlike in `wasmer`, arguments and return value are all `wasmer.Value` structs.

WebAssembly does not have dedicated `null` type, hence, there is no way of passing or returning `null` values.

### Method execution

Let't say you want to use execute `Test` function from the example above. 

```go
package main

import (
    "github.com/gravitational/teleport-plugin-framework/lib/wasm"
    "github.com/sirupsen/logrus"
)

func main() {
    log := logrus.StandardLogger()

    plugin, err := os.ReadFile("build/production.wasm")
    if err != nil {
        log.Fatal(err)
    }

    testing := wasm.NewTesting()

    opts := wasm.ExecutionContextPoolOptions{
        Log:           log,
        PluginBytes:   plugin,
        Timeout:       time.Second * 2,
        Concurrency:   4,
        MemoryInterop: wasm.NewAssemblyScriptMemoryInterop(),
        Traits: []interface{}{
            wasm.NewAssemblyScriptEnv(),
            testing,
        },
    }

    pool, err := wasm.NewExecutionContextPool(opts)
    if err != nil {
        log.Fatal(err)
    }

    result, err := pool.Execute(context.Background(), func(ectx *wasm.ExecutionContext) (interface{}, error) {
        return testing.Test(ectx, wasmer.NewI32(5))
    })

    if err != nil {
        log.Fatal(err)
    }

    response := result.(wasmer.Value)
    log.Println(response.I32()) // bools are represented as I32 in AssemblyScript
}
```

`Execute` fetches `ExecutionContext` from the pool, passes it as the first argument of the provided function, and puts `ExecutionContext` back to the pool once the provided function execution is finished. It also enforces the execution timeout.

