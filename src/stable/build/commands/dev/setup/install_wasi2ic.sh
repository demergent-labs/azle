#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: No WASI2IC version specified."
    echo "Usage: ./install_wasi2ic.sh <WASI2IC_VERSION_OR_URL>"
    exit 1
fi

WASI2IC_VERSION=$1

# Check if WASI2IC_VERSION is a URL (repo) or just a version number
if [[ $WASI2IC_VERSION =~ ^https?:// ]]; then
    WASI2IC_URL=$WASI2IC_VERSION
else
    WASI2IC_URL=""
fi

# Install or update wasi2ic
if [[ -n "$WASI2IC_URL" ]]; then
    echo "Installing wasi2ic from repository $WASI2IC_URL"
    cargo install --git "$WASI2IC_URL"
else
    echo "Installing wasi2ic version $WASI2IC_VERSION"
    cargo install wasi2ic --version "$WASI2IC_VERSION"
fi

echo "wasi2ic installation completed."
cargo install --list | grep wasi2ic
exit 0
