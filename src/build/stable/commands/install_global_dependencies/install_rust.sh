#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: No Rust version specified."
    echo "Usage: ./install_rust.sh <RUST_VERSION>"
    exit 1
fi

RUST_VERSION=$1

if command -v rustc &> /dev/null; then
    INSTALLED_VERSION=$(npx tsx src/build/stable/utils/versions/rust.ts 2>&1 | tr -d '[:space:]')

    echo "Installed Rust version: $INSTALLED_VERSION"
    echo "Requested Rust version: $RUST_VERSION"

    if [ "$INSTALLED_VERSION" = "$RUST_VERSION" ]; then
        echo "Rust $RUST_VERSION is already installed. No installation needed."
        exit 0
    else
        echo "Updating Rust from version $INSTALLED_VERSION to $RUST_VERSION"
    fi
else
    echo "Rust is not installed. Proceeding with installation of Rust $RUST_VERSION."
fi

# Install Rust
echo "Installing Rust version $RUST_VERSION..."
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain "$RUST_VERSION"
source $HOME/.cargo/env

# Add the WASM target for WebAssembly
rustup target add wasm32-wasi

echo "Rust $RUST_VERSION installation completed."
rustc --version
cargo --version
rustup target list --installed | grep wasm32-wasi

exit 0
