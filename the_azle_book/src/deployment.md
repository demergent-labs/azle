# Deployment

-   [Starting the local replica](#starting-the-local-replica)
-   [Deploying to the local replica](#deploying-to-the-local-replica)
-   [Interacting with your canister](#interacting-with-your-canister)
-   [Deploying to mainnet](#deploying-to-mainnet)
-   [Common deployment issues](#common-deployment-issues)

There are two main [ICP](https://internetcomputer.org/) environments that you will generally interact with: [the local replica](#deploying-to-the-local-replica) and [mainnet](#deploying-to-mainnet).

We recommend using the `dfx` command line tools to deploy to these environments. Please note that not all `dfx` commands are shown here. See [the dfx CLI reference](https://internetcomputer.org/docs/current/references/cli-reference/dfx-parent) for more information.

## Starting the local replica

We recommend running your local replica in its own terminal and on a port of your choosing:

```bash
dfx start --host 127.0.0.1:8000
```

Alternatively you can start the local replica as a background process:

```bash
dfx start --background --host 127.0.0.1:8000
```

If you want to stop a local replica running in the background:

```bash
dfx stop
```

If you ever see this kind of error after `dfx stop`:

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
dfx start --clean --host 127.0.0.1:8000
```

## Deploying to the local replica

To deploy all canisters defined in your `dfx.json`:

```bash
dfx deploy
```

If you are building an HTTP-based canister and would like your canister to autoreload on file changes (DO NOT deploy to mainnet with autoreload enabled):

```bash
AZLE_AUTORELOAD=true dfx deploy
```

To deploy an individual canister:

```bash
dfx deploy [canisterName]
```

## Interacting with your canister

You will generally interact with your canister through an HTTP client such as `curl`, `fetch`, or a web browser. The URL of your canister locally will look like this: `http://[canisterId].localhost:[replicaPort]`. Azle will print your canister's URL in the terminal after a successful deploy.

```bash
# You can obtain the canisterId like this
dfx canister id [canisterName]

# You can obtain the replicaPort like this
dfx info webserver-port

# An example of performing a GET request to a canister
curl http://a3shf-5eaaa-aaaaa-qaafa-cai.localhost:8000

# An example of performing a POST request to a canister
curl -X POST -H "Content-Type: application/json" -d "{ \"hello\": \"world\" }" http://a3shf-5eaaa-aaaaa-qaafa-cai.localhost:8000
```

## Deploying to mainnet

Assuming you are [setup with a cycles wallet](https://internetcomputer.org/docs/current/developer-docs/getting-started/cycles/cycles-wallet), then you are ready to deploy to mainnet.

To deploy all canisters defined in your dfx.json:

```bash
dfx deploy --network ic
```

To deploy an individual canister:

```bash
dfx deploy --network ic [canisterName]
```

The URL of your canister on mainnet will look like this: `https://[canisterId].raw.icp0.io`.

## Common deployment issues

If you run into an error during deployment, try the following:

1. Ensure that you have followed the installation instructions exactly as specified in [the Get Started chapter](./get_started.md#installation)
2. Start the whole deployment process from scratch and look for more error output by doing the following:
    1. In your replica terminal:
        1. Terminate the replica in your terminal or run `dfx stop` if your replica is running in the background
        2. `dfx start --clean --host 127.0.0.1:8000`
    2. In your project terminal at the root directory of your project:
        1. `rm -rf node_modules`
        2. `npm install`
        3. `npx azle clean`
        4. `AZLE_VERBOSE=true dfx deploy`
3. If the build process hangs on `Waiting for VM ...`, see [this issue for possible fixes](https://github.com/containers/podman/issues/20776)
4. If the problem is still not resolved, reach out with the error output in [the Discord channel](https://discord.gg/5Hb6rM2QUM)
