#!/bin/bash

# TODO we might want to implement all of this in Node.js in the future for platform-independence etc

azle_version="$1"
rust_version="$2"

global_azle_config_dir=~/.config/azle
global_azle_rust_dir="$global_azle_config_dir"/rust/"$rust_version"
global_azle_rust_bin_dir="$global_azle_rust_dir"/bin
global_azle_logs_dir="$global_azle_rust_dir"/logs
global_azle_cargo_bin="$global_azle_rust_bin_dir"/cargo
global_azle_rustup_bin="$global_azle_rust_bin_dir"/rustup
global_azle_rustc_bin="$global_azle_rust_bin_dir"/rustc
global_azle_wasi2ic_bin="$global_azle_rust_bin_dir"/wasi2ic

export CARGO_TARGET_DIR="$global_azle_config_dir"/rust/target
export CARGO_HOME="$global_azle_rust_dir"
export RUSTUP_HOME="$global_azle_rust_dir"
export CARGO_REGISTRIES_CRATES_IO_PROTOCOL=sparse

function run() {
    if ! ([ -e "$global_azle_rustup_bin" ] && [ -e "$global_azle_wasi2ic_bin" ] && [ -e "$global_azle_cargo_bin" ] && [ -e "$global_azle_rustc_bin" ] && $global_azle_rustup_bin target list | grep -q "wasm32-wasi (installed)"); then
        mkdir -p "$global_azle_rust_dir"
        mkdir -p "$global_azle_logs_dir"

        install_rustup
        install_wasm32
        install_wasi2ic

        echo -e "[4/4] 🚀 Launching..."
    fi
}

function install_rustup() {
    echo -e "\n[1/4] 🔬 Performing initial research..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --no-modify-path -y --default-toolchain="$rust_version" --profile=minimal &> "$global_azle_logs_dir"/install_rustup
}

function install_wasm32() {
    echo -e "[2/4] 🛠️  Commencing development..."
    "$global_azle_rustup_bin" target add wasm32-wasi &> "$global_azle_logs_dir"/install_wasm32_wasi
}

function install_wasi2ic() {
    echo -e "[3/4] 🖥️  Deploying..."
    "$global_azle_cargo_bin" install --git https://github.com/wasm-forge/wasi2ic --rev 806c3558aad24224852a9582f018178402cb3679 &> "$global_azle_logs_dir"/install_wasi2ic
}

run
