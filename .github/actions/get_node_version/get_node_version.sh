#!/bin/bash

# Path to package.json
PACKAGE_JSON_PATH="package.json"

# Check if package.json exists
if [ ! -f "$PACKAGE_JSON_PATH" ]; then
  echo "Error: $PACKAGE_JSON_PATH not found."
  exit 1
fi

# Extract the Node.js version from globalDependencies
NODE_VERSION=$(jq -r '.azle.globalDependencies.node // empty' "$PACKAGE_JSON_PATH")

if [ -z "$NODE_VERSION" ]; then
  echo "Node.js version not found in globalDependencies."
  exit 1
else
  echo "$NODE_VERSION"
fi
