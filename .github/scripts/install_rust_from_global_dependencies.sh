#!/bin/bash

# File path for the global dependencies
GLOBAL_DEPENDENCIES_FILE="$PWD/global_dependencies"

# Extract the rustc version from the file
RUST_VERSION=$(grep 'rustc version:' "$GLOBAL_DEPENDENCIES_FILE" | awk '{print $3}')

if [[ -z "$RUST_VERSION" ]]; then
  echo "Rust version not found in $GLOBAL_DEPENDENCIES_FILE"
  exit 1
fi

# Install Rust using rustup with the extracted version
echo "Installing Rust version $RUST_VERSION"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain "$RUST_VERSION"
source $HOME/.cargo/env

# Confirm installation
rustc --version
cargo --version
