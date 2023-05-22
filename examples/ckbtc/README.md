# Installation

TODO make this the best ckBTC local setup demo ever

## ckbtc ledger canister

TODO let's make sure to test the ledger with this wasm binary too, I like it better

TODO use this comment to download the binaries and did files: https://forum.dfinity.org/t/ckbtc-a-canister-issued-bitcoin-twin-token-on-the-ic-1-1-backed-by-btc/17606/70

```bash
cd ckbtc
curl -o ledger.wasm.gz "https://download.dfinity.systems/ic/d6d395a480cd6986b4788f4aafffc5c03a07e46e/canisters/ic-icrc1-ledger.wasm.gz"
```

## ckbtc minter canister

```bash
cd minter
curl -o minter.wasm.gz "https://download.dfinity.systems/ic/d6d395a480cd6986b4788f4aafffc5c03a07e46e/canisters/ic-ckbtc-minter.wasm.gz"
```

## ckbtc kyt canister

```bash
cd kyt
curl -o kyt.wasm.gz "https://download.dfinity.systems/ic/d6d395a480cd6986b4788f4aafffc5c03a07e46e/canisters/ic-ckbtc-kyt.wasm.gz"
```

## bitcoind

```bash
mkdir .bitcoin
mkdir data

curl https://bitcoincore.org/bin/bitcoin-core-23.0/bitcoin-23.0-x86_64-linux-gnu.tar.gz -o bitcoin.tar.gz

tar xzf bitcoin.tar.gz --overwrite --strip-components=1 --directory=.bitcoin/ bitcoin-23.0/bin/

rm -rf bitcoin.tar.gz

.bitcoin/bin/bitcoind -conf=$(pwd)/.bitcoin.conf -datadir=$(pwd)/data --port=18444
```

# Deployment

## ckbtc ledger canister

```bash
dfx deploy ckbtc --specified-id=be2us-64aaa-aaaaa-qaabq-cai --argument='(variant { Init = record { minting_account = record { owner = principal "bd3sg-teaaa-aaaaa-qaaba-cai" }; transfer_fee = 0 : nat64; token_symbol = "ckBTC"; token_name = "ckBTC"; metadata = vec {}; initial_balances = vec {}; archive_options = record { num_blocks_to_archive = 0 : nat64; trigger_threshold = 0 : nat64; controller_id = principal "aaaaa-aa" } } })'
```

## ckbtc minter canister

```bash
dfx deploy minter --specified-id bd3sg-teaaa-aaaaa-qaaba-cai --argument '(variant { Init = record {btc_network = variant { Regtest };min_confirmations=opt 1;ledger_id = principal "be2us-64aaa-aaaaa-qaabq-cai"; kyt_principal = opt principal "bkyz2-fmaaa-aaaaa-qaaaq-cai"; ecdsa_key_name = "dfx_test_key";retrieve_btc_min_amount = 5_000;max_time_in_queue_nanos = 420_000_000_000; mode = variant {GeneralAvailability}} })'
```

## ckbtc kyt canister

```bash
dfx deploy kyt --specified-id bkyz2-fmaaa-aaaaa-qaaaq-cai --argument "(variant { InitArg = record { minter_id = principal \"bd3sg-teaaa-aaaaa-qaaba-cai\"; maintainers = vec { principal \"$(dfx identity get-principal)\" }; mode = variant { AcceptAll } } })"

dfx canister call kyt set_api_key '(record { api_key = "" })'
```

# Usage

## ckbtc minter canister

```bash
# First get the BTC address
dfx canister call minter get_btc_address '(record {})'

# Mine some BTC to that address
.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf generatetoaddress 1 <your-canister-btc-address>

# Update the balance
dfx canister call minter update_balance '(record {})'

# Check the ckBTC balance
dfx canister call ckbtc icrc1_balance_of "(record { owner = principal \"$(dfx identity get-principal)\" })"
```
