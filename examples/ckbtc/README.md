Keep in mind that this is a simple demo example of ckBTC with Azle, and is probably not suitable for production use. Learn wisely.

This ckBTC example shows you how to setup ckBTC locally, with the `ckBTC ledger`, `internet identity`, `kyt`, `minter`, and `bitcoind`. It also has a canister wallet backend and frontend. The canister wallet shows how a canister can control a number of ckBTC subaccounts. The frontend functionality only shows how to mint ckBTC and transfer between other canister wallets.

# Installation

## bitcoind

```bash
mkdir .bitcoin
mkdir .bitcoin/data

curl https://bitcoincore.org/bin/bitcoin-core-23.0/bitcoin-23.0-x86_64-linux-gnu.tar.gz -o bitcoin.tar.gz

tar xzf bitcoin.tar.gz --overwrite --strip-components=1 --directory=.bitcoin/ bitcoin-23.0/bin/

rm -rf bitcoin.tar.gz
```

## ckbtc ledger canister

```bash
# did file found here: https://github.com/dfinity/ic/blob/master/rs/rosetta-api/icrc1/ledger/ledger.did
cd ckbtc
curl -o ledger.wasm.gz "https://download.dfinity.systems/ic/d6d395a480cd6986b4788f4aafffc5c03a07e46e/canisters/ic-icrc1-ledger.wasm.gz"
```

## internet identity canister

```bash
# did file found here: https://github.com/dfinity/internet-identity/blob/main/src/internet_identity/internet_identity.did
cd internet_identity
# Manually download this file from the browser
# https://github.com/dfinity/internet-identity/releases/download/release-2023-05-15/internet_identity_test.wasm.gz
```

## ckbtc kyt canister

```bash
# did file found here: https://github.com/dfinity/ic/blob/master/rs/bitcoin/ckbtc/kyt/kyt.did
cd kyt
curl -o kyt.wasm.gz "https://download.dfinity.systems/ic/d6d395a480cd6986b4788f4aafffc5c03a07e46e/canisters/ic-ckbtc-kyt.wasm.gz"
```

## ckbtc minter canister

```bash
# did file found here: https://github.com/dfinity/ic/blob/master/rs/bitcoin/ckbtc/minter/ckbtc_minter.did
cd minter
curl -o minter.wasm.gz "https://download.dfinity.systems/ic/d6d395a480cd6986b4788f4aafffc5c03a07e46e/canisters/ic-ckbtc-minter.wasm.gz"
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

## ckbtc ledger canister

```bash
dfx deploy ckbtc --specified-id=be2us-64aaa-aaaaa-qaabq-cai --argument='(variant { Init = record { minting_account = record { owner = principal "bd3sg-teaaa-aaaaa-qaaba-cai" }; transfer_fee = 0 : nat64; token_symbol = "ckBTC"; token_name = "ckBTC"; metadata = vec {}; initial_balances = vec {}; archive_options = record { num_blocks_to_archive = 0 : nat64; trigger_threshold = 0 : nat64; controller_id = principal "aaaaa-aa" } } })'
```

## internet identity canister

```bash
dfx deploy internet_identity --specified-id 4duc2-jqaaa-aaaaa-aabiq-cai --argument '(null)'
```

## ckbtc kyt canister

```bash
dfx deploy kyt --specified-id bkyz2-fmaaa-aaaaa-qaaaq-cai --argument "(variant { InitArg = record { minter_id = principal \"bd3sg-teaaa-aaaaa-qaaba-cai\"; maintainers = vec { principal \"$(dfx identity get-principal)\" }; mode = variant { AcceptAll } } })"

dfx canister call kyt set_api_key '(record { api_key = "" })'
```

## ckbtc minter canister

```bash
dfx deploy minter --specified-id bd3sg-teaaa-aaaaa-qaaba-cai --argument '(variant { Init = record {btc_network = variant { Regtest }; min_confirmations=opt 1; ledger_id = principal "be2us-64aaa-aaaaa-qaabq-cai"; kyt_principal = opt principal "bkyz2-fmaaa-aaaaa-qaaaq-cai"; ecdsa_key_name = "dfx_test_key";retrieve_btc_min_amount = 5_000; max_time_in_queue_nanos = 420_000_000_000; mode = variant {GeneralAvailability}} })'
```

## wallet_backend

```bash
CK_BTC_PRINCIPAL=be2us-64aaa-aaaaa-qaabq-cai MINTER_PRINCIPAL=bd3sg-teaaa-aaaaa-qaaba-cai dfx deploy wallet_backend --specified-id 7ugoi-yiaaa-aaaaa-aabaa-cai

dfx generate wallet_backend
```

## wallet frontend

```bash
dfx deploy wallet_frontend --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai
```

# Usage

Go to the `wallet_frontend` URL `http://ryjl3-tyaaa-aaaaa-aaaba-cai.localhost:8000`. Minting some initial BTC is shown below. You should mint to the Bitcoin deposit address shown in the web UI to start things off.

```bash
# Mine some BTC to that address
.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf generatetoaddress 1 <your-canister-btc-address>
```

Now click `Update Balance` in the web UI.

Play around, try transfering some ckBTC to an account in another independent browser tab.
