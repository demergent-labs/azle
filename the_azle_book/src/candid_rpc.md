# Candid RPC

This section documents the Candid RPC methodology for developing Azle applications. This methodology embraces ICP's Candid language, exposing canister methods directly to Candid-speaking clients, and using Candid for serialization and deserialization purposes.

Candid RPC is heading towards 1.0 and production-readiness in 2024.

-   [Get Started](#get-started)
-   [Examples](#examples)
-   [Canister Class](#canister-class)
-   [@dfinity/candid IDL](#dfinitycandid-idl)
-   [Decorators](#decorators)
    -   [@query](#query)
    -   [@update](#update)
    -   [@init](#init)
    -   [@postUpgrade](#postupgrade)
    -   [@preUpgrade](#preupgrade)
    -   [@inspectMessage](#inspectmessage)
    -   [@heartbeat](#heartbeat)
-   [IC API](#ic-api)

## Get Started

Azle helps you to build secure decentralized/replicated servers in TypeScript or JavaScript on [ICP](https://internetcomputer.org/). The current replication factor is [13-40 times](https://dashboard.internetcomputer.org/subnets).

Please remember that Azle is in beta and thus it may have unknown security vulnerabilities due to the following:

-   Azle is built with various software packages that have not yet reached maturity
-   Azle does not yet have multiple independent security reviews/audits
-   Azle does not yet have many live, successful, continuously operating applications deployed to ICP

### Installation

> Windows is only supported through a Linux virtual environment of some kind, such as [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

You will need [Node.js 20](#nodejs-20) and [dfx](#dfx) to develop ICP applications with Azle:

#### Node.js 20

It's recommended to use nvm to install Node.js 20:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart your terminal and then run:

```bash
nvm install 20
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
node --version
```

#### dfx

Install the dfx command line tools for managing ICP applications:

```bash
DFX_VERSION=0.22.0 sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
dfx --version
```

### Deployment

To create and deploy a simple sample application called `hello_world`:

```bash
# create a new default project called hello_world
npx azle new hello_world
cd hello_world
```

```bash
# install all npm dependencies including azle
npm install
```

```bash
# start up a local ICP replica
dfx start --clean
```

In a separate terminal in the `hello_world` directory:

```bash
# deploy your canister
dfx deploy
```

## Examples

Some of the best documentation for creating Candid RPC canisters is currently in [the tests directory](https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/class_syntax).

## Canister Class

Your canister's functionality must be encapsulated in a class exported using the default export:

```typescript
import { IDL, query } from 'azle';

export default class {
    @query([], IDL.Text)
    hello(): string {
        return 'world!';
    }
}
```

You must use the `@query`, `@update`, `@init`, `@postUpgrade`, `@preUpgrade`, `@inspectMessage`, and `@heartbeat` decorators to expose your canister's methods. Adding TypeScript types is optional.

## @dfinity/candid IDL

For each of your canister's methods, deserialization of incoming arguments and serialization of return values is handled with a combination of the `@query`, `@update`, `@init`, and `@postUpgrade` decorators and the [IDL](https://agent-js.icp.xyz/candid/modules/IDL.html) object from the [@dfinity/candid](https://agent-js.icp.xyz/candid/index.html) library.

`IDL` is re-exported by Azle, and has properties that correspond to [Candid's supported types](https://internetcomputer.org/docs/current/references/candid-ref). You must use `IDL` to instruct the method decorators on how to deserialize arguments and serialize the return value. Here's an example of accessing the Candid types from `IDL`:

```typescript
import { IDL } from 'azle';

IDL.Text;

IDL.Vec(IDL.Nat8); // Candid blob

IDL.Nat;
IDL.Nat64;
IDL.Nat32;
IDL.Nat16;
IDL.Nat8;

IDL.Int;
IDL.Int64;
IDL.Int32;
IDL.Int16;
IDL.Int8;

IDL.Float64;
IDL.Float32;

IDL.Bool;

IDL.Null;

IDL.Vec(IDL.Int);

IDL.Opt(IDL.Text);

IDL.Record({
    prop1: IDL.Text,
    prop2: IDL.Bool
});

IDL.Variant({
    Tag1: IDL.Null,
    Tag2: IDL.Nat
});

IDL.Func([], [], ['query']);

IDL.Service({
    myQueryMethod: IDL.Func([IDL.Text, IDL.Text], [IDL.Bool])
});

IDL.Principal;

IDL.Reserved;

IDL.Empty;
```

## Decorators

### @query

Exposes the decorated method as a read-only `canister_query` method.

The first parameter to this decorator accepts `IDL` Candid type objects that will deserialize incoming Candid arguments. The second parameter to this decorator accepts an `IDL` Candid type object that will serialize the outgoing return value to Candid.

### @update

Exposes the decorated method as a read-write `canister_update` method.

The first parameter to this decorator accepts `IDL` Candid type objects that will deserialize incoming Candid arguments. The second parameter to this decorator accepts an `IDL` Candid type object that will serialize the outgoing return value to Candid.

### @init

Exposes the decorated method as the `canister_init` method called only once during canister initialization.

The first parameter to this decorator accepts `IDL` Candid type objects that will deserialize incoming Candid arguments.

### @postUpgrade

Exposes the decorated method as the `canister_post_upgrade` method called during every canister upgrade.

The first parameter to this decorator accepts `IDL` Candid type objects that will deserialize incoming Candid arguments.

### @preUpgrade

Exposes the decorated method as the `canister_pre_upgrade` method called before every canister upgrade.

### @inspectMessage

Exposes the decorated method as the `canister_inspect_message` method called before every `update` call.

### @heartbeat

Exposes the decorated method as the `canister_heartbeat` method called on a regular interval (every second or so).

## IC API

The IC API is exposed as functions exported from `azle`. You can see the available functions in [the source code](https://github.com/demergent-labs/azle/tree/main/src/lib/stable/ic_apis).

Some of the best documentation for using the IC API is currently in [the tests directory](https://github.com/demergent-labs/azle/tree/main/tests/end_to_end/candid_rpc/class_syntax), especially the [ic_api test example](https://github.com/demergent-labs/azle/blob/main/tests/end_to_end/candid_rpc/class_syntax/ic_api/src/index.ts).

Here's an example of getting the caller's principal using the `caller` function:

```typescript
import { caller, IDL, update } from 'azle';

export default class {
    @update([], IDL.Bool)
    isUserAnonymous(): boolean {
        if (caller().toText() === '2vxsx-fae') {
            return true;
        } else {
            return false;
        }
    }
}
```
