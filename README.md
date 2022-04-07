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
* Candid (data types)
* Query methods
* Update methods
* IC API
* Cross-canister calls
* Init
* PreUpgrade
* PostUpgrade
* Stable storage
* Heartbeat
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

#### Node.js

Run the following commands to install Node.js and npm. [nvm](https://github.com/nvm-sh/nvm) is highly recommended and its use is shown below:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# restart your terminal

nvm install 14
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

### Deployment

#### Local deployment

Start up an IC replica and deploy:

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

Please consider working on the [good first issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) and [help wanted issues](https://github.com/demergent-labs/azle/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) before suggesting other work to be done.

Before beginning work on a contribution, please create or comment on the issue you want to work on and wait for clearance from Demergent Labs.

See [Demergent Labs' Coding Guidelines](/contributing/coding-guidelines.md) for what to expect during code reviews.

#### Local testing

If you want to ensure running the examples with a fresh clone works, run `npm link` from the Azle root directory and then `npm link azle` inside of the example's root directory. Not all of the examples are currently kept up-to-date with the correct Azle npm package.

### License

Azle's copyright is governed by the [LICENSE](/LICENSE) and [LICENSE_EXTENSION](/LICENSE_EXTENSION.md).