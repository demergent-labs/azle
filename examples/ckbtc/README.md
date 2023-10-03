Keep in mind that this is a simple demo example of ckBTC with Azle, and is probably not suitable for production use. Learn wisely.

This ckBTC example shows you how to setup ckBTC locally, with the `ckBTC ledger`, `internet identity`, `kyt`, `minter`, and `bitcoind`. It also has a canister wallet backend and frontend. The canister wallet shows how a canister can control a number of ckBTC subaccounts. The frontend functionality only shows how to mint ckBTC and transfer between other canister wallets.

# Installation

```bash
npm install
```

# Deployment

## bitcoind

```bash
# Do this in its own terminal
npm run bitcoin
```

## dfx

```bash
# Do this in its own terminal
npm run ic
```

## deploy canisters

```bash
npm run deploy
```

# Usage

Go to the `wallet_frontend` URL `http://ryjl3-tyaaa-aaaaa-aaaba-cai.localhost:8000`. Minting some initial BTC is shown below. You should mint to the Bitcoin deposit address shown in the web UI to start things off.

```bash
# Mine some BTC to that address
.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf generatetoaddress 1 <your-canister-btc-address>
```

Now click `Update Balance` in the web UI.

Play around, try transfering some ckBTC to an account in another independent browser tab.
