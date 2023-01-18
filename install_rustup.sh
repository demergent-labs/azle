#!/bin/bash

# TODO It would be nice if we didn't have to hard-code the Rust versions, we'll just have to remember to do this
# TODO If we want to save a little bit of time we might be able to instruct rustup to not install some components initially, like clippy and docs

export CARGO_HOME=~/.config/azle
export RUSTUP_HOME=~/.config/azle

if [ -x "$(command -v ~/.config/azle/bin/rustup)" ]; then
    ~/.config/azle/bin/rustup update 1.66.0 &> ~/.config/azle/logs/rustup_update
else
    echo -e "Keep calm, this could take a few minutes. Subsequent installs will be faster.\n"

    mkdir ~/.config/azle
    mkdir ~/.config/azle/logs

    echo -e "1/4) Installing Rust"

    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --no-modify-path -y --default-toolchain=1.66.0 &> ~/.config/azle/logs/step_1_rust

    echo -e "2/4) Installing wasm32-unknown-unknown"

    ~/.config/azle/bin/rustup target add wasm32-unknown-unknown &> ~/.config/azle/logs/step_2_wasm32_unknown_unknown

    echo -e "3/4) Installing ic-wasm"

    ~/.config/azle/bin/cargo install ic-wasm --version 0.3.0 &> ~/.config/azle/logs/step_3_ic_wasm

    echo -e "4/4) Installing ic-cdk-optimizer"

    ~/.config/azle/bin/cargo install ic-cdk-optimizer --version 0.3.4  &> ~/.config/azle/logs/step_4_ic_cdk_optimizer
fi
