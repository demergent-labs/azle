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
        echo "Installing cargo-audit from repository $GIT_URL at revision $GIT_REV"
        cargo auditable install cargo-audit --git "$GIT_URL" --rev "$GIT_REV"
    else
        echo "Installing cargo-audit from repository $GIT_URL"
        cargo auditable install cargo-audit --git "$GIT_URL"
    fi
else
    echo "Installing cargo-audit version $VERSION"
    cargo auditable install cargo-audit --version "$VERSION"
fi
