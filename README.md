# Azle (Alpha)

TypeScript/JavaScript CDK for the Internet Computer.

## Installation

You should have the following installed on your system:

* Node.js
* npm
* Rust
* wasm32-unknown-unknown Rust compilation target
* dfx 0.8.4

### Node.js

Run the following commands to install Node.js and npm. [nvm](https://github.com/nvm-sh/nvm) is highly recommended and its use is shown below:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# restart your terminal

nvm install 14
```

### Rust

Run the following command to install Rust and the wasm32-unknown-unknown target:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

rustup target add wasm32-unknown-unknown
```

### dfx

Run the following command to install dfx 0.8.4:

```bash
# Azle has been tested against version 0.8.4, so it is safest to install that specific version for now
DFX_VERSION=0.8.4 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

### Azle

In many ways developing with Azle is similar to any other TypeScript/JavaScript project. Imagine you have a project called `backend`:

1. Create a directory for your project
2. Create a `package.json` file
3. Install Azle
4. Create a `dfx.json` file
5. Create a directory and entry TypeScript file for your canister
6. Fill out your `dfx.json` file

Here are the commands you might run from a terminal to setup your project:

```bash
mkdir backend
cd backend
npm init -y
npm install azle
touch dfx.json
mkdir src
cd src
touch backend.ts
```

Your `dfx.json` should look like this:

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

## Local deployment

Start up an IC replica and deploy:

```bash
# Open a terminal and run the following command to start a local IC replica
dfx start

# Alternatively to the above command, you can run the replica in the background
dfx start --background

# If you are running the replica in the background, you can run this command within the same terminal as the dfx start --background command
# If you are not running the replica in the background, then open another terminal and run this command from the root directory of your project
dfx deploy
```

You can then interact with your canister like any other canister written in Motoko or Rust. To get started with calling your canister using `dfx`, see [here](https://smartcontracts.org/docs/developers-guide/cli-reference/dfx-canister.html#_dfx_canister_call).

## Writing canisters in TypeScript/JavaScript

See the [examples in this respository](/examples).

If you want to ensure running the examples with a fresh clone works, run `npm link` from the Azle root directory and then `npm link azle` inside of the example's root directory. Not all of the examples are currently kept up-to-date with the correct Azle npm package.

## Roadmap

- [ ] Beta
  - [x] TypeScript -> Candid compiler
  - [ ] Synchronous IC APIs
    - [x] caller
    - [ ] canisterBalance
    - [x] id
    - [x] print
    - [ ] time
    - [x] trap
  - [ ] All primitive data types
    - [ ] int
    - [ ] int64
    - [ ] int32
    - [ ] int16
    - [ ] int8
    - [ ] nat
    - [ ] nat64
    - [ ] nat32
    - [ ] nat16
    - [ ] nat8
    - [x] float64
    - [x] float32
  - [x] Many examples
  - [ ] Excellent documentation
  - [ ] Video series

- [ ] 1.0
    - [ ] Asynchronous IC APIs
    - [ ] Feature parity with Rust and Motoko CDKs
    - [ ] Live robust examples
    - [ ] Robust automated tests
    - [ ] Comprehensive benchmarks
    - [ ] Security audits


## Limitations

* Only `float64` and `float32` types are supported
* No inline or anonymous types (use type aliases for most types)
* No asynchronous IC APIs (such as cross-canister calls)
* No asynchronous TypeScript/JavaScript (async/await, promises, etc)
* Third-party npm packages that you import may use unsupported syntax or APIs
* Unknown security vulnerabilities
* Unknown cycle efficiency relative to canisters written in Rust or Motoko
* And much much [more](https://github.com/demergent-labs/azle/issues)

## Contributing

All contributors must agree to and sign the [Azle License Extension](/LICENSE_EXTENSION.md).

Please consider working on the [good first issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) and [help wanted issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) before suggesting other work to be done.

Before beginning work on a contribution, please create or comment on the issue you want to work on and wait for clearance from Demergent Labs.

See [Demergent Labs' Coding Guidelines](/contributing/coding-guidelines.md) for what to expect during code reviews.

## License

Azle's copyright is governed by the [LICENSE](/LICENSE) and [LICENSE_EXTENSION](/LICENSE_EXTENSION.md).

## Decentralization

Please note that the following plan is very subject to change, especially in response to compliance with government regulations. Please carefully read the [Azle License Extension](/LICENSE_EXTENSION.md) to understand Azle's copyright and the AZLE token in more detail.

Azle's tentative path towards decentralization is currently focused on traditional open source governance paired with a new token concept known as Open Source tokens (aka OS tokens or OSTs). The goal for OS tokens is to legally control the copyright and to fully control the repository for open source projects. In other words, OS tokens are governance tokens for open source projects.

Azle's OS token is called AZLE. Currently it only controls Azle's copyright and not the Azle repository. Demergent Labs controls [its own Azle repository](https://github.com/demergent-labs/azle). Once a decentralized git repository is implemented on the Internet Computer, the plan is to move [Demergent Labs' Azle repository](https://github.com/demergent-labs/azle) there and give full control of that repository to the AZLE token holders.

Demergent Labs currently owns the majority of AZLE tokens, and thus has ultimate control over Azle's copyright and AZLE token allocations. Demergent Labs will use its own discretion to distribute AZLE tokens over time to contributors and other parties, eventually owning much less than 50% of the tokens.