#!/bin/bash

# Check if .bitcoin directory exists; if not, create it
if [ ! -d ".bitcoin" ]; then
  mkdir .bitcoin
fi

# Check if .bitcoin/data directory exists; if not, create it
if [ ! -d ".bitcoin/data" ]; then
  mkdir .bitcoin/data
fi

# Check if bitcoind executable exists; if not, download and extract it
if [ ! -f ".bitcoin/bin/bitcoind" ]; then
  curl -o bitcoin.tar.gz https://bitcoincore.org/bin/bitcoin-core-23.0/bitcoin-23.0-x86_64-linux-gnu.tar.gz
  tar xzf bitcoin.tar.gz --overwrite --strip-components=1 --directory=.bitcoin/ bitcoin-23.0/bin/
  rm -rf bitcoin.tar.gz
fi
