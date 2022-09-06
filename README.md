<div align="center">
    <a href="https://github.com/demergent-labs/azle" target="_blank" rel="noopener noreferrer">
        <img height="150" src="https://raw.githubusercontent.com/demergent-labs/azle/main/logo/logo.svg" alt="Azle logo">
    </a>
</div>
</br>
<div align="center">
    <a href="https://github.com/demergent-labs/azle/actions/workflows/test.yml?query=branch%3Amain">
        <img src="https://github.com/demergent-labs/azle/actions/workflows/test.yml/badge.svg" alt="Coverage Status">
    </a>
    <a href="https://npmcharts.com/compare/azle?minimal=true"><img src="https://img.shields.io/npm/dm/azle.svg" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/azle"><img src="https://img.shields.io/npm/v/azle.svg" alt="Version"></a>
    <a href="https://www.npmjs.com/package/azle"><img src="https://img.shields.io/npm/l/azle.svg" alt="License"></a>
</div>

# Azle (Beta)

TypeScript CDK for the Internet Computer.

## Disclaimer

Please exercise caution when using Azle. It is beta software that you use at your own risk and according to the terms of this [MIT license](/LICENSE).

Demergent Labs may officially recommend Azle for production use when at least the following have occurred:

-   [x] [Many example-based unit/integration tests](/examples)
-   [x] [Feature parity with the Rust CDK and Motoko](#feature-parity)
-   [x] Extensive automated benchmarking
-   [ ] Extensive automated property testing
-   [ ] Multiple independent security reviews/audits
-   [ ] [Boa is no longer experimental](https://github.com/boa-dev/boa)

## Discussion

Feel free to open issues or join us in the [DFINITY DEV TypeScript Discord channel](https://discord.com/channels/748416164832608337/956466775380336680).

## Documentation

Most of Azle's documentation is currently found in this README. The Azle Book, similar to [Sudograph's](https://i67uk-hiaaa-aaaae-qaaka-cai.raw.ic0.app/), will later be hosted on the Internet Computer.

-   [Examples](/examples)
-   [Installation](#installation)
-   [Deployment](#deployment)
-   [Canisters](#canisters)
-   [Canister Methods](#canister-methods)
-   [Candid Types](#candid-types)
-   [Canister APIs](#canister-apis)
-   [Call APIs](#call-apis)
-   [Stable Memory](#stable-memory)
-   [Special APIs](#special-apis)
-   [JS APIs](#js-apis)
-   [Feature Parity](#feature-parity)
-   [Benchmarks](#benchmarks)
-   [Roadmap](#roadmap)
-   [Gotchas and Caveats](#gotchas-and-caveats)
-   [Decentralization](#decentralization)
-   [Contributing](#contributing)
-   [License](#license)

### Installation

You should have the following installed on your system:

-   [Node.js](#nodejs)
-   [Rust](#rust)
-   [dfx](#dfx)

After installing the prerequisites, you can [make a project and install Azle](#azle).

#### Node.js

Run the following commands to install Node.js and npm. [nvm](https://github.com/nvm-sh/nvm) is highly recommended and its use is shown below:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# restart your terminal

nvm install 18
```

#### Rust

Run the following command to install Rust:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### dfx

Run the following command to install dfx 0.11.0:

```bash
DFX_VERSION=0.11.0 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

#### Common Installation Issues

-   Ubuntu
    -   error: linker cc not found (sudo apt install build-essential)
    -   is cmake not installed? (sudo apt install cmake)

#### Azle

Follow these steps to create an Azle project. The steps below assume a project called `backend`:

1. Create a directory for your project (`mkdir backend && cd backend`)
2. Create a `package.json` file (`npm init -y`)
3. Install Azle (`npm install azle`)
4. Create a `dfx.json` file (`touch dfx.json`)
5. Create a directory and an entry TypeScript file for your canister (`mkdir src && cd src && touch index.ts`)

Your `dfx.json` file should look like this:

```json
{
    "canisters": {
        "backend": {
            "type": "custom",
            "build": "npx azle backend",
            "root": "src",
            "ts": "src/index.ts",
            "candid": "src/index.did",
            "wasm": "target/wasm32-unknown-unknown/release/backend.wasm"
        }
    }
}
```

Your `index.ts` file should look like this:

```typescript
import { Query } from 'azle';

export function hello_world(): Query<string> {
    return 'Hello world!';
}
```

You are now ready to deploy your application.

### Deployment

#### Local Deployment

Start up an IC replica and deploy. The first deploy will likely take multiple minutes as it downloads and compiles many Rust dependencies. Subsequent deploys should be much quicker:

```bash
# Open a terminal and navigate to your project's root directory, then run the following command to start a local IC replica
dfx start

# Alternatively to the above command, you can run the replica in the background
dfx start --background

# If you are running the replica in the background, you can run these commands within the same terminal as the dfx start --background command
# If you are not running the replica in the background, then open another terminal and run these commands from the root directory of your project

# first deploy
dfx canister create backend
dfx build backend
dfx canister install backend --wasm target/wasm32-unknown-unknown/release/backend.wasm.gz

# subsequent deploys
dfx build backend
dfx canister install --mode upgrade backend --wasm target/wasm32-unknown-unknown/release/backend.wasm.gz
```

You can then interact with your canister like any other canister written in Motoko or Rust. For more information about calling your canister using `dfx`, see [here](https://smartcontracts.org/docs/developers-guide/cli-reference/dfx-canister.html#_dfx_canister_call).

dfx commands for the [query example](/examples/query):

```bash
dfx canister call query query
# The result is: ("This is a query function")
```

dfx commands for the [update example](/examples/update):

```bash
dfx canister call update update '("Why hello there")'
# The result is: ()

dfx canister call update query
# The result is: ("Why hello there")
```

dfx commands for the [simple_erc20 example](/examples/simple_erc20):

```bash
dfx canister call simple_erc20 initializeSupply '("TOKEN", "Token", 1_000_000, "0")'
# The result is: (true)

dfx canister call simple_erc20 name
# The result is: ("Token")

dfx canister call simple_erc20 ticker
# The result is: ("TOKEN")

dfx canister call simple_erc20 totalSupply
# The result is: (1_000_000 : nat64)

dfx canister call simple_erc20 balance '("0")'
# The result is: (1_000_000 : nat64)

dfx canister call simple_erc20 transfer '("0", "1", 100)'
# The result is: (true)
```

#### Live Deployment

Deploying to the live Internet Computer generally only requires adding the `--network ic` option to the deploy command: `dfx canister --network ic install backend --wasm target/wasm32-unknown-unknown/release/backend.wasm.gz`. This assumes you already have converted ICP into cycles appropriately. See [here](https://smartcontracts.org/docs/quickstart/4-quickstart.html) for more information on getting ready to deploy to production.

### Canisters

More information:

-   https://smartcontracts.org/docs/developers-guide/concepts/canisters-code.html
-   https://wiki.internetcomputer.org/wiki/Canisters_(dapps/smart_contracts)
-   https://smartcontracts.org/docs/developers-guide/design-apps.html#_single_or_multiple_canister_architecture

In many ways developing canisters with Azle is similar to any other TypeScript/JavaScript project. To see what canister source code looks like, see the [examples](/examples).

A canister is the fundamental application unit on the Internet Computer. It contains the code and state of your application. When deployed to the Internet Computer, your canister becomes an everlasting process. Its global variables automatically persist.

Users of your canister interact with it through RPC calls performed using HTTP requests. These calls will hit your canister's `Query` and `Update` methods. These methods, with their parameter and return types, are the interface to your canister.

Azle allows you to write canisters while embracing much of what the TypeScript and JavaScript ecosystems have to offer.

### Canister Methods

-   [init](#init)
-   [pre upgrade](#pre-upgrade)
-   [post upgrade](#post-upgrade)
-   [inspect message](#inspect-message)
-   [heartbeat](#heartbeat)
-   [update](#update)
-   [query](#query)
-   [http_request and http_request_update](#http_request-and-http_request_update)

#### init

Examples:

-   [basic-dao](/examples/motoko_examples/basic-dao)
-   [func_types](/examples/func_types)
-   [init](/examples/init)
-   [persistent-storage](/examples/motoko_examples/persistent-storage)
-   [pre_and_post_upgrade](/examples/pre_and_post_upgrade)
-   [whoami](/examples/motoko_examples/whoami)

```typescript
import { Init } from 'azle';

export function init(): Init {
    console.log('This runs once when the canister is first initialized');
}
```

#### pre upgrade

Examples:

-   [basic-dao](/examples/motoko_examples/basic-dao)
-   [pre_and_post_upgrade](/examples/pre_and_post_upgrade)
-   [stable_storage](/examples/stable_storage)

```typescript
import { PreUpgrade } from 'azle';

export function pre_upgrade(): PreUpgrade {
    console.log('This runs before every canister upgrade');
}
```

#### post upgrade

Examples:

-   [basic-dao](/examples/motoko_examples/basic-dao)
-   [pre_and_post_upgrade](/examples/pre_and_post_upgrade)
-   [stable_storage](/examples/stable_storage)
-   [whoami](/examples/motoko_examples/whoami)

```typescript
import { PostUpgrade } from 'azle';

export function post_upgrade(): PostUpgrade {
    console.log('This runs after every canister upgrade');
}
```

#### inspect message

Examples:

-   [inspect_message](/examples/inspect_message)

```typescript
import { ic, InspectMessage, Update } from 'azle';

export function inspect_message(): InspectMessage {
    console.log('this runs before executing update calls');

    if (ic.method_name() === 'accessible') {
        ic.accept_message();
        return;
    }

    if (ic.method_name() === 'inaccessible') {
        return;
    }

    throw `Method "${ic.method_name()}" not allowed`;
}

export function accessible(): Update<boolean> {
    return true;
}

export function inaccessible(): Update<boolean> {
    return false;
}

export function also_inaccessible(): Update<boolean> {
    return false;
}
```

#### heartbeat

Examples:

-   [basic-dao](/examples/motoko_examples/basic-dao)
-   [heartbeat](/examples/heartbeat)

```typescript
import { Heartbeat } from 'azle';

export function heartbeat(): Heartbeat {
    console.log('this runs ~1 time per second');
}
```

#### update

Examples:

-   [update](/examples/update)
-   [key_value_store](/examples/key_value_store)

More information:

-   https://smartcontracts.org/docs/developers-guide/concepts/canisters-code.html#query-update

Update methods expose public callable functions that are writable. All state changes will be persisted after the function call completes.

Update calls go through consensus and thus return very slowly (a few seconds) relative to query calls. This also means they are more secure than query calls unless [certified data](https://smartcontracts.org/docs/base-libraries/certifieddata) is used in conjunction with the query call.

To create an update method, simply wrap the return type of your function in the azle `Update` type.

```typescript
import { Query, Update } from 'azle';

let currentMessage: string = '';

export function query(): Query<string> {
    return currentMessage;
}

export function update(message: string): Update<void> {
    currentMessage = message;
}
```

#### query

Examples:

-   [query](/examples/query)
-   [update](/examples/update)
-   [simple_user_accounts](/examples/simple_user_accounts)

More information:

-   https://smartcontracts.org/docs/developers-guide/concepts/canisters-code.html#query-update
-   https://smartcontracts.org/docs/developers-guide/design-apps.html#_using_query_calls

Query methods expose public callable functions that are read-only. All state changes will be discarded after the function call completes.

Query calls do not go through consensus and thus return very quickly relative to update calls. This also means they are less secure than update calls unless [certified data](https://smartcontracts.org/docs/base-libraries/certifieddata) is used in conjunction with the query call.

To create a query method, simply wrap the return type of your function in the Azle `Query` type.

```typescript
import { Query } from 'azle';

export function query(): Query<string> {
    return 'This is a query function';
}
```

#### http_request and http_request_update

Examples:

-   [http_counter](/examples/motoko_examples/http_counter)

```typescript
import { blob, Func, ic, nat, nat16, Opt, Query, Update, Variant } from 'azle';

type HttpRequest = {
    method: string;
    url: string;
    headers: HeaderField[];
    body: blob;
};

type HttpResponse = {
    status_code: nat16;
    headers: HeaderField[];
    body: blob;
    streaming_strategy: Opt<StreamingStrategy>;
    upgrade: Opt<boolean>;
};

type HeaderField = [string, string];

type StreamingStrategy = Variant<{
    Callback: CallbackStrategy;
}>;

type CallbackStrategy = {
    callback: Callback;
    token: Token;
};

type Callback = Func<(t: Token) => Query<StreamingCallbackHttpResponse>>;

type Token = {
    // add whatever fields you'd like
    arbitrary_data: string;
};

type StreamingCallbackHttpResponse = {
    body: blob;
    token: Opt<Token>;
};

export function http_request(req: HttpRequest): Query<HttpResponse> {
    return {
        status_code: 200,
        headers: [['content-type', 'text/plain']],
        body: Uint8Array.from([]),
        streaming_strategy: null,
        upgrade: true
    };
}

export function http_request_update(req: HttpRequest): Update<HttpResponse> {
    return {
        status_code: 200,
        headers: [['content-type', 'text/plain']],
        body: Uint8Array.from([]),
        streaming_strategy: null,
        upgrade: null
    };
}
```

### Candid Types

Examples:

-   [primitive_types](/examples/primitive_types)
-   [complex_types](/examples/complex_types)

[Candid](https://smartcontracts.org/docs/candid-guide/candid-intro.html) is an interface description language created by DFINITY. It defines interfaces between services (in our context canisters), allowing canisters and clients written in various languages to easily interact with each other.

Much of what Azle is doing under-the-hood is translating TypeScript code into various formats that Candid understands (for example Azle will generate a Candid `.did` file from your TypeScript code). To do this your TypeScript code must use various Azle-provided types.

Please note that these types are only needed in specific locations in your code, including but not limited to the following areas:

-   `Query`, `Update`, `Init`, and `PostUpgrade` method parameters and return types
-   `Canister` method declaration parameters and return types
-   `Stable` variable declaration types

Basically, you only need to write in TypeScript and use the Azle types when Candid serialization or deserialization is necessary. You could write the rest of your application in plain JavaScript if you'd like.

Data types:

-   [text](#text)
-   [blob](#blob)
-   [nat](#nat)
-   [nat64](#nat64)
-   [nat32](#nat32)
-   [nat16](#nat16)
-   [nat8](#nat8)
-   [int](#int)
-   [int64](#int64)
-   [int32](#int32)
-   [int16](#int16)
-   [int8](#int8)
-   [float64](#float64)
-   [float32](#float32)
-   [bool](#bool)
-   [null](#null)
-   [vec](#vec)
-   [opt](#opt)
-   [record](#record)
-   [variant](#variant)
-   [func](#func)
-   [service](#service)
-   [principal](#principal)
-   [reserved](#reserved)
-   [empty](#empty)

#### text

The TypeScript type `string` corresponds to the [Candid type text](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-text) and will become a [JavaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) at runtime.

TypeScript:

```typescript
import { Query } from 'azle';

export function get_string(): Query<string> {
    return 'Hello world!';
}

export function print_string(string: string): Query<string> {
    console.log(typeof string);
    return string;
}
```

Candid:

```typescript
service: {
    "get_string": () -> (text) query;
    "print_string": (text) -> (text) query;
}
```

#### blob

The Azle type `blob` corresponds to the [Candid type blob](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-blob) and will become a [JavaScript Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) at runtime.

TypeScript:

```typescript
import { blob, Query } from 'azle';

export function get_blob(): Query<blob> {
    return Uint8Array.from([68, 73, 68, 76, 0, 0]);
}

export function print_blob(blob: blob): Query<blob> {
    console.log(typeof blob);
    return blob;
}
```

Candid:

```typescript
service: {
    "get_blob": () -> (blob) query;
    "print_blob": (blob) -> (blob) query;
}
```

#### nat

The Azle type `nat` corresponds to the [Candid type nat](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-nat) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { nat, Query } from 'azle';

export function get_nat(): Query<nat> {
    return 340_282_366_920_938_463_463_374_607_431_768_211_455n;
}

export function print_nat(nat: nat): Query<nat> {
    console.log(typeof nat);
    return nat;
}
```

Candid:

```typescript
service: {
    "get_nat": () -> (nat) query;
    "print_nat": (nat) -> (nat) query;
}
```

#### nat64

The Azle type `nat64` corresponds to the [Candid type nat64](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { nat64, Query } from 'azle';

export function get_nat64(): Query<nat64> {
    return 18_446_744_073_709_551_615n;
}

export function print_nat64(nat64: nat64): Query<nat64> {
    console.log(typeof nat64);
    return nat64;
}
```

Candid:

```typescript
service: {
    "get_nat64": () -> (nat64) query;
    "print_nat64": (nat64) -> (nat64) query;
}
```

#### nat32

The Azle type `nat32` corresponds to the [Candid type nat32](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat32, Query } from 'azle';

export function get_nat32(): Query<nat32> {
    return 4_294_967_295;
}

export function print_nat32(nat32: nat32): Query<nat32> {
    console.log(typeof nat32);
    return nat32;
}
```

Candid:

```typescript
service: {
    "get_nat32": () -> (nat32) query;
    "print_nat32": (nat32) -> (nat32) query;
}
```

#### nat16

The Azle type `nat16` corresponds to the [Candid type nat16](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat16, Query } from 'azle';

export function get_nat16(): Query<nat16> {
    return 65_535;
}

export function print_nat16(nat16: nat16): Query<nat16> {
    console.log(typeof nat16);
    return nat16;
}
```

Candid:

```typescript
service: {
    "get_nat16": () -> (nat16) query;
    "print_nat16": (nat16) -> (nat16) query;
}
```

#### nat8

The Azle type `nat8` corresponds to the [Candid type nat8](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat8, Query } from 'azle';

export function get_nat8(): Query<nat8> {
    return 255;
}

export function print_nat8(nat8: nat8): Query<nat8> {
    console.log(typeof nat8);
    return nat8;
}
```

Candid:

```typescript
service: {
    "get_nat8": () -> (nat8) query;
    "print_nat8": (nat8) -> (nat8) query;
}
```

#### int

The Azle type `int` corresponds to the [Candid type int](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-int) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int, Query } from 'azle';

export function get_int(): Query<int> {
    return 170_141_183_460_469_231_731_687_303_715_884_105_727n;
}

export function print_int(int: int): Query<int> {
    console.log(typeof int);
    return int;
}
```

Candid:

```typescript
service: {
    "get_int": () -> (int) query;
    "print_int": (int) -> (int) query;
}
```

#### int64

The Azle type `int64` corresponds to the [Candid type int64](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int64, Query } from 'azle';

export function get_int64(): Query<int64> {
    return 9_223_372_036_854_775_807n;
}

export function print_int64(int64: int64): Query<int64> {
    console.log(typeof int64);
    return int64;
}
```

Candid:

```typescript
service: {
    "get_int64": () -> (int64) query;
    "print_int64": (int64) -> (int64) query;
}
```

#### int32

The Azle type `int32` corresponds to the [Candid type int32](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int32, Query } from 'azle';

export function get_int32(): Query<int32> {
    return 2_147_483_647;
}

export function print_int32(int32: int32): Query<int32> {
    console.log(typeof int32);
    return int32;
}
```

Candid:

```typescript
service: {
    "get_int32": () -> (int32) query;
    "print_int32": (int32) -> (int32) query;
}
```

#### int16

The Azle type `int16` corresponds to the [Candid type int16](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int16, Query } from 'azle';

export function get_int16(): Query<int16> {
    return 32_767;
}

export function print_int16(int16: int16): Query<int16> {
    console.log(typeof int16);
    return int16;
}
```

Candid:

```typescript
service: {
    "get_int16": () -> (int16) query;
    "print_int16": (int16) -> (int16) query;
}
```

#### int8

The Azle type `int8` corresponds to the [Candid type int8](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int8, Query } from 'azle';

export function get_int8(): Query<int8> {
    return 127;
}

export function print_int8(int8: int8): Query<int8> {
    console.log(typeof int8);
    return int8;
}
```

Candid:

```typescript
service: {
    "get_int8": () -> (int8) query;
    "print_int8": (int8) -> (int8) query;
}
```

#### float64

The Azle type `float64` corresponds to the [Candid type float64](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-floatN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float64, Query } from 'azle';

export function get_float64(): Query<float64> {
    return Math.E;
}

export function print_float64(float64: float64): Query<float64> {
    console.log(typeof float64);
    return float64;
}
```

Candid:

```typescript
service: {
    "get_float64": () -> (float64) query;
    "print_float64": (float64) -> (float64) query;
}
```

#### float32

The Azle type `float32` corresponds to the [Candid type float32](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-floatN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float32, Query } from 'azle';

export function get_float32(): Query<float32> {
    return Math.PI;
}

export function print_float32(float32: float32): Query<float32> {
    console.log(typeof float32);
    return float32;
}
```

Candid:

```typescript
service: {
    "get_float32": () -> (float32) query;
    "print_float32": (float32) -> (float32) query;
}
```

#### bool

The TypeScript type `boolean` corresponds to the [Candid type bool](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-bool) and will become a [JavaScript Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) at runtime.

TypeScript:

```typescript
import { Query } from 'azle';

export function get_bool(): Query<boolean> {
    return true;
}

export function print_bool(bool: boolean): Query<boolean> {
    console.log(typeof bool);
    return bool;
}
```

Candid:

```typescript
service: {
    "get_bool": () -> (bool) query;
    "print_bool": (bool) -> (bool) query;
}
```

#### null

The TypeScript type `null` corresponds to the [Candid type null](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-null) and will become a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript:

```typescript
import { Query } from 'azle';

export function get_null(): Query<null> {
    return null;
}

export function print_null(_null: null): Query<null> {
    console.log(typeof _null);
    return _null;
}
```

Candid:

```typescript
service: {
    "get_null": () -> (null) query;
    "print_null": (null) -> (null) query;
}
```

#### vec

TypeScript `[]` array syntax corresponds to the [Candid type vec](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-vec) and will become an array of the specified type at runtime (except for `nat8[]` which will become a `Uint8Array`, thus it is recommended to use the `blob` type instead of `nat8[]`). Only the `[]` array syntax is supported at this time (i.e. not `Array` or `ReadonlyArray` etc).

TypeScript:

```typescript
import { int32, Query } from 'azle';

export function get_numbers(): Query<int32[]> {
    return [0, 1, 2, 3];
}
```

Candid:

```typescript
service: {
    "get_numbers": () -> (vec int32) query;
}
```

#### opt

The Azle type `Opt` corresponds to the [Candid type opt](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-opt) and will become the enclosed JavaScript type or null at runtime.

TypeScript:

```typescript
import { Opt, Query } from 'azle';

export function get_opt_some(): Query<Opt<boolean>> {
    return true;
}

export function get_opt_none(): Query<Opt<boolean>> {
    return null;
}
```

Candid:

```typescript
service: {
    "get_opt_some": () -> (opt bool) query;
    "get_opt_none": () -> (opt bool) query;
}
```

#### record

TypeScript type aliases referring to object literals correspond to the [Candid record type](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-record) and will become [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

TypeScript:

```typescript
type Post = {
    id: string;
    author: User;
    text: string;
    thread: Thread;
};

type Thread = {
    id: string;
    author: User;
    posts: Post[];
    title: string;
};

type User = {
    id: string;
    posts: Post[];
    threads: Thread[];
    username: string;
};
```

Candid:

```typescript
type Post = record {
    "id": text;
    "author": User;
    "text": text;
    "thread": Thread;
};

type Thread = record {
    "id": text;
    "author": User;
    "posts": vec Post;
    "title": text;
};

type User = record {
    "id": text;
    "posts": vec Post;
    "threads": vec Thread;
    "username": text;
};
```

#### variant

TypeScript type aliases referring to object literals wrapped in the `Variant` Azle type correspond to the [Candid variant type](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-variant) and will become [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

TypeScript:

```typescript
import { nat32, Variant } from 'azle';

type ReactionType = Variant<{
    Fire: null;
    ThumbsUp: null;
    ThumbsDown: null;
    Emotion: Emotion;
    Firework: Firework;
}>;

type Emotion = Variant<{
    Happy: null;
    Sad: null;
}>;

type Firework = {
    Color: string;
    NumStreaks: nat32;
};
```

Candid:

```typescript
type ReactionType = variant {
    "Fire": null;
    "ThumbsUp": null;
    "ThumbsDown": null;
    "Emotion": Emotion;
    "Firework": Firework
};

type Emotion = variant {
    "Happy": null;
    "Sad": null
};

type Firework = record {
    "Color": text;
    "NumStreaks": nat32;
};
```

#### func

The Azle type `func` corresponds to the [Candid type func](https://internetcomputer.org/docs/current/references/candid-ref/#type-func---) and at runtime will become a JavaScript array with two elements, the first being an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) and the second being a [JavaScript string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). The `@dfinity/principal` represents the `principal` of the canister/service where the function exists, and the `string` represents the function's name.

TypeScript:

```typescript
import { Func, nat64, Principal, Query, Update, Variant } from 'azle';

type User = {
    id: string;
    basic_func: BasicFunc;
    complex_func: ComplexFunc;
};

type Reaction = Variant<{
    Good: null;
    Bad: null;
    BasicFunc: BasicFunc;
    ComplexFunc: ComplexFunc;
}>;

type BasicFunc = Func<(param1: string) => Query<string>>;
type ComplexFunc = Func<(user: User, reaction: Reaction) => Update<nat64>>;

export function get_basic_func(): Query<BasicFunc> {
    return [
        Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
        'simple_function_name'
    ];
}

export function get_complex_func(): Query<ComplexFunc> {
    return [
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
        'complex_function_name'
    ];
}
```

Candid:

```typescript
type User = record {
    "id": text;
    "basic_func": BasicFunc;
    "complex_func": ComplexFunc;
};
type Reaction = variant { "Good": null; "Bad": null; "BasicFunc": BasicFunc; "ComplexFunc": ComplexFunc };

type BasicFunc = func (text) -> (text) query;
type ComplexFunc = func (User, Reaction) -> (nat64);

service: () -> {
    "get_basic_func": () -> (BasicFunc) query;
    "get_complex_func": () -> (ComplexFunc) query;
}

```

#### service

[Not yet implemented.](https://github.com/demergent-labs/azle/issues/445)

#### principal

The Azle type `Principal` corresponds to the [Candid type principal](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-principal) and will become an [@dfinity/principal](https://www.npmjs.com/package/@dfinity/principal) at runtime.

TypeScript:

```typescript
import { Principal, Query } from 'azle';

export function get_principal(): Query<Principal> {
    return Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
}

export function print_principal(principal: Principal): Query<Principal> {
    console.log(typeof principal);
    return principal;
}
```

Candid:

```typescript
service: {
    "get_principal": () -> (principal) query;
    "print_principal": (principal) -> (principal) query;
}
```

-   Note that `Principal.selfAuthenticating` will not function properly until [this issue is resolved](https://github.com/boa-dev/boa/issues/1917)

#### reserved

The Azle type `reserved` corresponds to the [Candid type reserved](https://internetcomputer.org/docs/current/references/candid-ref/#type-reserved) and will become a [JavaScript null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) at runtime.

TypeScript:

```typescript
import { Query, reserved } from 'azle';

export function get_reserved(): Query<reserved> {
    return 'anything';
}

export function print_reserved(reserved: reserved): Query<reserved> {
    console.log(typeof reserved);
    return reserved;
}
```

Candid:

```typescript
service: {
    "get_reserved": () -> (reserved) query;
    "print_reserved": (reserved) -> (reserved) query;
}
```

#### empty

The Azle type `empty` corresponds to the [Candid type empty](https://internetcomputer.org/docs/current/references/candid-ref/#type-empty) and has no JavaScript value at runtime.

TypeScript:

```typescript
import { empty, Query } from 'azle';

export function get_empty(): Query<empty> {
    throw 'Anything you want';
}

// Note: It is impossible to call this function because it requires an argument
// but there is no way to pass an "empty" value as an argument.
export function print_empty(empty: empty): Query<empty> {
    console.log(typeof empty);
    throw 'Anything you want';
}
```

Candid:

```typescript
service: {
    "get_empty": () -> (empty) query;
    "print_empty": (empty) -> (empty) query;
}
```

### Canister APIs

-   [Candid decode](#candid-decode)
-   [Candid encode](#candid-encode)
-   [canister balance](#canister-balance)
-   [canister balance 128](#canister-balance-128)
-   [data certificate](#data-certificate)
-   [canister id](#canister-id)
-   [print](#print)
-   [set certified data](#set-certified-data)
-   [time](#time)
-   [trap](#trap)

#### Candid decode

Examples:

-   [call_raw](/examples/call_raw)
-   [candid_encoding](/examples/candid_encoding)

```typescript
// decodes Candid bytes to a Candid string
export function candid_decode(candid_encoded: blob): Query<string> {
    return ic.candid_decode(candid_encoded);
}
```

#### Candid encode

Examples:

-   [candid_encoding](/examples/candid_encoding)
-   [manual_reply](/examples/manual_reply)
-   [notify_raw](/examples/notify_raw)

```typescript
// encodes a Candid string to Candid bytes
export function candid_encode(candid_string: string): Query<blob> {
    return ic.candid_encode(candid_string);
}
```

#### canister balance

Examples:

-   [cycles](/examples/cycles)
-   [ic_api](/examples/ic_api)

```typescript
import { ic, nat, Query } from 'azle';

// returns the amount of cycles available in the canister
export function canister_balance(): Query<nat64> {
    return ic.canister_balance();
}
```

#### canister balance 128

Examples:

-   [cycles](/examples/cycles)
-   [ic_api](/examples/ic_api)

```typescript
import { ic, nat, Query } from 'azle';

// returns the amount of cycles available in the canister
export function canister_balance128(): Query<nat> {
    return ic.canister_balance128();
}
```

#### data certificate

Examples:

-   [ic_api](/examples/ic_api)

```typescript
import { blob, ic, Opt, Query } from 'azle';

// When called from a query call, returns the data certificate authenticating certified_data set by this canister. Returns None if called not from a query call.
export function data_certificate(): Query<Opt<blob>> {
    return ic.data_certificate();
}
```

#### canister id

Examples:

-   [basic-dao](/examples/motoko_examples/basic-dao)
-   [http_counter](/examples/motoko_examples/http_counter)
-   [ic_api](/examples/ic_api)
-   [whoami](/examples/motoko_examples/whoami)

```typescript
import { ic, Principal, Query } from 'azle';

// returns this canister's id
export function id(): Query<Principal> {
    return ic.id();
}
```

#### print

Examples:

-   [ic_api](/examples/ic_api)

```typescript
import { ic, Query } from 'azle';

// prints a message through the local replica's output
export function print(message: string): Query<boolean> {
    ic.print(message);

    return true;
}
```

#### set certified data

Examples:

-   [ic_api](/examples/ic_api)

```typescript
import { blob, ic, Update } from 'azle';

// sets up to 32 bytes of certified data
export function set_certified_data(data: blob): Update<void> {
    ic.set_certified_data(data);
}
```

#### time

Examples:

-   [basic-dao](/examples/motoko_examples/basic-dao)
-   [ic_api](/examples/ic_api)

```typescript
import { ic, nat64, Query } from 'azle';

// returns the current timestamp
export function time(): Query<nat64> {
    return ic.time();
}
```

#### trap

Examples:

-   [cross_canister_calls](/examples/cross_canister_calls)
-   [http_counter](/examples/motoko_examples/http_counter)
-   [ic_api](/examples/ic_api)

```typescript
import { ic, Query } from 'azle';

// traps with a message, stopping execution and discarding all state within the call
export function trap(message: string): Query<boolean> {
    ic.trap(message);

    return true;
}
```

### Call APIs

-   [caller](#caller)
-   [accept message](#accept-message)
-   [arg data](#arg-data)
-   [arg data raw](#arg-data-raw)
-   [arg data raw size](#arg-data-raw-size)
-   [call](#call)
-   [call raw](#call-raw)
-   [call raw 128](#call-raw-128)
-   [call with payment](#call-with-payment)
-   [call with payment 128](#call-with-payment-128)
-   [method name](#method-name)
-   [msg cycles accept](#msg-cycles-accept)
-   [msg cycles accept 128](#msg-cycles-accept-128)
-   [msg cycles available](#msg-cycles-available)
-   [msg cycles available 128](#msg-cycles-available-128)
-   [msg cycles refunded](#msg-cycles-refunded)
-   [msg cycles refunded 128](#msg-cycles-refunded-128)
-   [notify](#notify)
-   [notify raw](#notify-raw)
-   [notify with payment 128](#notify-with-payment-128)
-   [performance counter](#performance-counter)
-   [reject](#reject)
-   [reject code](#reject-code)
-   [reject message](#reject-message)
-   [reply](#reply)
-   [reply raw](#reply-raw)
-   [result](#result)

#### caller

Examples:

-   [basic-dao](/examples/motoko_examples/basic-dao)
-   [defi](/examples/motoko_examples/defi)
-   [ic_api](/examples/ic_api)
-   [whoami](/examples/motoko_examples/whoami)

```typescript
import { ic, Principal, Query } from 'azle';

// returns the principal of the identity that called this function
export function caller(): Query<Principal> {
    return ic.caller();
}
```

#### accept message

Examples:

-   [inspect_message](/examples/inspect_message)

```typescript
import { ic, InspectMessage, Update } from 'azle';

export function inspect_message(): InspectMessage {
    console.log('this runs before executing update calls');

    if (ic.method_name() === 'accessible') {
        ic.accept_message();
        return;
    }

    if (ic.method_name() === 'inaccessible') {
        return;
    }

    throw `Method "${ic.method_name()}" not allowed`;
}

export function accessible(): Update<boolean> {
    return true;
}

export function inaccessible(): Update<boolean> {
    return false;
}

export function also_inaccessible(): Update<boolean> {
    return false;
}
```

#### arg data

[Not yet implemented.](https://github.com/demergent-labs/azle/issues/496)

#### arg data raw

Examples:

-   [ic_api](/examples/ic_api)

```typescript
// returns the argument data as bytes.
export function arg_data_raw(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): Query<blob> {
    return ic.arg_data_raw();
}
```

#### arg data raw size

Examples:

-   [ic_api](/examples/ic_api)

```typescript
// returns the length of the argument data in bytes
export function arg_data_raw_size(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): Query<nat32> {
    return ic.arg_data_raw_size();
}
```

#### call

Examples:

-   [cross_canister_calls](/examples/cross_canister_calls)
-   [cycles](/examples/cycles)
-   [defi](/examples/motoko_examples/defi)
-   [func_types](/examples/func_types)
-   [rejections](/examples/rejections)
-   [tuple_types](/examples/tuple_types)
-   [whoami](/examples/motoko_examples/whoami)

```typescript
import { Canister, CanisterResult, ic, ok, Update, Variant } from 'azle';

type Canister1 = Canister<{
    method(): CanisterResult<boolean>;
}>;

const canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

type CallCanister1MethodResult = Variant<{
    ok: boolean;
    err: string;
}>;

export function* call_canister1_method(): Update<CallCanister1MethodResult> {
    const canister_result: CanisterResult<boolean> = yield canister1.method();

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: canister_result.ok
    };
}
```

#### call raw

Examples:

-   [basic-dao](/examples/motoko_examples/basic-dao)
-   [call_raw](/examples/call_raw)

```typescript
import { blob, ic, ok, Principal, Update } from 'azle';

export function* get_randomness(): Update<blob> {
    const canister_result: CanisterResult<blob> = yield ic.call_raw(
        Principal.fromText('aaaaa-aa'),
        'raw_rand',
        Uint8Array.from([68, 73, 68, 76, 0, 0]),
        0n // this is a nat64
    );

    if (!ok(canister_result)) {
        return Uint8Array.from([]);
    }

    return canister_result.ok;
}
```

#### call raw 128

Examples:

-   [call_raw](/examples/call_raw)

```typescript
import { blob, ic, ok, Principal, Update } from 'azle';

export function* get_randomness(): Update<blob> {
    const canister_result: CanisterResult<blob> = yield ic.call_raw128(
        Principal.fromText('aaaaa-aa'),
        'raw_rand',
        Uint8Array.from([68, 73, 68, 76, 0, 0]),
        0n // this is a nat
    );

    if (!ok(canister_result)) {
        return Uint8Array.from([]);
    }

    return canister_result.ok;
}
```

#### call with payment

Examples:

-   [cycles](/examples/cycles)
-   [management_canister](/examples/management_canister)

```typescript
import { Canister, CanisterResult, ic, ok, Update, Variant } from 'azle';

type Canister1 = Canister<{
    method(): CanisterResult<boolean>;
}>;

const canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

type CallCanister1MethodResult = Variant<{
    ok: boolean;
    err: string;
}>;

export function* call_canister1_method(): Update<CallCanister1MethodResult> {
    const canister_result: CanisterResult<boolean> = yield canister1
        .method()
        .with_cycles(100_000_000_000n);

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: canister_result.ok
    };
}
```

#### call with payment 128

Examples:

-   [cycles](/examples/cycles)

```typescript
import { Canister, CanisterResult, ic, ok, Update, Variant } from 'azle';

type Canister1 = Canister<{
    method(): CanisterResult<boolean>;
}>;

const canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

type CallCanister1MethodResult = Variant<{
    ok: boolean;
    err: string;
}>;

export function* call_canister1_method(): Update<CallCanister1MethodResult> {
    const canister_result: CanisterResult<boolean> = yield canister1
        .method()
        .with_cycles128(100_000_000_000n);

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: canister_result.ok
    };
}
```

#### method name

Examples:

-   [inspect_message](/examples/inspect_message)

```typescript
import { ic, InspectMessage, Update } from 'azle';

export function inspect_message(): InspectMessage {
    console.log('this runs before executing update calls');

    if (ic.method_name() === 'accessible') {
        ic.accept_message();
        return;
    }

    if (ic.method_name() === 'inaccessible') {
        return;
    }

    throw `Method "${ic.method_name()}" not allowed`;
}

export function accessible(): Update<boolean> {
    return true;
}

export function inaccessible(): Update<boolean> {
    return false;
}

export function also_inaccessible(): Update<boolean> {
    return false;
}
```

#### msg cycles accept

Examples:

-   [cycles](/examples/cycles)

```typescript
import { ic, nat64, Update } from 'azle';

// Moves all transferred cycles to the canister
export function receive_cycles(): Update<nat64> {
    return ic.msg_cycles_accept(ic.msg_cycles_available());
}
```

#### msg cycles accept 128

Examples:

-   [cycles](/examples/cycles)

```typescript
import { ic, nat, Update } from 'azle';

// Moves all transferred cycles to the canister
export function receive_cycles128(): Update<nat> {
    return ic.msg_cycles_accept128(ic.msg_cycles_available128());
}
```

#### msg cycles available

Examples:

-   [cycles](/examples/cycles)

```typescript
import { ic, nat64, Update } from 'azle';

// Moves all transferred cycles to the canister
export function receive_cycles(): Update<nat64> {
    return ic.msg_cycles_accept(ic.msg_cycles_available());
}
```

#### msg cycles available 128

Examples:

-   [cycles](/examples/cycles)

```typescript
import { ic, nat64, Update } from 'azle';

// Moves all transferred cycles to the canister
export function receive_cycles128(): Update<nat64> {
    return ic.msg_cycles_accept128(ic.msg_cycles_available128());
}
```

#### msg cycles refunded

Examples:

-   [cycles](/examples/cycles)

```typescript
import { Canister, CanisterResult, ic, nat64, ok, Update, Variant } from 'azle';

type Canister1 = Canister<{
    method(): CanisterResult<boolean>;
}>;

const canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

type CallCanister1MethodResult = Variant<{
    ok: nat64;
    err: string;
}>;

export function* call_canister1_method(): Update<CallCanister1MethodResult> {
    const canister_result: CanisterResult<boolean> = yield canister1
        .method()
        .with_cycles(100_000_000_000n);

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: ic.msg_cycles_refunded()
    };
}
```

#### msg cycles refunded 128

Examples:

-   [cycles](/examples/cycles)

```typescript
import { Canister, CanisterResult, ic, nat, ok, Update, Variant } from 'azle';

type Canister1 = Canister<{
    method(): CanisterResult<boolean>;
}>;

const canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

type CallCanister1MethodResult = Variant<{
    ok: nat;
    err: string;
}>;

export function* call_canister1_method(): Update<CallCanister1MethodResult> {
    const canister_result: CanisterResult<boolean> = yield canister1
        .method()
        .with_cycles128(100_000_000_000n);

    if (!ok(canister_result)) {
        return {
            err: canister_result.err
        };
    }

    return {
        ok: ic.msg_cycles_refunded128()
    };
}
```

#### notify

Examples:

-   [cross_canister_calls](/examples/cross_canister_calls)
-   [cycles](/examples/cycles)

```typescript
import { Canister, CanisterResult, ic, ok, Update } from 'azle';

type Canister1 = Canister<{
    method(): CanisterResult<boolean>;
}>;

const canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

export function call_canister1_method(): Update<boolean> {
    const canister_result: CanisterResult<null> = canister1.method().notify();

    if (!ok(canister_result)) {
        return false;
    }

    return true;
}
```

#### notify raw

Examples:

-   [notify_raw](/examples/notify_raw)

```typescript
import { ic, ok, Principal, Update } from 'azle';

export function send_notification(): Update<boolean> {
    const result = ic.notify_raw(
        Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai'),
        'receive_notification',
        Uint8Array.from(ic.candid_encode('()')),
        0n
    );

    if (!ok(result)) {
        return false;
    }

    return true;
}
```

#### notify with payment 128

Examples:

-   [cycles](/examples/cycles)

```typescript
import { Canister, CanisterResult, ic, ok, Update } from 'azle';

type Canister1 = Canister<{
    method(): CanisterResult<boolean>;
}>;

const canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

export function call_canister1_method(): Update<boolean> {
    const canister_result: CanisterResult<null> = canister1
        .method()
        .notify()
        .with_cycles128(100_000_000_000n);

    if (!ok(canister_result)) {
        return false;
    }

    return true;
}
```

#### performance counter

Examples:

-   [ic_api](/examples/ic_api)

```typescript
export function performance_counter(): Query<nat64> {
    return ic.performance_counter(0);
}
```

#### reject

Examples:

-   [ic_api](/examples/ic_api)
-   [manual_reply](/examples/manual_reply)
-   [rejections](/examples/rejections)

```typescript
import { empty, ic, QueryManual } from 'azle';

export function reject(message: string): QueryManual<empty> {
    ic.reject(message);
}
```

#### reject code

Examples:

-   [rejections](/examples/rejections)

```typescript
import { Canister, CanisterResult, ic, RejectionCode, Update } from 'azle';

type Canister1 = Canister<{
    method(): CanisterResult<boolean>;
}>;

const canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

export function* get_rejection_code(): Update<RejectionCode> {
    yield canister1.method();
    return ic.reject_code();
}
```

#### reject message

Examples:

-   [rejections](/examples/rejections)

```typescript
import { Canister, CanisterResult, ic, Update } from 'azle';

type Canister1 = Canister<{
    method(): CanisterResult<boolean>;
}>;

const canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rkp4c-7iaaa-aaaaa-aaaca-cai')
);

export function* get_rejection_message(): Update<string> {
    yield canister1.method();
    return ic.reject_message();
}
```

#### reply

Examples:

-   [manual_reply](/examples/manual_reply)

```typescript
import { ic, UpdateManual } from 'azle';

export function manual_update(message: string): UpdateManual<string> {
    if (message === 'reject') {
        ic.reject(message);
        return;
    }

    ic.reply(message);
}
```

#### reply raw

Examples:

-   [manual_reply](/examples/manual_reply)

```typescript
import { blob, ic, int, UpdateManual, Variant } from 'azle';

type RawReply = {
    int: int;
    text: string;
    bool: boolean;
    blob: blob;
    variant: Options;
};

type Options = Variant<{
    Small: null;
    Medium: null;
    Large: null;
}>;

export function reply_raw(): UpdateManual<RawReply> {
    ic.reply_raw(
        ic.candid_encode(
            '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "Surprise!"; "variant" = variant { Medium } })'
        )
    );
}
```

#### result

[Not yet implemented.](https://github.com/demergent-labs/azle/issues/496)

### Stable Memory

-   [stable storage](#stable-storage)
-   [stable64 grow](#stable64-grow)
-   [stable64 read](#stable64-read)
-   [stable64 size](#stable64-size)
-   [stable64 write](#stable64-write)
-   [stable bytes](#stable-bytes)
-   [stable grow](#stable-grow)
-   [stable read](#stable-read)
-   [stable size](#stable-size)
-   [stable write](#stable-write)

#### stable storage

Examples:

-   [basic-dao](/examples/motoko_examples/basic-dao)
-   [func_types](/examples/func_types)
-   [http_counter](/examples/motoko_examples/http_counter)
-   [persistent_storage](/examples/motoko_examples/persistent-storage)
-   [pre_and_post_upgrade](/examples/pre_and_post_upgrade)
-   [stable_storage](/examples/stable_storage)
-   [tuple_types](/examples/tuple_types)

```typescript
import { Init, nat, Stable, Update } from 'azle';

type StableStorage = Stable<{
    stable_nat: nat;
}>;

let stable_storage: StableStorage = ic.stable_storage();

export function init(_stable_nat: nat): Init {
    stable_storage.stable_nat = _stable_nat;
}
```

#### stable64 grow

Examples:

-   [stable_memory](/examples/stable_memory)

```typescript
import { ic, nat64, Stable64GrowResult, Update } from 'azle';

export function stable64_grow(new_pages: nat64): Update<Stable64GrowResult> {
    return ic.stable64_grow(new_pages);
}
```

#### stable64 read

Examples:

-   [stable_memory](/examples/stable_memory)

```typescript
import { blob, ic, nat64, Query } from 'azle';

export function stable64_read(offset: nat64, length: nat64): Query<blob> {
    return ic.stable64_read(offset, length);
}
```

#### stable64 size

Examples:

-   [stable_memory](/examples/stable_memory)

```typescript
import { ic, nat64, Query } from 'azle';

export function stable64_size(): Query<nat64> {
    return ic.stable64_size();
}
```

#### stable64 write

Examples:

-   [stable_memory](/examples/stable_memory)

```typescript
import { blob, ic, nat64, Update } from 'azle';

export function stable64_write(offset: nat64, buf: blob): Update<void> {
    ic.stable64_write(offset, buf);
}
```

#### stable bytes

Examples:

-   [stable_memory](/examples/stable_memory)

```typescript
import { blob, ic, Query } from 'azle';

export function stable_bytes(): Query<blob> {
    return ic.stable_bytes();
}
```

#### stable grow

Examples:

-   [stable_memory](/examples/stable_memory)

```typescript
import { ic, nat32, StableGrowResult, Update } from 'azle';

export function stable_grow(new_pages: nat32): Update<StableGrowResult> {
    return ic.stable_grow(new_pages);
}
```

#### stable read

Examples:

-   [stable_memory](/examples/stable_memory)

```typescript
import { blob, ic, nat32, Query } from 'azle';

export function stable_read(offset: nat32, length: nat32): Query<blob> {
    return ic.stable_read(offset, length);
}
```

#### stable size

Examples:

-   [stable_memory](/examples/stable_memory)

```typescript
import { ic, nat32, Query } from 'azle';

export function stable_size(): Query<nat32> {
    return ic.stable_size();
}
```

#### stable write

Examples:

-   [stable_memory](/examples/stable_memory)

```typescript
import { blob, ic, nat32, Update } from 'azle';

export function stable_write(offset: nat32, buf: blob): Update<void> {
    ic.stable_write(offset, buf);
}
```

### Special APIs

#### Outgoing HTTP Requests

This feature is available in `dfx 0.11.0` with the `--enable-canister-http` flag but is not yet live on the IC.

Examples:

-   [ethereum_json_rpc](/examples/ethereum_json_rpc)
-   [outgoing_http_requests](/examples/outgoing_http_requests)

```typescript
import { CanisterResult, ic, ok, Query, Update } from 'azle';
import { HttpResponse, ManagementCanister } from 'azle/canisters/management';

export function* xkcd(): Update<HttpResponse> {
    const max_response_bytes = 1_000n;

    // TODO this is just a hueristic for cost, might change when the feature is officially released: https://forum.dfinity.org/t/enable-canisters-to-make-http-s-requests/9670/130
    const cycle_cost_base = 400_000_000n;
    const cycle_cost_per_byte = 300_000n; // TODO not sure on this exact cost
    const cycle_cost_total =
        cycle_cost_base + cycle_cost_per_byte * max_response_bytes;

    const http_result: CanisterResult<HttpResponse> =
        yield ManagementCanister.http_request({
            url: `https://xkcd.com/642/info.0.json`,
            max_response_bytes,
            http_method: {
                GET: null
            },
            headers: [],
            body: null,
            transform_method_name: 'xkcd_transform'
        }).with_cycles(cycle_cost_total);

    if (!ok(http_result)) {
        ic.trap(http_result.err ?? 'http_result had an error');
    }

    return http_result.ok;
}
```

### JS APIs

This section will describe various JS APIs that may need special explanation.

#### Date

You can see examples of how to use the JS Date object [here](/examples/date). Note that `Date.prototype.toLocaleDateString()` and `Date.prototype.toLocaleTimeString()` are [not yet implemented](https://github.com/boa-dev/boa/issues/1562). Also keep in mind that the local timezone of the canister will always be `UTC`.

#### Math.random()

[Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) currently returns the same value every time it is called. There is an [issue open to address this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random). If you need randomness you should use `raw_rand` on the [management canister](<(/examples/management_canister)>).

### Feature Parity

The following is a comparison of all of the major features of the [Rust CDK](https://github.com/dfinity/cdk-rs), [Motoko](https://github.com/dfinity/motoko), and Azle.

-   :heavy_check_mark: = supported
-   :x: = not supported
-   :grey_question: = unknown
-   :white_check_mark: = not applicable

#### Canister Methods

| Feature                                                                                                              | Rust CDK                                                                                           | Motoko                                                                                                                                                    | Azle                                                                                                                      |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| init                                                                                                                 | [:heavy_check_mark:](https://docs.rs/ic-cdk-macros/latest/ic_cdk_macros/attr.init.html)            | :heavy_check_mark:                                                                                                                                        | [:heavy_check_mark:](https://github.com/demergent-labs/azle#init-method)                                                  |
| pre upgrade                                                                                                          | [:heavy_check_mark:](https://docs.rs/ic-cdk-macros/latest/ic_cdk_macros/attr.pre_upgrade.html)     | [:heavy_check_mark:](https://internetcomputer.org/docs/current/developer-docs/build/languages/motoko/upgrades#preupgrade-and-postupgrade-system-methods)  | [:heavy_check_mark:](https://github.com/demergent-labs/azle#preupgrade-method)                                            |
| post upgrade                                                                                                         | [:heavy_check_mark:](https://docs.rs/ic-cdk-macros/latest/ic_cdk_macros/attr.post_upgrade.html)    | [:heavy_check_mark:](https://internetcomputer.org/docs/current/developer-docs/build/languages/motoko/upgrades/#preupgrade-and-postupgrade-system-methods) | [:heavy_check_mark:](https://github.com/demergent-labs/azle#postupgrade-method)                                           |
| inspect message                                                                                                      | [:heavy_check_mark:](https://docs.rs/ic-cdk-macros/latest/ic_cdk_macros/attr.inspect_message.html) | [:heavy_check_mark:](https://github.com/dfinity/motoko/issues/2528)                                                                                       | [:heavy_check_mark:](https://internetcomputer.org/docs/current/developer-docs/build/languages/motoko/message-inspection/) |
| heartbeat                                                                                                            | [:heavy_check_mark:](https://docs.rs/ic-cdk-macros/latest/ic_cdk_macros/attr.heartbeat.html)       | [:heavy_check_mark:](https://internetcomputer.org/docs/current/developer-docs/build/languages/motoko/heartbeats)                                          | [:heavy_check_mark:](https://github.com/demergent-labs/azle#heartbeat-method)                                             |
| update                                                                                                               | [:heavy_check_mark:](https://docs.rs/ic-cdk-macros/latest/ic_cdk_macros/attr.update.html)          | [:heavy_check_mark:](https://internetcomputer.org/docs/current/developer-docs/build/languages/motoko/actors-async#query-functions)                        | [:heavy_check_mark:](https://github.com/demergent-labs/azle#update-methods)                                               |
| query                                                                                                                | [:heavy_check_mark:](https://docs.rs/ic-cdk-macros/latest/ic_cdk_macros/attr.query.html)           | [:heavy_check_mark:](https://internetcomputer.org/docs/current/developer-docs/build/languages/motoko/actors-async#query-functions)                        | [:heavy_check_mark:](https://github.com/demergent-labs/azle#query-methods)                                                |
| [http_request](https://github.com/dfinity/interface-spec/blob/master/spec/index.adoc#ic-method-http_request)         | :heavy_check_mark:                                                                                 | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                        |
| [http_request_update](https://github.com/dfinity/interface-spec/blob/master/spec/index.adoc#upgrade-to-update-calls) | :heavy_check_mark:                                                                                 | :heavy_check_mark:                                                                                                                                        | :heavy_check_mark:                                                                                                        |

#### Candid Types

| Feature                                                                                              | Rust CDK                                                                                                   | Motoko             | Azle               |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------ | ------------------ |
| [text](https://internetcomputer.org/docs/current/references/candid-ref/#type-text)                   | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Text)      | :heavy_check_mark: | :heavy_check_mark: |
| [blob](https://internetcomputer.org/docs/current/references/candid-ref/#type-blob)                   | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Vec)       | :heavy_check_mark: | :heavy_check_mark: |
| [nat](https://internetcomputer.org/docs/current/references/candid-ref/#type-nat)                     | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Nat)       | :heavy_check_mark: | :heavy_check_mark: |
| [nat64](https://internetcomputer.org/docs/current/references/candid-ref/#type-natn-and-intn)         | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Nat64)     | :heavy_check_mark: | :heavy_check_mark: |
| [nat32](https://internetcomputer.org/docs/current/references/candid-ref/#type-natn-and-intn)         | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Nat32)     | :heavy_check_mark: | :heavy_check_mark: |
| [nat16](https://internetcomputer.org/docs/current/references/candid-ref/#type-natn-and-intn)         | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Nat16)     | :heavy_check_mark: | :heavy_check_mark: |
| [nat8](https://internetcomputer.org/docs/current/references/candid-ref/#type-natn-and-intn)          | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Nat8)      | :heavy_check_mark: | :heavy_check_mark: |
| [int](https://internetcomputer.org/docs/current/references/candid-ref/#type-int)                     | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Int)       | :heavy_check_mark: | :heavy_check_mark: |
| [int64](https://internetcomputer.org/docs/current/references/candid-ref/#type-natn-and-intn)         | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Int64)     | :heavy_check_mark: | :heavy_check_mark: |
| [int32](https://internetcomputer.org/docs/current/references/candid-ref/#type-natn-and-intn)         | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Int32)     | :heavy_check_mark: | :heavy_check_mark: |
| [int16](https://internetcomputer.org/docs/current/references/candid-ref/#type-natn-and-intn)         | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Int16)     | :heavy_check_mark: | :heavy_check_mark: |
| [int8](https://internetcomputer.org/docs/current/references/candid-ref/#type-natn-and-intn)          | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Int8)      | :heavy_check_mark: | :heavy_check_mark: |
| [float64](https://internetcomputer.org/docs/current/references/candid-ref/#type-float32-and-float64) | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Float64)   | :heavy_check_mark: | :heavy_check_mark: |
| [float32](https://internetcomputer.org/docs/current/references/candid-ref/#type-float32-and-float64) | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Float32)   | :heavy_check_mark: | :heavy_check_mark: |
| [bool](https://internetcomputer.org/docs/current/references/candid-ref/#type-bool)                   | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Bool)      | :heavy_check_mark: | :heavy_check_mark: |
| [null](https://internetcomputer.org/docs/current/references/candid-ref/#type-null)                   | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Null)      | :heavy_check_mark: | :heavy_check_mark: |
| [vec](https://internetcomputer.org/docs/current/references/candid-ref/#type-vec-t)                   | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Vec)       | :heavy_check_mark: | :heavy_check_mark: |
| [opt](https://internetcomputer.org/docs/current/references/candid-ref/#type-opt-t)                   | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Opt)       | :heavy_check_mark: | :heavy_check_mark: |
| [record](https://internetcomputer.org/docs/current/references/candid-ref/#type-record--n--t--)       | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Record)    | :heavy_check_mark: | :heavy_check_mark: |
| [variant](https://internetcomputer.org/docs/current/references/candid-ref/#type-variant--n--t--)     | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Variant)   | :heavy_check_mark: | :heavy_check_mark: |
| [func](https://internetcomputer.org/docs/current/references/candid-ref/#type-func---)                | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Func)      | :heavy_check_mark: | :heavy_check_mark: |
| [service](https://internetcomputer.org/docs/current/references/candid-ref/#type-service-)            | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Service)   | :heavy_check_mark: | :x:                |
| [principal](https://internetcomputer.org/docs/current/references/candid-ref/#type-principal)         | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Principal) | :heavy_check_mark: | :heavy_check_mark: |
| [reserved](https://internetcomputer.org/docs/current/references/candid-ref/#type-reserved)           | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Reserved)  | :heavy_check_mark: | :heavy_check_mark: |
| [empty](https://internetcomputer.org/docs/current/references/candid-ref/#type-empty)                 | [:heavy_check_mark:](https://docs.rs/candid/0.7.14/candid/types/internal/enum.Type.html#variant.Empty)     | :heavy_check_mark: | :heavy_check_mark: |

#### Canister APIs

| Feature              | Rust CDK                                                                                   | Motoko             | Azle               |
| -------------------- | ------------------------------------------------------------------------------------------ | ------------------ | ------------------ |
| canister balance     | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/fn.canister_balance.html)    | :white_check_mark: | :heavy_check_mark: |
| canister balance 128 | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/fn.canister_balance128.html) | :heavy_check_mark: | :heavy_check_mark: |
| data certificate     | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/fn.data_certificate.html)    | :heavy_check_mark: | :heavy_check_mark: |
| canister id          | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/fn.id.html)                  | :heavy_check_mark: | :heavy_check_mark: |
| print                | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/fn.print.html)               | :heavy_check_mark: | :heavy_check_mark: |
| set certified data   | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/fn.set_certified_data.html)  | :heavy_check_mark: | :heavy_check_mark: |
| time                 | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/fn.time.html)                | :heavy_check_mark: | :heavy_check_mark: |
| trap                 | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/fn.trap.html)                | :heavy_check_mark: | :heavy_check_mark: |

#### Call APIs

| Feature                  | Rust CDK                                                                                            | Motoko             | Azle               |
| ------------------------ | --------------------------------------------------------------------------------------------------- | ------------------ | ------------------ |
| caller                   | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/fn.caller.html)                       | :heavy_check_mark: | :heavy_check_mark: |
| accept message           | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.accept_message.html)          | :heavy_check_mark: | :heavy_check_mark: |
| arg data                 | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.arg_data.html)                | :grey_question:    | :x:                |
| arg data raw             | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.arg_data_raw.html)            | :grey_question:    | :heavy_check_mark: |
| arg data raw size        | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.arg_data_raw_size.html)       | :grey_question:    | :heavy_check_mark: |
| call                     | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.call.html)                    | :heavy_check_mark: | :heavy_check_mark: |
| call raw                 | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.call_raw.html)                | :white_check_mark: | :heavy_check_mark: |
| call raw 128             | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.call_raw128.html)             | :heavy_check_mark: | :heavy_check_mark: |
| call with payment        | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.call_with_payment.html)       | :white_check_mark: | :heavy_check_mark: |
| call with payment 128    | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.call_with_payment128.html)    | :heavy_check_mark: | :heavy_check_mark: |
| method name              | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.method_name.html)             | :heavy_check_mark: | :heavy_check_mark: |
| msg cycles accept        | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.msg_cycles_accept.html)       | :white_check_mark: | :heavy_check_mark: |
| msg cycles accept 128    | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.msg_cycles_accept128.html)    | :heavy_check_mark: | :heavy_check_mark: |
| msg cycles available     | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.msg_cycles_available.html)    | :white_check_mark: | :heavy_check_mark: |
| msg cycles available 128 | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.msg_cycles_available128.html) | :heavy_check_mark: | :heavy_check_mark: |
| msg cycles refunded      | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.msg_cycles_refunded.html)     | :white_check_mark: | :heavy_check_mark: |
| msg cycles refunded 128  | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.msg_cycles_refunded128.html)  | :heavy_check_mark: | :heavy_check_mark: |
| notify                   | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.notify.html)                  | :grey_question:    | :heavy_check_mark: |
| notify raw               | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.notify_raw.html)              | :grey_question:    | :heavy_check_mark: |
| notify with payment 128  | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.notify_with_payment128.html)  | :grey_question:    | :heavy_check_mark: |
| performance counter      | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.performance_counter.html)     | :heavy_check_mark: | :heavy_check_mark: |
| reject                   | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.reject.html)                  | :grey_question:    | :heavy_check_mark: |
| reject code              | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.reject_code.html)             | :grey_question:    | :heavy_check_mark: |
| reject message           | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.reject_message.html)          | :grey_question:    | :heavy_check_mark: |
| reply                    | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.reply.html)                   | :grey_question:    | :heavy_check_mark: |
| reply raw                | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.reply_raw.html)               | :grey_question:    | :heavy_check_mark: |
| result                   | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/call/fn.result.html)                  | :grey_question:    | :x:                |

#### Stable Memory

| Feature              | Rust CDK                                                                                     | Motoko                                                                                                                   | Azle               |
| -------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| stable storage       | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/storage/index.html)                | :heavy_check_mark:                                                                                                       | :heavy_check_mark: |
| stable64 grow        | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/stable/fn.stable64_grow.html)  | [:heavy_check_mark:](https://internetcomputer.org/docs/current/references/motoko-ref/experimentalstablememory#grow)      | :heavy_check_mark: |
| stable64 read        | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/stable/fn.stable64_read.html)  | [:heavy_check_mark:](https://internetcomputer.org/docs/current/references/motoko-ref/experimentalstablememory#loadblob)  | :heavy_check_mark: |
| stable64 size        | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/stable/fn.stable64_size.html)  | [:heavy_check_mark:](https://internetcomputer.org/docs/current/references/motoko-ref/experimentalstablememory#size)      | :heavy_check_mark: |
| stable64 write       | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/stable/fn.stable64_write.html) | [:heavy_check_mark:](https://internetcomputer.org/docs/current/references/motoko-ref/experimentalstablememory#storeblob) | :heavy_check_mark: |
| stable bytes         | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/stable/fn.stable_bytes.html)   | :x:                                                                                                                      | :heavy_check_mark: |
| stable grow          | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/stable/fn.stable_grow.html)    | :white_check_mark:                                                                                                       | :heavy_check_mark: |
| stable read          | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/stable/fn.stable_read.html)    | :white_check_mark:                                                                                                       | :heavy_check_mark: |
| stable size          | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/stable/fn.stable_size.html)    | :white_check_mark:                                                                                                       | :heavy_check_mark: |
| stable write         | [:heavy_check_mark:](https://docs.rs/ic-cdk/latest/ic_cdk/api/stable/fn.stable_write.html)   | :white_check_mark:                                                                                                       | :heavy_check_mark: |
| stable read nat64    | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable write nat64   | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable read nat32    | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable write nat32   | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable read nat16    | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable write nat16   | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable read nat8     | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable write nat8    | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable read int64    | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable write int64   | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable read int32    | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable write int32   | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable read int16    | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable write int16   | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable read int8     | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable write int8    | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable read float64  | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |
| stable write float64 | :x:                                                                                          | :heavy_check_mark:                                                                                                       | :x:                |

### Benchmarks

#### TLDR

Last major update to this benchmarking information: August 2022

Here's a quick rough estimate summary of the benchmarks:

-   Average/Median Azle Wasm instructions per function call: 121_919_698 / 2_387_322
-   Average/Median Motoko Wasm instructions per function call: 272_877 / 5_169
-   Average/Median Rust Wasm instructions per function call: 26_378_678 / 44_074

-   Average/Median Azle/Motoko Wasm instructions difference: 1_273x / 396x
-   Average/Median Azle/Rust Wasm instructions difference: 204x / 51x
-   Average/Median Motoko/Rust Wasm instructions difference: -22x / -8x

-   Average/Median Azle/Motoko USD cost estimate difference using average Wasm instructions: 5x / 3x
-   Maximum Azle/Motoko USD cost estimate difference using average Wasm instructions: 13x

-   Average/Median Azle/Rust USD cost estimate difference using average Wasm instructions: 2x / 2x
-   Maximum Azle/Rust USD cost estimate difference using average Wasm instructions: 4x

-   Average/Median Azle/Motoko USD cost difference using median Wasm instructions: 1x / 1x
-   Maximum Azle/Motoko USD cost difference using median Wasm instructions: 1x

-   Average/Median Azle/Rust USD cost difference using median Wasm instructions: 1x / 1x
-   Maximum Azle/Rust USD cost difference using median Wasm instructions: 1x

#### Introduction to the Benchmarks

Azle's automated benchmarking framework is currently based on the `ic0.performance_counter` [System API](https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-imports). `ic0.performance_counter` seems to have a number of limitations. The following may not be measured accurately:

-   Candid serialization/deserialization of function parameters and return types
-   Canister method prologue/epilogue
-   Some Motoko runtime behavior (such as garbage collection and method prologue)

You can find out more information about `ic0.performance_counter` [here](https://forum.dfinity.org/t/introducing-performance-counter-on-the-internet-computer/14027).

We currently have benchmarks for the following examples written with Azle, Motoko, and Rust:

-   examples/bytes
    -   [summary](/examples/bytes/benchmarks.md)
    -   [csv](/examples/bytes/benchmarks.csv)
-   examples/key_value_store
    -   [summary](/examples/key_value_store/benchmarks.md)
    -   [csv](/examples/key_value_store/benchmarks.csv)
-   examples/motoko_examples/calc
    -   [summary](/examples/motoko_examples/calc/benchmarks.md)
    -   [csv](/examples/motoko_examples/calc/benchmarks.csv)
-   examples/motoko_examples/counter
    -   [summary](/examples/motoko_examples/counter/benchmarks.md)
    -   [csv](/examples/motoko_examples/counter/benchmarks.csv)
-   examples/motoko_examples/factorial
    -   [summary](/examples/motoko_examples/factorial/benchmarks.md)
    -   [csv](/examples/motoko_examples/factorial/benchmarks.csv)
-   examples/motoko_examples/minimal-counter-dapp
    -   [summary](/examples/motoko_examples/minimal-counter-dapp/benchmarks.md)
    -   [csv](/examples/motoko_examples/minimal-counter-dapp/benchmarks.csv)
-   examples/motoko_examples/persistent-storage
    -   [summary](/examples/motoko_examples/persistent-storage/benchmarks.md)
    -   [csv](/examples/motoko_examples/persistent-storage/benchmarks.csv)
-   examples/motoko_examples/phone-book
    -   [summary](/examples/motoko_examples/phone-book/benchmarks.md)
    -   [csv](/examples/motoko_examples/phone-book/benchmarks.csv)
-   examples/motoko_examples/quicksort
    -   [summary](/examples/motoko_examples/quicksort/benchmarks.md)
    -   [csv](/examples/motoko_examples/quicksort/benchmarks.csv)
-   examples/motoko_examples/simple-to-do
    -   [summary](/examples/motoko_examples/simple-to-do/benchmarks.md)
    -   [csv](/examples/motoko_examples/simple-to-do/benchmarks.csv)
-   examples/motoko_examples/superheroes
    -   [summary](/examples/motoko_examples/superheroes/benchmarks.md)
    -   [csv](/examples/motoko_examples/superheroes/benchmarks.csv)
-   examples/motoko_examples/whoami
    -   [summary](/examples/motoko_examples/whoami/benchmarks.md)
    -   [csv](/examples/motoko_examples/whoami/benchmarks.csv)
-   examples/primitive_ops
    -   [summary](/examples/primitive_ops/benchmarks.md)
    -   [csv](/examples/primitive_ops/benchmarks.csv)
-   examples/update
    -   [summary](/examples/update/benchmarks.md)
    -   [csv](/examples/update/benchmarks.csv)

Below are the results of aggregating all of the benchmarking key metrics from the examples above.

`function body only` means measurements were taken only from the beginning to the end of the function body of the function under measurement. `function prelude and body` means measurements were taken at the end of the body of the function under measurement, including what may have happend before the function was invoked. It may be more realistic to rely on `function prelude and body`, as it captures more of the real Wasm instruction usage. That being said, something seems off with the Motoko prelude measurements.

#### Wasm Instructions

The number of Wasm instructions counted by `ic0.performance_counter` for a function under measurement. These do not translate directly into actual cycle costs. See the section on USD cost estimates below for more information.

##### Azle

-   function body only
    -   Average: 90_880_192
    -   Median: 1_974_800
-   function prelude and body
    -   Average: 121_919_698
    -   Median: 2_387_322

##### Motoko

-   function body only
    -   Average: 225_577
    -   Median: 3_361
-   function prelude and body
    -   Average: 272_877
    -   Median: 5_169

##### Rust

-   function body only
    -   Average: 88_912
    -   Median: 2_820
-   function prelude and body
    -   Average: 26_378_678
    -   Median: 44_074

#### Change Multipliers

Change multipliers show how many times greater or fewer Wasm instructions are used when comparing one language to another. A positive number means more instructions are used by language a vs language b. A negative number means fewer instructions are used by language a vs language b. Languages a and b are determined with this pattern: considering `Azle/Motoko`, Azle is language a and Motoko is language b.

##### Azle/Motoko

-   function body only
    -   Average: 2_649x
    -   Median: 468x
-   function prelude and body
    -   Average: 1_273x
    -   Median: 396x

##### Azle/Rust

-   function body only
    -   Average: 2_426x
    -   Median: 233x
-   function prelude and body
    -   Average: 204x
    -   Median: 51x

##### Motoko/Rust

-   function body only:
    -   Average: -3x
    -   Median: 1x
-   function prelude and body:
    -   Average: -22x
    -   Median: -8x

#### USD Cost Estimates

An attempt to estimate actual USD costs per year based on the Wasm instruction counts. A number of application scenarios are presented that attempt to simulate real-world application usage. Cycle costs are taken from [here](https://internetcomputer.org/docs/current/developer-docs/deploy/computation-and-storage-costs/).

##### Average

These estimates use the average Wasm instructions per function call including the function prelude.

The Wasm instruction counts used are:

-   Azle: 121_919_698
-   Motoko: 272_877
-   Rust: 26_378_678

###### Cycle Costs Table

Cycle costs taken from [here](https://internetcomputer.org/docs/current/developer-docs/deploy/computation-and-storage-costs/).

| Compute Percent Allocated Per Second | Update Message Execution | Ten Update Instructions Execution | Xnet Call | Xnet Byte Transmission | Ingress Message Reception | Ingress Byte Reception | GB Storage Per Second |
| ------------------------------------ | ------------------------ | --------------------------------- | --------- | ---------------------- | ------------------------- | ---------------------- | --------------------- |
| 100_000                              | 590_000                  | 4                                 | 260_000   | 1_000                  | 1_200_000                 | 2_000                  | 127_000               |

###### Application Scenarios

| Usage    | Query/Update Heaviness | Ingress Bytes Per Query Message | Ingress Bytes Per Update Message | GB Storage | Query Messages Per Second | Update Messages Per Second | Xnet Calls Per Second | Xnet Call Bytes |
| -------- | ---------------------- | ------------------------------- | -------------------------------- | ---------- | ------------------------- | -------------------------- | --------------------- | --------------- |
| Light    | Even                   | 100                             | 100                              | 0.5        | 0.01                      | 0.01                       | 0.001                 | 20              |
| Light    | Query Heavy            | 100                             | 100                              | 0.5        | 0.01                      | 0.0001                     | 0.001                 | 20              |
| Light    | Update Heavy           | 100                             | 100                              | 0.5        | 0.0001                    | 0.01                       | 0.001                 | 20              |
| Moderate | Even                   | 1_000                           | 1_000                            | 1          | 1                         | 1                          | 0.1                   | 200             |
| Moderate | Query Heavy            | 1_000                           | 1_000                            | 1          | 1                         | 0.01                       | 0.1                   | 200             |
| Moderate | Update Heavy           | 1_000                           | 1_000                            | 1          | 0.01                      | 1                          | 0.1                   | 200             |
| Heavy    | Even                   | 10_000                          | 10_000                           | 2          | 100                       | 100                        | 10                    | 2_000           |
| Heavy    | Query Heavy            | 10_000                          | 10_000                           | 2          | 100                       | 1                          | 10                    | 2_000           |
| Heavy    | Update Heavy           | 10_000                          | 10_000                           | 2          | 1                         | 100                        | 10                    | 2_000           |

###### Application USD Cost Estimates Per Year

| Usage    | Query/Update Heaviness | CDK    | Ingress Messages | Ingress Bytes Query Messages | Ingress Bytes Update Messages | Update Messages | Update Instructions | Xnet Calls | Xnet Byte Transmission | GB Storage | Total Cost  |
| -------- | ---------------------- | ------ | ---------------- | ---------------------------- | ----------------------------- | --------------- | ------------------- | ---------- | ---------------------- | ---------- | ----------- |
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $20.30              | $0.01      | $0.00                  | $2.64      | $24.37      |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.05               | $0.01      | $0.00                  | $2.64      | $4.11       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $4.39               | $0.01      | $0.00                  | $2.64      | $8.46       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.20               | $0.01      | $0.00                  | $2.64      | $3.45       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.04               | $0.01      | $0.00                  | $2.64      | $3.29       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $20.30              | $0.01      | $0.00                  | $2.64      | $23.79      |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.05               | $0.01      | $0.00                  | $2.64      | $3.53       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $4.39               | $0.01      | $0.00                  | $2.64      | $7.88       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $2,030.09           | $1.08      | $0.83                  | $5.29      | $2,328.26   |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $4.54               | $1.08      | $0.83                  | $5.29      | $302.72     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $439.23             | $1.08      | $0.83                  | $5.29      | $737.41     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $20.30              | $1.08      | $0.83                  | $5.29      | $162.29     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.05               | $1.08      | $0.83                  | $5.29      | $142.03     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $4.39               | $1.08      | $0.83                  | $5.29      | $146.38     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $2,030.09           | $1.08      | $0.83                  | $5.29      | $2,196.39   |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $4.54               | $1.08      | $0.83                  | $5.29      | $170.85     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $439.23             | $1.08      | $0.83                  | $5.29      | $605.53     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $203,008.59         | $108.23    | $832.55                | $10.57     | $382,916.65 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $454.37             | $108.23    | $832.55                | $10.57     | $180,362.43 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $43,923.16          | $108.23    | $832.55                | $10.57     | $223,831.22 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $2,030.09           | $108.23    | $832.55                | $10.57     | $92,138.85  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $4.54               | $108.23    | $832.55                | $10.57     | $90,113.31  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $439.23             | $108.23    | $832.55                | $10.57     | $90,547.99  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $203,008.59         | $108.23    | $832.55                | $10.57     | $295,548.81 |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $454.37             | $108.23    | $832.55                | $10.57     | $92,994.59  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $43,923.16          | $108.23    | $832.55                | $10.57     | $136,463.38 |

##### Median

###### USD Cost Estimates Per Year

These estimates use the median Wasm instructions per function call including the function prelude.

The Wasm instruction counts used are:

-   Azle: 2_387_322
-   Motoko: 5_169
-   Rust: 44_074

###### Cycle Costs Table

Cycle costs taken from [here](https://internetcomputer.org/docs/current/developer-docs/deploy/computation-and-storage-costs/).

| Compute Percent Allocated Per Second | Update Message Execution | Ten Update Instructions Execution | Xnet Call | Xnet Byte Transmission | Ingress Message Reception | Ingress Byte Reception | GB Storage Per Second |
| ------------------------------------ | ------------------------ | --------------------------------- | --------- | ---------------------- | ------------------------- | ---------------------- | --------------------- |
| 100_000                              | 590_000                  | 4                                 | 260_000   | 1_000                  | 1_200_000                 | 2_000                  | 127_000               |

###### Application Scenarios

| Usage    | Query/Update Heaviness | Ingress Bytes Per Query Message | Ingress Bytes Per Update Message | GB Storage | Query Messages Per Second | Update Messages Per Second | Xnet Calls Per Second | Xnet Call Bytes |
| -------- | ---------------------- | ------------------------------- | -------------------------------- | ---------- | ------------------------- | -------------------------- | --------------------- | --------------- |
| Light    | Even                   | 100                             | 100                              | 0.5        | 0.01                      | 0.01                       | 0.001                 | 20              |
| Light    | Query Heavy            | 100                             | 100                              | 0.5        | 0.01                      | 0.0001                     | 0.001                 | 20              |
| Light    | Update Heavy           | 100                             | 100                              | 0.5        | 0.0001                    | 0.01                       | 0.001                 | 20              |
| Moderate | Even                   | 1_000                           | 1_000                            | 1          | 1                         | 1                          | 0.1                   | 200             |
| Moderate | Query Heavy            | 1_000                           | 1_000                            | 1          | 1                         | 0.01                       | 0.1                   | 200             |
| Moderate | Update Heavy           | 1_000                           | 1_000                            | 1          | 0.01                      | 1                          | 0.1                   | 200             |
| Heavy    | Even                   | 10_000                          | 10_000                           | 2          | 100                       | 100                        | 10                    | 2_000           |
| Heavy    | Query Heavy            | 10_000                          | 10_000                           | 2          | 100                       | 1                          | 10                    | 2_000           |
| Heavy    | Update Heavy           | 10_000                          | 10_000                           | 2          | 1                         | 100                        | 10                    | 2_000           |

###### Application USD Cost Estimates Per Year

| Usage    | Query/Update Heaviness | CDK    | Ingress Messages | Ingress Bytes Query Messages | Ingress Bytes Update Messages | Update Messages | Update Instructions | Xnet Calls | Xnet Byte Transmission | GB Storage | Total Cost  |
| -------- | ---------------------- | ------ | ---------------- | ---------------------------- | ----------------------------- | --------------- | ------------------- | ---------- | ---------------------- | ---------- | ----------- |
| Light    | Even                   | Azle   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.40               | $0.01      | $0.00                  | $2.64      | $4.46       |
| Light    | Even                   | Motoko | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Even                   | Rust   | $1.00            | $0.08                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $4.07       |
| Light    | Query Heavy            | Azle   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Motoko | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Query Heavy            | Rust   | $0.50            | $0.08                        | $0.00                         | $0.00           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.25       |
| Light    | Update Heavy           | Azle   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.40               | $0.01      | $0.00                  | $2.64      | $3.89       |
| Light    | Update Heavy           | Motoko | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.00               | $0.01      | $0.00                  | $2.64      | $3.49       |
| Light    | Update Heavy           | Rust   | $0.50            | $0.00                        | $0.08                         | $0.25           | $0.01               | $0.01      | $0.00                  | $2.64      | $3.50       |
| Moderate | Even                   | Azle   | $99.91           | $83.26                       | $83.26                        | $24.56          | $39.75              | $1.08      | $0.83                  | $5.29      | $337.93     |
| Moderate | Even                   | Motoko | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.09               | $1.08      | $0.83                  | $5.29      | $298.26     |
| Moderate | Even                   | Rust   | $99.91           | $83.26                       | $83.26                        | $24.56          | $0.73               | $1.08      | $0.83                  | $5.29      | $298.91     |
| Moderate | Query Heavy            | Azle   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.40               | $1.08      | $0.83                  | $5.29      | $142.38     |
| Moderate | Query Heavy            | Motoko | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.00               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Query Heavy            | Rust   | $50.45           | $83.26                       | $0.83                         | $0.25           | $0.01               | $1.08      | $0.83                  | $5.29      | $141.99     |
| Moderate | Update Heavy           | Azle   | $50.45           | $0.83                        | $83.26                        | $24.56          | $39.75              | $1.08      | $0.83                  | $5.29      | $206.05     |
| Moderate | Update Heavy           | Motoko | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.09               | $1.08      | $0.83                  | $5.29      | $166.39     |
| Moderate | Update Heavy           | Rust   | $50.45           | $0.83                        | $83.26                        | $24.56          | $0.73               | $1.08      | $0.83                  | $5.29      | $167.04     |
| Heavy    | Even                   | Azle   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $3,975.13           | $108.23    | $832.55                | $10.57     | $183,883.20 |
| Heavy    | Even                   | Motoko | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $8.61               | $108.23    | $832.55                | $10.57     | $179,916.67 |
| Heavy    | Even                   | Rust   | $9,990.60        | $83,255.04                   | $83,255.04                    | $2,456.02       | $73.39              | $108.23    | $832.55                | $10.57     | $179,981.45 |
| Heavy    | Query Heavy            | Azle   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $39.75              | $108.23    | $832.55                | $10.57     | $90,148.51  |
| Heavy    | Query Heavy            | Motoko | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.09               | $108.23    | $832.55                | $10.57     | $90,108.85  |
| Heavy    | Query Heavy            | Rust   | $5,045.26        | $83,255.04                   | $832.55                       | $24.56          | $0.73               | $108.23    | $832.55                | $10.57     | $90,109.50  |
| Heavy    | Update Heavy           | Azle   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $3,975.13           | $108.23    | $832.55                | $10.57     | $96,515.36  |
| Heavy    | Update Heavy           | Motoko | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $8.61               | $108.23    | $832.55                | $10.57     | $92,548.83  |
| Heavy    | Update Heavy           | Rust   | $5,045.26        | $832.55                      | $83,255.04                    | $2,456.02       | $73.39              | $108.23    | $832.55                | $10.57     | $92,613.61  |

### Roadmap

-   [x] July 2022
    -   [x] Extensive automated benchmarking
-   [ ] August 2022
    -   [ ] Compiler error DX revamp
    -   [ ] Rust rewrite
-   [ ] September 2022
    -   [ ] Extensive automated property testing
    -   [ ] Multiple independent security reviews/audits

### Gotchas and Caveats

-   Because Azle is built on Rust, to ensure the best compatibility use underscores to separate words in directory, file, and canister names
-   You must use type names directly when importing them (TODO do an example)
-   Varied missing TypeScript syntax or JavaScript features
-   Really bad compiler errors (you will probably not enjoy them)
-   Limited asynchronous TypeScript/JavaScript (generators only for now, no promises or async/await)
-   Imported npm packages may use unsupported syntax or APIs
-   Avoid inline types and use type aliases instead
-   `import *` syntax is not supported for any type that will undergo Candid serialization or deserialization
-   Inefficient Wasm instruction usage relative to Rust and Motoko, especially with arrays
-   Unknown security vulnerabilities
-   [Many small inconveniences](https://github.com/demergent-labs/azle/issues)

### Decentralization

Please note that the following plan is very subject to change, especially in response to compliance with government regulations. Please carefully read the [Azle License Extension](/LICENSE_EXTENSION.md) to understand Azle's copyright and the AZLE token in more detail.

Azle's tentative path towards decentralization is focused on traditional open source governance paired with a new token concept known as Open Source tokens (aka OS tokens or OSTs). The goal for OS tokens is to legally control the copyright and to fully control the repository for open source projects. In other words, OS tokens are governance tokens for open source projects.

Azle's OS token is called AZLE. Currently it only controls Azle's copyright and not the Azle repository. Demergent Labs controls [its own Azle repository](https://github.com/demergent-labs/azle). Once a decentralized git repository is implemented on the Internet Computer, the plan is to move [Demergent Labs' Azle repository](https://github.com/demergent-labs/azle) there and give full control of that repository to the AZLE token holders.

Demergent Labs currently owns the majority of AZLE tokens, and thus has ultimate control over Azle's copyright and AZLE token allocations. Demergent Labs will use its own discretion to distribute AZLE tokens over time to contributors and other parties, eventually owning much less than 50% of the tokens.

### Contributing

All contributors must agree to and sign the [Azle License Extension](/LICENSE_EXTENSION.md).

Please reach out before working on anything that is not in the [good first issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) or [help wanted issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22). Before beginning work on a contribution, please create or comment on the issue you want to work on and wait for clearance from Demergent Labs.

See [Demergent Labs' Coding Guidelines](/contributing/coding-guidelines.md) for what to expect during code reviews.

#### Local testing

If you want to ensure running the examples with a fresh clone works, run `npm link` from the Azle root directory and then `npm link azle` inside of the example's root directory. Not all of the examples are currently kept up-to-date with the correct Azle npm package.

### License

Azle's copyright is governed by the [LICENSE](/LICENSE) and [LICENSE_EXTENSION](/LICENSE_EXTENSION.md).
