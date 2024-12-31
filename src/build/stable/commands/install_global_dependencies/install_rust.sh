#!/bin/bash

if [ -z "$1" ]; then
    echo "Error: No Rust version specified."
    echo "Usage: ./install_rust.sh <RUST_VERSION>"
    exit 1
fi

RUST_VERSION=$1

# Install Rust
echo "Installing Rust version $RUST_VERSION..."
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain "$RUST_VERSION"
source $HOME/.cargo/env

# Add the WASM target for WebAssembly
rustup target add wasm32-wasip1

echo "Rust $RUST_VERSION installation completed."
rustc --version
cargo --version
rustup target list --installed | grep wasm32-wasip1

exit 0
