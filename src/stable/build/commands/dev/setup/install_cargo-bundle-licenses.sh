#!/bin/bash

VERSION=$1

if [[ $VERSION =~ ^https?:// ]]; then
    echo "Installing cargo-bundle-licenses from repository $VERSION"
    cargo auditable install cargo-bundle-licenses --git "$VERSION" --locked
else
    echo "Installing cargo-bundle-licenses version $VERSION"
    cargo auditable install cargo-bundle-licenses --version "$VERSION" --locked
fi
