![example workflow](https://github.com/demergent-labs/azle/actions/workflows/test.yml/badge.svg)

# Azle (Beta)

TypeScript CDK for the Internet Computer.

## Disclaimer

Azle is beta software. It has not been thoroughly tested by Demergent Labs or the community. There have been no extensive security reviews. There are very few live applications built with Azle.

The safest way to use Azle is to assume that your canister could get hacked, frozen, broken, or erased at any moment. Remember that you use Azle at your own risk and according to the terms of the MIT license found [here](/LICENSE).

## Discussion

Feel free to open issues or join us in the [DFINITY DEV TypeScript Discord channel](https://discord.com/channels/748416164832608337/956466775380336680).

## Documentation

Most of Azle's documentation is currently found in this README. A more detailed [mdBook-style](https://rust-lang.github.io/mdBook/) book similar to [Sudograph's](https://i67uk-hiaaa-aaaae-qaaka-cai.raw.ic0.app/) will later be hosted on the Internet Computer.

* [Examples](/examples)
* [Installation](#installation)
* [Deployment](#deployment)
* [Canisters](#canisters)
* [Candid data types](#candid-data-types)
* [Query methods](#query-methods)
* [Update methods](#update-methods)
* [IC API](#ic-api)
* [Cross-canister calls](#cross-canister-calls)
* [Init method](#init-method)
* [PreUpgrade method](#preupgrade-method)
* [PostUpgrade method](#postupgrade-method)
* [Stable storage](#stable-storage)
* [Heartbeat method](#heartbeat-method)
* [Roadmap](#roadmap)
* [Gotchas and caveats](#gotchas-and-caveats)
* [Limitations](#limitations)
* [Decentralization](#decentralization)
* [Contributing](#contributing)
* [License](#license)

### Installation

You should have the following installed on your system:

* [Node.js](#nodejs)
* [Rust](#rust)
* [dfx](#dfx)

After installing the prerequisites, you can [make a project and install Azle](#azle).

#### Node.js

Run the following commands to install Node.js and npm. [nvm](https://github.com/nvm-sh/nvm) is highly recommended and its use is shown below:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# restart your terminal

nvm install 18
```

#### Rust

Run the following command to install Rust:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### dfx

Run the following command to install dfx 0.9.3:

```bash
# Azle has been tested against version 0.9.3, so it is safest to install that specific version for now
DFX_VERSION=0.9.3 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

#### Common Installation Issues

* Ubuntu
  * error: linker cc not found (sudo apt install build-essential)
  * is cmake not installed? (sudo apt install cmake)

#### Azle

Follow these steps to create an Azle project. The steps below assume a project called `backend`:

1. Create a directory for your project (`mkdir backend && cd backend`)
2. Create a `package.json` file (`npm init -y`)
3. Install Azle (`npm install azle`)
4. Create a `dfx.json` file (`touch dfx.json`)
5. Create a directory and entry TypeScript file for your canister (`mkdir src && cd src && touch backend.ts`)

Your `dfx.json` file should look like this:

```json
{
    "canisters": {
        "backend": {
            "type": "custom",
            "build": "npx azle backend",
            "root": "src",
            "ts": "src/backend.ts",
            "candid": "src/backend.did",
            "wasm": "target/wasm32-unknown-unknown/release/backend.wasm"
        }
    }
}
```

Your `backend.ts` file should look like this:

```typescript
import { Query } from 'azle';

export function helloWorld(): Query<string> {
    return 'Hello world!';
}
```


### Deployment

#### Local deployment

Start up an IC replica and deploy. The first deploy will likely take multiple minutes as it downloads and compiles many Rust dependencies. Subsequent deploys should be much quicker:

```bash
# Open a terminal and navigate to your project's root directory, then run the following command to start a local IC replica
dfx start

# Alternatively to the above command, you can run the replica in the background
dfx start --background

# If you are running the replica in the background, you can run this command within the same terminal as the dfx start --background command
# If you are not running the replica in the background, then open another terminal and run this command from the root directory of your project
dfx deploy
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

#### Live deployment

Deploying to the live Internet Computer generally only requires adding the `--network ic` option to the deploy command: `dfx deploy --network ic`. This assumes you already have converted ICP into cycles appropriately. See [here](https://smartcontracts.org/docs/quickstart/4-quickstart.html) for more information on getting ready to deploy to production.

### Canisters

More information:
* https://smartcontracts.org/docs/developers-guide/concepts/canisters-code.html
* https://wiki.internetcomputer.org/wiki/Canisters_(dapps/smart_contracts)
* https://smartcontracts.org/docs/developers-guide/design-apps.html#_single_or_multiple_canister_architecture

In many ways developing canisters with Azle is similar to any other TypeScript/JavaScript project. To see what canister source code looks like, see the [examples](/examples).

A canister is the fundamental application unit on the Internet Computer. It contains the code and state of your application. When deployed to the Internet Computer, your canister becomes an everlasting process. Its global variables automatically persist.

Users of your canister interact with it through RPC calls performed using HTTP requests. These calls will hit your canister's `Query` and `Update` methods. These methods, with their parameter and return types, are the interface to your canister.

Azle allows you to write canisters while embracing much of what that the TypeScript and JavaScript ecosystems have to offer.

### Candid data types

Examples:
* [primitive_types](/examples/primitive_types)
* [complex_types](/examples/complex_types)

[Candid](https://smartcontracts.org/docs/candid-guide/candid-intro.html) is an interface description language created by DFINITY. It defines interfaces between services (in our context canisters), allowing canisters and clients written in various languages to easily interact with each other.

Much of what Azle is doing under-the-hood is translating TypeScript code into various formats that Candid understands (for example Azle will generate a Candid `.did` file from your TypeScript code). To do this your TypeScript code must use various Azle-provided types.

Please note that these types are only needed in the following locations in your code:

* `Query`, `Update`, `Init`, and `PostUpgrade` method parameters and return types
* `Canister` method declaration parameters and return types
* `Stable` variable declaration types

You do not need to use these types, and you do not need to use TypeScript, anywhere else. You could write the rest of your application in JavaScript if that's what makes you happy.

Data types:

* [int](#int)
* [int64](#int64)
* [int32](#int32)
* [int16](#int16)
* [int8](#int8)
* [nat](#nat)
* [nat64](#nat64)
* [nat32](#nat32)
* [nat16](#nat16)
* [nat8](#nat8)
* [float64](#float64)
* [float32](#float32)
* [Principal](#principal)
* [string](#string)
* [boolean](#boolean)
* [Record](#record)
* [Variant](#variant)
* [Array](#array)
* [Opt](#opt)

##### int

The Azle type `int` corresponds to the [Candid type int](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-int) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int, Query, ic } from 'azle';

export function getInt(): Query<int> {
    return 170141183460469231731687303715884105727n;
}

export function printInt(int: int): Query<int> {
    ic.print(typeof int);
    return int;
}
```

Candid:

```typescript
service: {
    "getInt": () -> (int) query;
    "printInt": (int) -> (int) query;
}
```

##### int64

The Azle type `int64` corresponds to the [Candid type int64](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { int64, Query, ic } from 'azle';

export function getInt64(): Query<int64> {
    return 9223372036854775807n;
}

export function printInt64(int64: int64): Query<int64> {
    ic.print(typeof int64);
    return int64;
}
```

Candid:

```typescript
service: {
    "getInt64": () -> (int64) query;
    "printInt64": (int64) -> (int64) query;
}
```

##### int32

The Azle type `int32` corresponds to the [Candid type int32](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int32, Query, ic } from 'azle';

export function getInt32(): Query<int32> {
    return 2147483647;
}

export function printInt32(int32: int32): Query<int32> {
    ic.print(typeof int32);
    return int32;
}
```

Candid:

```typescript
service: {
    "getInt32": () -> (int32) query;
    "printInt32": (int32) -> (int32) query;
}
```

##### int16

The Azle type `int16` corresponds to the [Candid type int16](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int16, Query, ic } from 'azle';

export function getInt16(): Query<int16> {
    return 32767;
}

export function printInt16(int16: int16): Query<int16> {
    ic.print(typeof int16);
    return int16;
}
```

Candid:

```typescript
service: {
    "getInt16": () -> (int16) query;
    "printInt16": (int16) -> (int16) query;
}
```

##### int8

The Azle type `int8` corresponds to the [Candid type int8](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { int8, Query, ic } from 'azle';

export function getInt8(): Query<int8> {
    return 127;
}

export function printInt8(int8: int8): Query<int8> {
    ic.print(typeof int8);
    return int8;
}
```

Candid:

```typescript
service: {
    "getInt8": () -> (int8) query;
    "printInt8": (int8) -> (int8) query;
}
```

##### nat

The Azle type `nat` corresponds to the [Candid type nat](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-nat) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { nat, Query, ic } from 'azle';

export function getNat(): Query<nat> {
    return 340282366920938463463374607431768211455n;
}

export function printNat(nat: nat): Query<nat> {
    ic.print(typeof nat);
    return nat;
}
```

Candid:

```typescript
service: {
    "getNat": () -> (nat) query;
    "printNat": (nat) -> (nat) query;
}
```

##### nat64

The Azle type `nat64` corresponds to the [Candid type nat64](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) at runtime.

TypeScript:

```typescript
import { nat64, Query, ic } from 'azle';

export function getNat64(): Query<nat64> {
    return 18446744073709551615n;
}

export function printNat64(nat64: nat64): Query<nat64> {
    ic.print(typeof nat64);
    return nat64;
}
```

Candid:

```typescript
service: {
    "getNat64": () -> (nat64) query;
    "printNat64": (nat64) -> (nat64) query;
}
```

##### nat32

The Azle type `nat32` corresponds to the [Candid type nat32](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat32, Query, ic } from 'azle';

export function getNat32(): Query<nat32> {
    return 4294967295;
}

export function printNat32(nat32: nat32): Query<nat32> {
    ic.print(typeof nat32);
    return nat32;
}
```

Candid:

```typescript
service: {
    "getNat32": () -> (nat32) query;
    "printNat32": (nat32) -> (nat32) query;
}
```

##### nat16

The Azle type `nat16` corresponds to the [Candid type nat16](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat16, Query, ic } from 'azle';

export function getNat16(): Query<nat16> {
    return 65535;
}

export function printNat16(nat16: nat16): Query<nat16> {
    ic.print(typeof nat16);
    return nat16;
}
```

Candid:

```typescript
service: {
    "getNat16": () -> (nat16) query;
    "printNat16": (nat16) -> (nat16) query;
}
```

##### nat8

The Azle type `nat8` corresponds to the [Candid type nat8](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-intN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { nat8, Query, ic } from 'azle';

export function getNat8(): Query<nat8> {
    return 255;
}

export function printNat8(nat8: nat8): Query<nat8> {
    ic.print(typeof nat8);
    return nat8;
}
```

Candid:

```typescript
service: {
    "getNat8": () -> (nat8) query;
    "printNat8": (nat8) -> (nat8) query;
}
```

##### float64

The Azle type `float64` corresponds to the [Candid type float64](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-floatN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float64, Query, ic } from 'azle';

export function getFloat64(): Query<float64> {
    return Math.E;
}

export function printFloat64(float64: float64): Query<float64> {
    ic.print(typeof float64);
    return float64;
}
```

Candid:

```typescript
service: {
    "getFloat64": () -> (float64) query;
    "printFloat64": (float64) -> (float64) query;
}
```

##### float32

The Azle type `float32` corresponds to the [Candid type float32](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-floatN) and will become a [JavaScript Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) at runtime.

TypeScript:

```typescript
import { float32, Query, ic } from 'azle';

export function getFloat32(): Query<float32> {
    return Math.PI;
}

export function printFloat32(float32: float32): Query<float32> {
    ic.print(typeof float32);
    return float32;
}
```

Candid:

```typescript
service: {
    "getFloat32": () -> (float32) query;
    "printFloat32": (float32) -> (float32) query;
}
```

##### Principal

The Azle type `Principal` corresponds to the [Candid type principal](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-principal) and will become a [JavaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) at runtime.

TypeScript:

```typescript
import { Principal, Query, ic } from 'azle';

export function getPrincipal(): Query<Principal> {
    return 'rrkah-fqaaa-aaaaa-aaaaq-cai';
}

export function printPrincipal(principal: Principal): Query<Principal> {
    ic.print(typeof principal);
    return principal;
}
```

Candid:

```typescript
service: {
    "getPrincipal": () -> (principal) query;
    "printPrincipal": (principal) -> (principal) query;
}
```

##### string

The TypeScript type `string` corresponds to the [Candid type text](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-text) and will become a [JavaScript String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) at runtime.

TypeScript:

```typescript
import { Query, ic } from 'azle';

export function getString(): Query<string> {
    return 'Hello world!';
}

export function printString(string: string): Query<string> {
    ic.print(typeof string);
    return string;
}
```

Candid:

```typescript
service: {
    "getString": () -> (text) query;
    "printString": (text) -> (text) query;
}
```

##### boolean

The TypeScript type `boolean` corresponds to the [Candid type bool](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-bool) and will become a [JavaScript Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) at runtime.

TypeScript:

```typescript
import { Query, ic } from 'azle';

export function getBoolean(): Query<boolean> {
    return true;
}

export function printBoolean(boolean: boolean): Query<boolean> {
    ic.print(typeof boolean);
    return boolean;
}
```

Candid:

```typescript
service: {
    "getBoolean": () -> (bool) query;
    "printBoolean": (bool) -> (bool) query;
}
```

#### Record

TypeScript type aliases referring to object literals correspond to the [Candid record type](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-record) and will become [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

TypeScript:

```typescript
import { Variant } from 'azle';

type Post = {
    id: string;
    author: User;
    reactions: Reaction[];
    text: string;
    thread: Thread;
};

type Reaction = {
    id: string;
    author: User;
    post: Post;
    reactionType: ReactionType;
};

type ReactionType = Variant<{
    fire: null;
    thumbsUp: null;
    thumbsDown: null;
}>;

type Thread = {
    id: string;
    author: User;
    posts: Post[];
    title: string;
};

type User = {
    id: string;
    posts: Post[];
    reactions: Reaction[];
    threads: Thread[];
    username: string;
};
```

Candid:

```typescript
type Thread = record {
    "id": text;
    "author": User;
    "posts": vec Post;
    "title": text;
};

type User = record {
    "id": text;
    "posts": vec Post;
    "reactions": vec Reaction;
    "threads": vec Thread;
    "username": text;
};

type Reaction = record {
    "id": text;
    "author": User;
    "post": Post;
    "reactionType": ReactionType;
};

type Post = record {
    "id": text;
    "author": User;
    "reactions": vec Reaction;
    "text": text;
    "thread": Thread;
};

type ReactionType = variant {
    "fire": null;
    "thumbsUp": null;
    "thumbsDown": null
};
```

#### Variant

TypeScript type aliases referring to object literals wrapped in the `Variant` Azle type correspond to the [Candid variant type](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-variant) and will become [JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) at runtime.

TypeScript:

```typescript
import { Variant, nat32 } from 'azle';

type ReactionType = Variant<{
    fire: null;
    thumbsUp: null;
    thumbsDown: null;
    emotion: Emotion;
    firework: Firework;
}>;

type Emotion = Variant<{
    happy: null;
    sad: null;
}>

type Firework = {
    color: string;
    numStreaks: nat32;
};
```

Candid:

```typescript
type ReactionType = variant {
    "fire": null;
    "thumbsUp": null;
    "thumbsDown": null;
    "emotion": Emotion;
    "firework": Firework
};

type Emotion = variant {
    "happy": null;
    "sad": null
};

type Firework = record {
    "color": text;
    "numStreaks": nat32;
};
```

#### Array

TypeScript `[]` array syntax corresponds to the [Candid type vec](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-vec) and will become an array of the enclosed type at runtime. Only the `[]` array syntax is supported at this time (i.e. not `Array` or `ReadonlyArray` etc).

TypeScript:

```typescript
import { Query, int32 } from 'azle';

export function getNumbers(): Query<int32[]> {
    return [0, 1, 2, 3];
}
```

Candid:

```typescript
service: {
    "getNumbers": () -> (vec int32) query;
}
```

#### Opt

The Azle type `Opt` corresponds to the [Candid type opt](https://smartcontracts.org/docs/candid-guide/candid-types.html#type-opt) and will become the enclosed JavaScript type or null at runtime.

TypeScript:

```typescript
import { Opt, Query } from 'azle';

export function getOptSome(): Query<Opt<boolean>> {
    return true;
}

export function getOptNone(): Query<Opt<boolean>> {
    return null;
}
```

Candid:

```typescript
service: {
    "getOptSome": () -> (opt bool) query;
    "getOptNone": () -> (opt bool) query;
}
```

### Query methods

Examples:
* [query](/examples/query)
* [update](/examples/update)
* [simple_user_accounts](/examples/simple_user_accounts)

More information:
* https://smartcontracts.org/docs/developers-guide/concepts/canisters-code.html#query-update
* https://smartcontracts.org/docs/developers-guide/design-apps.html#_using_query_calls

Query methods expose public callable functions that are read-only. All state changes will be discarded after the function call completes.

Query calls do not go through consensus and thus return very quickly relative to update calls. This also means they are less secure than update calls unless [certified data](https://smartcontracts.org/docs/base-libraries/certifieddata) is used in conjunction with the query call.

To create a query method, simply wrap the return type of your function in the Azle `Query` type.

```typescript
import { Query } from 'azle';

export function query(): Query<string> {
    return 'This is a query function';
}
```

### Update methods

Examples:
* [update](/examples/update)
* [key_value_store](/examples/key_value_store)

More information:
* https://smartcontracts.org/docs/developers-guide/concepts/canisters-code.html#query-update

Update methods expose public callable functions that are writable. All state changes will be persisted after the function call completes.

Update calls go through consensus and thus return very slowly (a few seconds) relative to query calls. This also means they are more secure than query calls unless [certified data](https://smartcontracts.org/docs/base-libraries/certifieddata) is used in conjunction with the query call.

To create an update method, simply wrap the return type of your function in the azle `Update` type.

```typescript
import {
    Query,
    Update
} from 'azle';

let currentMessage: string = '';

export function query(): Query<string> {
    return currentMessage;
}

export function update(message: string): Update<void> {
    currentMessage = message;
}
```

### IC API

Examples:
* [ic_api](/examples/ic_api)

Azle exports the `ic` object which contains access to certain IC APIs.

```typescript
import {
    Query,
    nat64,
    ic,
    Principal
} from 'azle';

// returns the principal of the identity that called this function
export function caller(): Query<string> {
    return ic.caller();
}

// returns the amount of cycles available in the canister
export function canisterBalance(): Query<nat64> {
    return ic.canisterBalance();
}

// returns this canister's id
export function id(): Query<Principal> {
    return ic.id();
}

// prints a message through the local replica's output
export function print(message: string): Query<boolean> {
    ic.print(message);

    return true;
}

// returns the current timestamp
export function time(): Query<nat64> {
    return ic.time();
}

// traps with a message, stopping execution and discarding all state within the call
export function trap(message: string): Query<boolean> {
    ic.trap(message);

    return true;
}
```

### Cross-canister calls

Examples:
* [cross_canister_calls](/examples/cross_canister_calls)

DFINITY documentation:
* https://smartcontracts.org/docs/introduction/welcome.html

More documentation to come, see the examples and the DFINITY documentation for the time being.

### Init method

Examples:
* [init](/examples/init)
* [pre_and_post_upgrade](/examples/pre_and_post_upgrade)

DFINITY documentation:
* https://smartcontracts.org/docs/introduction/welcome.html

More documentation to come, see the examples and the DFINITY documentation for the time being.

### PreUpgrade method

Examples:
* [pre_and_post_upgrade](/examples/pre_and_post_upgrade)

DFINITY documentation:
* https://smartcontracts.org/docs/introduction/welcome.html

More documentation to come, see the examples and the DFINITY documentation for the time being.

### PostUpgrade method

Examples:
* [pre_and_post_upgrade](/examples/pre_and_post_upgrade)

DFINITY documentation:
* https://smartcontracts.org/docs/introduction/welcome.html

More documentation to come, see the examples and the DFINITY documentation for the time being.

### Stable storage

Examples:
* [stable_storage](/examples/stable_storage)

More information:
* https://smartcontracts.org/docs/developers-guide/design-apps.html#_data_storage_and_retrieval

More documentation to come, see the examples and the DFINITY documentation for the time being.

### Heartbeat method

Examples:
* [heartbeat](/examples/heartbeat)

DFINITY documentation:
* https://smartcontracts.org/docs/introduction/welcome.html

More documentation to come, see the examples and the DFINITY documentation for the time being.

### Roadmap

- [ ] 1.0
    - [ ] [Feature parity with Rust and Motoko CDKs](https://github.com/demergent-labs/azle/issues/134)
    - [ ] Core set of Azle-specific npm packages
    - [ ] Sudograph integration
    - [ ] Official dfx integration with `"type": "typescript"` or `"type": "azle"`
    - [ ] Live robust examples
    - [ ] Video series
    - [ ] Comprehensive benchmarks
    - [ ] Robust property-based tests
    - [ ] Optimized compilation
    - [ ] Security audits
- [ ] 2.0
  - [ ] Azle VS Code plugin
  - [ ] [Inter-Canister Query Calls](https://forum.dfinity.org/t/inter-canister-query-calls-community-consideration/6754)

### Limitations

* Varied missing TypeScript syntax or JavaScript features
* Really bad compiler errors (you will probably not enjoy them)
* Limited asynchronous TypeScript/JavaScript (generators only for now, no promises or async/await)
* Imported npm packages may use unsupported syntax or APIs
* Unknown security vulnerabilities
* Unknown cycle efficiency relative to canisters written in Rust or Motoko
* Working with nat8[]/blobs greater than a few thousand kb in size is impractical
* No support for inline tuple types, create a named type alias instead
* No 1-tuple support
* And much much [more](https://github.com/demergent-labs/azle/issues)

### Gotchas and caveats

* Because Azle is built on Rust, to ensure the best compatibility use underscores to separate words in directory, file, and canister names
* You must use type names directly when importing them (TODO do an example)

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