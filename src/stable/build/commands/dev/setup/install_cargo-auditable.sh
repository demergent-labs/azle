#!/bin/bash

VERSION=$1

# cargo-auditable allows us to run cargo audit bin on our global cargo dependencies.
# We first install cargo-auditable so that it can be used to install itself.
# Without this, cargo audit bin would not be able to audit cargo-auditable itself.
if [[ $VERSION =~ ^https?:// ]]; then
    echo "Installing cargo-auditable from repository $VERSION"
    cargo install cargo-auditable --git "$VERSION" --locked
    cargo auditable install cargo-auditable --git "$VERSION" --locked --force
else
    echo "Installing cargo-auditable version $VERSION"
    cargo install cargo-auditable --version "$VERSION" --locked
    cargo auditable install cargo-auditable --version "$VERSION" --locked --force
fi
