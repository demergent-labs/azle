#!/bin/bash

# TODO If we want to save a little bit of time we might be able to instruct rustup to not install some components initially, like clippy and docs
# TODO we might want to implement all of this in Node.js in the future for platform-independence etc

azle_version="$1"
rust_version="$2"

global_azle_config_dir=~/.config/azle/"$azle_version"
global_azle_bin_dir="$global_azle_config_dir"/bin
global_azle_cargo_bin="$global_azle_bin_dir"/cargo
global_azle_logs_dir="$global_azle_config_dir"/logs
global_azle_rustup_bin="$global_azle_bin_dir"/rustup

export CARGO_HOME="$global_azle_config_dir"
export RUSTUP_HOME="$global_azle_config_dir"

function run() {
    is_rustup_already_installed
    rustup_already_installed=$?
    is_wasm32_unknown_unknown_already_installed $rustup_already_installed
    wasm32_unknown_unknown_already_installed=$?
    ic_wasm_already_installed=$(test -e "$global_azle_bin_dir"/ic-wasm; echo $?)
    ic_cdk_optimizer_already_installed=$(test -e "$global_azle_bin_dir"/ic-cdk-optimizer; echo $?)

    if [ "$rustup_already_installed" -eq 1 ] || [ "$wasm32_unknown_unknown_already_installed" -eq 1 ] || [ "$ic_wasm_already_installed" -eq 1 ] || [ "$ic_cdk_optimizer_already_installed" -eq 1 ]; then
        echo -e "\nAzle "$azle_version" prerequisite installation (this may take a few minutes)\n"

        mkdir -p "$global_azle_config_dir"
        mkdir -p "$global_azle_logs_dir"

        install_rustup "$rustup_already_installed"

        # "$global_azle_rustup_bin" target list

        install_wasm32_unknown_unknown "$wasm32_unknown_unknown_already_installed"
        install_ic_wasm "$ic_wasm_already_installed"
        install_ic_cdk_optimizer "$ic_cdk_optimizer_already_installed"
    else
        update_rustup
    fi
}

function is_rustup_already_installed() {
    temp=$(command -v "$global_azle_rustup_bin")
    if [ -n "$temp" ]; then
        "$global_azle_rustup_bin" target list | grep -q "(installed)"
    else
        return 1
    fi
}

function is_wasm32_unknown_unknown_already_installed() {
    if [ "$1" -eq 0 ]; then
        "$global_azle_rustup_bin" target list | grep -q "wasm32-unknown-unknown (installed)"
        return $?
    else
        return 1
    fi
}

function install_rustup() {
    echo -e "1/4) Installing Rust"

    if [ -z "$1" ]; then
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --no-modify-path -y --default-toolchain="$rust_version" &> "$global_azle_logs_dir"/step_1_rust
    fi
}

function update_rustup() {
    "$global_azle_rustup_bin" update "$rust_version" &> "$global_azle_logs_dir"/rustup_update
}

function install_wasm32_unknown_unknown() {
    echo -e "2/4) Installing wasm32-unknown-unknown"

    if [ "$1" -eq 1 ]; then
        "$global_azle_rustup_bin" target add wasm32-unknown-unknown &> "$global_azle_logs_dir"/step_2_wasm32_unknown_unknown
    fi
}

function install_ic_wasm() {
    echo -e "3/4) Installing ic-wasm"

    if [ "$1" -eq 1 ]; then
        "$global_azle_cargo_bin" install ic-wasm --version 0.3.0 &> "$global_azle_logs_dir"/step_3_ic_wasm
    fi
}

function install_ic_cdk_optimizer() {
    echo -e "4/4) Installing ic-cdk-optimizer\n"

    if [ "$1" -eq 1 ]; then
        "$global_azle_cargo_bin" install ic-cdk-optimizer --version 0.3.4  &> "$global_azle_logs_dir"/step_4_ic_cdk_optimizer
    fi
}

run
