#!/bin/bash

# Path to package.json
PACKAGE_JSON_PATH="package.json"

# Check if package.json exists
if [ ! -f "$PACKAGE_JSON_PATH" ]; then
  echo "Error: $PACKAGE_JSON_PATH not found."
  exit 1
fi

# Extract the Node.js version from globalDependencies
DFX_VERSION=$(jq -r '.azle.globalDependencies.dfx // empty' "$PACKAGE_JSON_PATH")

if [ -z "$DFX_VERSION" ]; then
  echo "dfx version not found in globalDependencies."
  exit 1
else
  echo "$DFX_VERSION"
fi
