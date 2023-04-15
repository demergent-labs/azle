#!/bin/bash

# Usage:
# cd examples
# ../scripts/update_candid.sh
# cd motoko_examples
# ../../scripts/update_candid.sh

upgrade_candid()
{
  npm install
  npm link azle
  dfx canister create --all
  dfx build
}

upgrade_all()
{

for dir in */; do
  echo "Looking at directory: $dir"
  # check if dfx.json file exists in directory
  if [ -f "$dir/dfx.json" ]; then
    echo "Processing directory: $dir"
    cd $dir
    upgrade_candid
    cd ..
  fi
done
}

dfx start --clean --background

upgrade_all

dfx stop