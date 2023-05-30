# Installation

This is an implementation of the [basic_bitcoin example](https://github.com/dfinity/examples/tree/master/rust/basic_bitcoin) written in TypeScript with Azle. It's focused on showing you basic ICP/Bitcoin concepts in a local development environment.

## bitcoind

```bash
mkdir .bitcoin
mkdir .bitcoin/data

curl https://bitcoincore.org/bin/bitcoin-core-23.0/bitcoin-23.0-x86_64-linux-gnu.tar.gz -o bitcoin.tar.gz

tar xzf bitcoin.tar.gz --overwrite --strip-components=1 --directory=.bitcoin/ bitcoin-23.0/bin/

rm -rf bitcoin.tar.gz
```

# Deployment

## bitcoind

```bash
# Do this in its own terminal
.bitcoin/bin/bitcoind -conf=$(pwd)/.bitcoin.conf -datadir=$(pwd)/.bitcoin/data --port=18444
```

## dfx

```bash
# Do this in its own terminal
dfx start --clean --host 127.0.0.1:8000 --enable-bitcoin
```

## basic_bitcion

```bash
dfx deploy --argument='(variant { Regtest })'
```

# Usage

After setting up your local Bitcoin node and deploying the canister locally, you can interact with your canister from the command-line or from the browser. To interact with your canister from the browser, use the URL displayed in the terminal after deploy, which will look something like this: `http://127.0.0.1:8000/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai`

This example provides 5 functions to call: `getBalance`, `getUtxos`, `getCurrentFeePercentiles`, `getP2PKHAddress`, and `send`.

To create Bitcoin that can be used to test the `send` functionality, first mine 101 blocks to the address you obtain from calling `getP2PKHAddress`. You must mine 101 blocks because there is a rule in Bitcoin that block rewards cannot be spent until 100 blocks have been mined on top:

```bash
.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf generatetoaddress 101 <your-canister-btc-address>
```

Give this process a minute or two before expecting the balance of your address to update properly.

You can now use the `send` function to try sending some BTC to another address, for example to the address `n2dcQfuwFw7M2UYzLfM6P7DwewsQaygb8S`. After calling the `send` function you should receive a transaction hash such as `44fdde20b88027e6a8786689739b0fec74f9e6c86cad3f4d5c05e43a51d97445`. To make sure the transaction is included into the Bitcoin blockchain, you must mine a new block:

```bash
.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf generatetoaddress 1 <your-canister-btc-address>
```

You should see some output such as `2023-05-30T20:33:25Z CreateNewBlock(): block weight: 1804 txs: 1 fees: 454 sigops 408` in your Bitcoin node's terminal indicating that your transaction was included in the block.

Now if you call the functions with the `n2dcQfuwFw7M2UYzLfM6P7DwewsQaygb8S` address you should see a new balance, utxos, and fee percentiles.

If you need more information you can view the following:

-   [Developing Bitcoin dapps locally]()https://internetcomputer.org/docs/current/developer-docs/integrations/bitcoin/local-development
-   [Deploying your first Bitcoin dapp](https://internetcomputer.org/docs/current/samples/deploying-your-first-bitcoin-dapp)
