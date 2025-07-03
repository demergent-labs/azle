#!/bin/bash

VERSION=$1

echo "Installing cargo-deny version $VERSION..."
cargo install cargo-deny --version "$VERSION" --locked
