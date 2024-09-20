#!/bin/bash

set -e

VERSION=$1

BRANCH="release--$VERSION"

git switch -c "$BRANCH"

sed -E -i "s/(\"version\": \")(.*)(\")/\1$VERSION\3/" package.json
sed -E -i "s/(\"version\": \")(.*)(\")/\1$VERSION\3/" dfx_extension/extension.json

npm install

git commit -am "$BRANCH"
git push origin "$BRANCH"
