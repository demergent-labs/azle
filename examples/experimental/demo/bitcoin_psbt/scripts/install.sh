#!/bin/bash

mkdir -p .bitcoin/data

# Check if bitcoind executable exists; if not, download and extract it
if [ ! -f ".bitcoin/bin/bitcoind" ]; then
  # Detect platform and architecture
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if [[ "$(uname -m)" == "arm64" ]]; then
      # Apple Silicon
      BITCOIN_ARCHIVE="bitcoin-23.0-aarch64-apple-darwin.tar.gz"
    else
      # Intel Mac
      BITCOIN_ARCHIVE="bitcoin-23.0-x86_64-apple-darwin.tar.gz"
    fi
  elif [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "linux"* ]]; then
    # Linux (including WSL)
    BITCOIN_ARCHIVE="bitcoin-23.0-x86_64-linux-gnu.tar.gz"
  else
    echo "Unsupported platform: $OSTYPE"
    exit 1
  fi

  echo "Downloading Bitcoin Core for platform: $BITCOIN_ARCHIVE"
  curl -o bitcoin.tar.gz "https://bitcoincore.org/bin/bitcoin-core-23.0/$BITCOIN_ARCHIVE"
  tar xzf bitcoin.tar.gz --overwrite --strip-components=1 --directory=.bitcoin/ bitcoin-23.0/bin/
  rm -rf bitcoin.tar.gz
fi
