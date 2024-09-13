#!/bin/bash

# File path for the global dependencies
GLOBAL_DEPENDENCIES_FILE="$PWD/global_dependencies.json"

# Ensure jq is installed for JSON parsing
if ! command -v jq &> /dev/null; then
  echo "jq could not be found. Please install jq to parse JSON."
  exit 1
fi

# Extract the rustc version from the JSON file
RUST_VERSION=$(jq -r '.dependencies.rustc // empty' "$GLOBAL_DEPENDENCIES_FILE")

if [[ -z "$RUST_VERSION" ]]; then
  echo "Rust version not found in $GLOBAL_DEPENDENCIES_FILE"
  exit 1
fi

# Install Rust using rustup with the extracted version
echo "Installing Rust version $RUST_VERSION"
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain "$RUST_VERSION"
source $HOME/.cargo/env

rustup target add wasm32-wasi

# Extract the wasi2ic version and repository URL
WASI2IC_VERSION=$(jq -r '.dependencies.wasi2ic // empty' "$GLOBAL_DEPENDENCIES_FILE")

# Determine if WASI2IC_VERSION is a URL (repo) or just a version number
if [[ $WASI2IC_VERSION =~ ^https?:// ]]; then
  WASI2IC_URL=$WASI2IC_VERSION
else
  WASI2IC_URL=""
fi

if [[ -z "$WASI2IC_VERSION" ]]; then
  echo "wasi2ic version not found in $GLOBAL_DEPENDENCIES_FILE"
  exit 1
fi

# Install wasi2ic
if [[ -n "$WASI2IC_URL" ]]; then
  echo "Installing wasi2ic from repository $WASI2IC_URL"
  cargo install --git "$WASI2IC_URL"
else
  echo "Installing wasi2ic version $WASI2IC_VERSION"
  cargo install wasi2ic --version "$WASI2IC_VERSION"
fi

# Confirm installation
echo "\nThe following global dependencies were installed"
rustc --version
cargo --version

rustup target list --installed | grep wasm32-wasi

cargo install --list | grep wasi2ic
