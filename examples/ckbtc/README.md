# Chain Key BTC

Keep in mind that this is a simple demo example of ckBTC with Azle, and is probably not suitable for production use. Learn wisely.

This ckBTC example shows you how to setup ckBTC locally, with the `ckBTC ledger`, `internet identity`, `kyt`, `minter`, and `bitcoind`. It also has a canister wallet backend and frontend. The canister wallet shows how a canister can control a number of ckBTC subaccounts. The frontend functionality only shows how to mint ckBTC and transfer between other canister wallets.

## Setup

Install all npm dependencies and download canister Wasm binaries:

```bash
npm install
```

Update the `canisters.wallet_backend.declarations.node_compatibility` property in dfx.json to `false`:

> **Note:**
> The tests require node_compatibility to be set to `true` but the frontend requires it to be set to `false`. Toggle it according to your use case.

## Deployment

Run each of the following commands, each in a separate terminal.

Bitcoin daemon:

```bash
npm run bitcoin
```

IC replica:

```bash
npm run ic
```

Deploy canisters:

```bash
npm run deploy
```

## Usage

1. Create an Internet Identity

    Go to the `wallet_frontend` URL `http://ryjl3-tyaaa-aaaaa-aaaba-cai.localhost:8000`.

    ```bash
    npm run frontend
    ```

    The first time you visit the frontend it should re-direct you to the local internet-identity to authenticate. If it does not try refreshing the page.

    > **Note:**
    > This Internet Identity service is running locally (see the local url?) and is for testing. **DO NOT USE YOUR REAL INTERNET IDENTITY!!!**

    ![image](https://github.com/demergent-labs/azle/assets/5455419/6d929bb3-e87e-45c9-88f6-c79b3e8236a4)

    Select "Create New" and continue through the provided instructions to create a new **local test** internet identity.

    ![image](https://github.com/demergent-labs/azle/assets/5455419/564bc367-e6b3-4ccd-81a9-917089da67da)

    Make note of the identity number it generated and then click "I saved it, continue".

2. Mint some BTC

    Back on the frontend site copy the bitcoin deposit address as shown below:

    ![image](https://github.com/demergent-labs/azle/assets/5455419/3d6ac20e-e1eb-4d90-a65a-460f8242d8fd)

    Mint some BTC to your wallet by running the following command, replacing `<your-canister-btc-address>` with the address from the frontend:

    ```bash
    npm run mint --address=<your-canister-btc-address>
    ```

3. Now click `Update Balance` in the web UI to retrieve the updated balance.

4. Play around. Try transferring some ckBTC to an account in another independent browser tab.
