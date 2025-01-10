# Candid RPC

This section documents the Candid RPC methodology for developing Azle applications. This methodology embraces ICP's Candid language, exposing canister methods directly to Candid-speaking clients, and using Candid for serialization and deserialization purposes.

Candid RPC is heading towards 1.0 and production-readiness in 2025.

- [Get Started](#get-started)
- [Examples](#examples)
- [Canister Class](#canister-class)
- [@dfinity/candid IDL](#dfinitycandid-idl)
- [Decorators](#decorators)
    - [@query](#query)
    - [@update](#update)
    - [@init](#init)
    - [@postUpgrade](#postupgrade)
    - [@preUpgrade](#preupgrade)
    - [@inspectMessage](#inspectmessage)
    - [@heartbeat](#heartbeat)
- [IC API](#ic-api)

## Get Started

Azle helps you to build secure decentralized/replicated servers in TypeScript or JavaScript on [ICP](https://internetcomputer.org/). The current replication factor is [13-40 times](https://dashboard.internetcomputer.org/subnets).

Please remember that Azle stable mode is continuously subjected to [intense scrutiny and testing](https://github.com/demergent-labs/azle/actions), however it does not yet have multiple independent security reviews/audits.

Azle runs in stable mode by default.

This mode is intended for production use after Azle's 1.0 release. Its focus is on API and runtime stability, security, performance, TypeScript and JavaScript language support, the ICP APIs, and Candid remote procedure calls (RPC). There is minimal support for the Node.js standard library, npm ecosystem, and HTTP server functionality.

### Installation

> Windows is only supported through a Linux virtual environment of some kind, such as [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

You will need [Node.js 22](#nodejs-22) and [dfx](#dfx) to develop ICP applications with Azle:

#### Node.js 22

It's recommended to use nvm to install Node.js 22:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart your terminal and then run:

```bash
nvm install 22
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
node --version
```

#### dfx

Install the dfx command line tools for managing ICP applications:

```bash
DFX_VERSION=0.24.3 sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
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

Some of the best documentation for creating Candid RPC canisters is currently in [the examples directory](https://github.com/demergent-labs/azle/tree/main/examples/stable/test/end_to_end/candid_rpc).

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

You must use the [@query](#query), [@update](#update), [@init](#init), [@postUpgrade](#postupgrade), [@preUpgrade](#preupgrade), [@inspectMessage](#inspectmessage), and [@heartbeat](#heartbeat) decorators to expose your canister's methods. Adding TypeScript types is optional.

## @dfinity/candid IDL

For each of your canister's methods, deserialization of incoming arguments and serialization of return values is handled with a combination of the [@query](#query), [@update](#update), [@init](#init), and [@postUpgrade](#postupgrade) decorators and the [IDL](https://agent-js.icp.xyz/candid/modules/IDL.html) object from the [@dfinity/candid](https://agent-js.icp.xyz/candid/index.html) library.

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

Some of the best documentation for using the IC API is currently in [the examples directory](https://github.com/demergent-labs/azle/tree/main/examples/stable), especially the [ic_api property tests](https://github.com/demergent-labs/azle/tree/main/examples/stable/test/property/ic_api).

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
