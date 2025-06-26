#!/bin/bash

# Skip Bitcoin installation on Mac or WSL environments
if [ "$AZLE_RUNNING_IN_MAC" = "true" ] || [ "$AZLE_RUNNING_IN_WSL" = "true" ]; then
    echo "Skipping Bitcoin installation on Mac or WSL environment"
    exit 0
fi

mkdir -p .bitcoin/data

# Check if bitcoind executable exists; if not, download and extract it
if [ ! -f ".bitcoin/bin/bitcoind" ]; then
  curl -o bitcoin.tar.gz https://bitcoincore.org/bin/bitcoin-core-23.0/bitcoin-23.0-x86_64-linux-gnu.tar.gz
  tar xzf bitcoin.tar.gz --overwrite --strip-components=1 --directory=.bitcoin/ bitcoin-23.0/bin/
  rm -rf bitcoin.tar.gz
fi
