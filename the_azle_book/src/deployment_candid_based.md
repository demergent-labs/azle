# Deployment

-   [Starting the local replica](#starting-the-local-replica)
-   [Deploying to the local replica](#deploying-to-the-local-replica)
-   [Interacting with your canister](#interacting-with-your-canister)
-   [Deploying to mainnet](#deploying-to-mainnet)
-   [Common deployment issues](#common-deployment-issues)

There are two main Internet Computer (IC) environments that you will generally interact with: the local replica and mainnet.

When developing on your local machine, our recommended flow is to start up a local replica in your project's root directoy and then deploy to it for local testing.

## Starting the local replica

Open a terminal and navigate to your project's root directory:

```bash
dfx start
```

Alternatively you can start the local replica as a background process:

```bash
dfx start --background
```

If you want to stop a local replica running in the background:

```bash
dfx stop
```

If you ever see this error after `dfx stop`:

```bash
Error: Failed to kill all processes.  Remaining: 627221 626923 627260
```

Then try this:

```bash
sudo kill -9 627221
sudo kill -9 626923
sudo kill -9 627260
```

If your replica starts behaving strangely, we recommend starting the replica clean, which will clean the `dfx` state of your project:

```bash
dfx start --clean
```

## Deploying to the local replica

To deploy all canisters defined in your `dfx.json`:

```bash
dfx deploy
```

To deploy an individual canister:

```bash
dfx deploy canister_name
```

## Interacting with your canister

As a developer you can generally interact with your canister in three ways:

-   [dfx command line](#dfx-command-line)
-   [dfx web UI](#dfx-web-ui)
-   [@dfinity/agent](#dfinityagent)

### dfx command line

You can see a more complete reference [here](https://internetcomputer.org/docs/current/references/cli-reference/).

The commands you are likely to use most frequently are:

```bash
# assume a canister named my_canister

# builds and deploys all canisters specified in dfx.json
dfx deploy

# builds all canisters specified in dfx.json
dfx build

# builds and deploys my_canister
dfx deploy my_canister

# builds my_canister
dfx build my_canister

# removes the Wasm binary and state of my_canister
dfx uninstall-code my_canister

# calls the methodName method on my_canister with a string argument
dfx canister call my_canister methodName '("This is a Candid string argument")'
```

### dfx web UI

After deploying your canister, you should see output similar to the following in your terminal:

```bash
Deployed canisters.
URLs:
  Backend canister via Candid interface:
    my_canister: http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai
```

Open up [http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai](http://127.0.0.1:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai&id=rrkah-fqaaa-aaaaa-aaaaq-cai) to access the web UI.

### @dfinity/agent

[@dfinity/agent](https://www.npmjs.com/package/@dfinity/agent) is the TypeScript/JavaScript client library for interacting with canisters on the IC. If you are building a client web application, this is probably what you'll want to use.

There are other agents for other languages as well:

-   [Java](https://github.com/ic4j/ic4j-agent)
-   [Python](https://github.com/rocklabs-io/ic-py)
-   [Rust](https://crates.io/crates/ic-agent)

## Deploying to mainnet

Assuming you are [setup with cycles](https://internetcomputer.org/docs/current/developer-docs/setup/cycles/), then you are ready to deploy to mainnet.

To deploy all canisters defined in your dfx.json:

```bash
dfx deploy --network ic
```

To deploy an individual canister:

```bash
dfx deploy --network ic canister_name
```

## Common deployment issues

If you run into an error during deployment, try the following:

1. Ensure that you have followed the instructions correctly in [the installation chapter](./installation.md), especially noting [the build dependencies](./installation.md#build-dependencies)
2. Start the whole deployment process from scratch by running the following commands: `dfx stop` or simply terminate `dfx` in your terminal, `dfx start --clean`, `npx azle clean`, `dfx deploy`
3. Look for more error output by adding the `--verbose` flag to the `build` command in your `dfx.json` file like so: `"build": "npx azle build hello_world --verbose`
4. Look for errors in each of the files in `~/.config/azle/rust/[rust_version]/logs`
5. Reach out in [the Discord channel](https://discord.gg/5Hb6rM2QUM)
