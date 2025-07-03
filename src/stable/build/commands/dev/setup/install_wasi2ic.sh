#!/bin/bash

VERSION=$1

echo "Installing cargo-wasi2ic version $VERSION..."
cargo install wasi2ic --version "$VERSION" --locked
