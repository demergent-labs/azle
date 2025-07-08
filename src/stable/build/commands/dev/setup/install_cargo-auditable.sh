#!/bin/bash

VERSION=$1

if [[ $VERSION =~ ^https?:// ]]; then
    echo "Installing cargo-auditable from repository $VERSION"
    cargo install cargo-auditable --git "$VERSION" --locked
    cargo auditable install cargo-auditable --git "$VERSION" --locked --force
else
    echo "Installing cargo-auditable version $VERSION"
    cargo install cargo-auditable --version "$VERSION" --locked
    cargo auditable install cargo-auditable --version "$VERSION" --locked --force
fi
