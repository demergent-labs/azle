#!/bin/bash

VERSION=$1

if [[ $VERSION =~ ^https?:// ]]; then
    echo "Installing cargo-deny from repository $VERSION"
    cargo auditable install cargo-deny --git "$VERSION" --locked
else
    echo "Installing cargo-deny version $VERSION"
    cargo auditable install cargo-deny --version "$VERSION" --locked
fi
