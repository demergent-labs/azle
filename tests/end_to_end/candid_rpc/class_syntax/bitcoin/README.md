# Bitcoin

This example shows how to interact with the bitcoin API in the management canister.

> :rotating_light: As described in this guide, you will be working with a local bitcoin testnet. Do not use real bitcoin addresses or keys!

## Prerequisites

For this example to work properly you need to have a bitcoin daemon running locally. This example assumes that the daemon has been installed and is running properly before starting up the dfx replica.

### Setting Up A Local Bitcoin Daemon

1. Download [Bitcoin Core](https://bitcoincore.org/en/download/): `curl https://bitcoincore.org/bin/bitcoin-core-23.0/bitcoin-23.0-x86_64-linux-gnu.tar.gz -O`
2. Follow [bitcoin core's setup instructions](https://bitcoin.org/en/full-node) to get it installed and accessible on your `$PATH`. Alternatively follow the easy setup below.
3. Start the daemon: `npm run bitcoind`

If the setup instructions are too complicated, or you you would prefer to not add `bitcoind` and `bitcoin-cli` to your `$PATH`, you can use the binaries directly from your download. In that scenario, after downloading the tarball:

1. Unzip the tarball: `tar xzf bitcoin-23.0-x86_64-linux-gnu.tar.gz`. This will create a directory called `bitcoin-23.0`
2. Update the `bitcoind` and `bitcoin-cli` scripts in package.json to use your downloaded binaries instead of looking for them in your `$PATH`
3. Start the daemon: `npm run bitcoind`

## Deploying Your Canister

1. Ensure the bitcoin daemon is running in one terminal
2. In a separate terminal start your IC replica: `dfx start`
3. Deploy the canister: `npm run deploy`
