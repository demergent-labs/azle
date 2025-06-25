#!/bin/bash

VERSION=$1

echo "Installing cargo-audit version $VERSION..."
cargo install cargo-audit --version "$VERSION"
