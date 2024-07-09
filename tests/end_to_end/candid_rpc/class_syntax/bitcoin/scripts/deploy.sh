#!/usr/bin/env bash

dfx canister create "$1"
dfx build "$1"
dfx canister uninstall-code "$1"
if [ -z "$2" ]
then
    dfx canister install "$1" --wasm "target/wasm32-wasi/release/$1.wasm.gz"
else
    dfx canister install "$1" --argument "$2" --wasm "target/wasm32-wasi/release/$1.wasm.gz"
fi
