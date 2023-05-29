# Installation

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

# Usage

```bash
# Mine some BTC to an address
.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf generatetoaddress 1 <your-canister-btc-address>
```
