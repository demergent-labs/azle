#!/usr/bin/env bash

# This script is just for reference, I have essentially copied it into the OpenAI Codex
# Azle environment Setup script

echo "Installing dfx $DFX_VERSION"

DFX_VERSION="$(jq -r '.azle.globalDependencies.dfx // empty' package.json)"
./src/stable/build/commands/dev/setup/install_dfx.sh "$DFX_VERSION"
export PATH="$HOME/.local/share/dfx/bin:$PATH"

echo "npm install and link at the root of the azle repo"

npm install
npm link

echo "Setting up azle dev environment"

npx azle dev setup --rust --cargo-auditable --cargo-bundle-licenses --wasi2ic

echo "Starting dfx in the background"

dfx start --clean --background --artificial-delay 0

echo "Running one basic test"

cd examples/stable/test/end_to_end/candid_rpc/async_await
npm install
npm link azle
AZLE_VERBOSE=true AZLE_DEV_TEMPLATE=true npm test

echo "Setup completed successfully"
