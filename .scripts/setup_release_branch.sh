#!/bin/bash

set -e

LATEST_VERSION=$(npm view azle dist-tags.next)

# Check if the version is in the format of "0.X.X-rc.Y"
if [[ "$LATEST_VERSION" =~ ^([0-9]+\.[0-9]+\.[0-9]+)-rc\.([0-9]+)$ ]]; then
    VERSION_BASE="${BASH_REMATCH[1]}"  # e.g., "0.24.2"
    RC_NUMBER="${BASH_REMATCH[2]}"     # e.g., "17"

    # Increment the RC number
    NEXT_RC_NUMBER=$((RC_NUMBER + 1))

    # Construct the next version
    VERSION="${VERSION_BASE}-rc.${NEXT_RC_NUMBER}"
else
    # TODO when this case comes up write code for it accordingly. I just don't know what it looks like at this point
    echo "No matching rc version found, or version format incorrect."
    exit 1
fi


BRANCH="release--$VERSION"

git switch -c "$BRANCH"

sed -E -i "s/(\"version\": \")(.*)(\")/\1$VERSION\3/" package.json
sed -E -i "s/(\"version\": \")(.*)(\")/\1$VERSION\3/" src/stable/build/dfx_extension/extension.json

npm install

# Run security checks
echo "Running npm audit..."
npm audit --production || { echo "npm audit failed"; exit 1; }

echo "Running cargo audit..."
cargo audit || { echo "cargo audit failed"; exit 1; }

echo "Running cargo deny check licenses..."
cargo deny check licenses || { echo "cargo deny check failed"; exit 1; }

git commit -am "$BRANCH"
git push origin "$BRANCH"
