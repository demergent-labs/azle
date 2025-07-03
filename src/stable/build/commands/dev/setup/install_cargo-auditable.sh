#!/bin/bash

VERSION=$1

echo "Installing cargo-auditable version $VERSION..."
cargo install cargo-auditable --version "$VERSION" --locked
