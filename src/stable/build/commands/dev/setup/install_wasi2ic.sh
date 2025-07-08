#!/bin/bash

VERSION=$1

if [[ $VERSION =~ ^https?:// ]]; then
    echo "Installing wasi2ic from repository $VERSION"
    cargo auditable install wasi2ic --git "$VERSION" --locked
else
    echo "Installing wasi2ic version $VERSION"
    cargo auditable install wasi2ic --version "$VERSION" --locked
fi
