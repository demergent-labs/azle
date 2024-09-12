#!/bin/bash

# File path for the global dependencies
GLOBAL_DEPENDENCIES_FILE="$PWD/global_dependencies"

# Extract the rustc version from the file (picking only the version number)
RUST_VERSION=$(grep 'rustc version:' "$GLOBAL_DEPENDENCIES_FILE" | awk '{print $4}' | cut -d' ' -f1)

if [[ -z "$RUST_VERSION" ]]; then
  echo "Rust version not found in $GLOBAL_DEPENDENCIES_FILE"
  exit 1
fi

# Install Rust using rustup with the extracted version
echo "Installing Rust version $RUST_VERSION"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain "$RUST_VERSION"
source $HOME/.cargo/env

# Extract the wasi2ic version and repository URL
WASI2IC_LINE=$(grep 'wasi2ic version:' "$GLOBAL_DEPENDENCIES_FILE")
WASI2IC_VERSION=$(echo "$WASI2IC_LINE" | awk -F' ' '{print $4}')
WASI2IC_URL=$(echo "$WASI2IC_LINE" | grep -oP '(https://[^\s]+)')

if [[ -z "$WASI2IC_VERSION" || -z "$WASI2IC_URL" ]]; then
  echo "wasi2ic version or URL not found in $GLOBAL_DEPENDENCIES_FILE"
  exit 1
fi

# Install wasi2ic using cargo
echo "Installing wasi2ic version $WASI2IC_VERSION from $WASI2IC_URL"
cargo install --git "$WASI2IC_URL" --rev "$WASI2IC_VERSION" wasi2ic

# Confirm installation
rustc --version
cargo --version

# Confirm installation
cargo install --list | grep wasi2ic
