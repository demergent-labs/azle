#!/bin/bash

VERSION=$1

if [[ $VERSION =~ ^https?:// ]]; then
    GIT_URL="${VERSION%%\?rev=*}"
    GIT_URL="${GIT_URL%%#*}"
    GIT_REV=""

    case "$VERSION" in
        *\?rev=*)
            GIT_REV="${VERSION#*\?rev=}"
            GIT_REV="${GIT_REV%%#*}"
            ;;
        *#*)
            GIT_REV="${VERSION##*#}"
            ;;
    esac

    if [[ "$GIT_REV" != "" ]]; then
        echo "Installing cargo-deny from repository $GIT_URL at revision $GIT_REV"
        cargo auditable install cargo-deny --git "$GIT_URL" --rev "$GIT_REV" --locked
    else
        echo "Installing cargo-deny from repository $GIT_URL"
        cargo auditable install cargo-deny --git "$GIT_URL" --locked
    fi
else
    echo "Installing cargo-deny version $VERSION"
    cargo auditable install cargo-deny --version "$VERSION" --locked
fi
