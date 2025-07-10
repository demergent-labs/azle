#!/bin/bash

VERSION=$1

if [[ $VERSION =~ ^https?:// ]]; then
    echo "Installing cargo-audit from repository $VERSION"
    cargo auditable install cargo-audit --git "$VERSION"
else
    echo "Installing cargo-audit version $VERSION"
    cargo auditable install cargo-audit --version "$VERSION"
fi
