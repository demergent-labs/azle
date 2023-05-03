#!/bin/bash

# TODO we might want to implement all of this in Node.js in the future for platform-independence etc

azle_version="$1"
rust_version="$2"

global_azle_config_dir=~/.config/azle
global_azle_rust_dir="$global_azle_config_dir"/"$rust_version"
global_azle_bin_dir="$global_azle_rust_dir"/bin
global_azle_logs_dir="$global_azle_rust_dir"/logs
global_azle_cargo_bin="$global_azle_bin_dir"/cargo
global_azle_rustup_bin="$global_azle_bin_dir"/rustup

export CARGO_TARGET_DIR="$global_azle_config_dir"/target
export CARGO_HOME="$global_azle_rust_dir"
export RUSTUP_HOME="$global_azle_rust_dir"

function run() {
    if [ -e "$global_azle_rustup_bin" ] && $global_azle_rustup_bin target list | grep -q "wasm32-unknown-unknown (installed)"; then
        update_rustup
    else
        mkdir -p "$global_azle_rust_dir"
        mkdir -p "$global_azle_logs_dir"

        install_rustup
        install_wasm32_unknown_unknown
    fi
}

function install_rustup() {
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --no-modify-path -y --default-toolchain="$rust_version" --profile=minimal &> "$global_azle_logs_dir"/install_rustup
}

function update_rustup() {
    "$global_azle_rustup_bin" update "$rust_version" &> "$global_azle_logs_dir"/update_rustup
}

function install_wasm32_unknown_unknown() {
    "$global_azle_rustup_bin" target add wasm32-unknown-unknown &> "$global_azle_logs_dir"/install_wasm32_unknown_unknown
}

run