#!/bin/bash

# TODO If we want to save a little bit of time we might be able to instruct rustup to not install some components initially, like clippy and docs
# TODO we might want to implement all of this in Node.js in the future for platform-independence etc
# TODO once ic-cdk-optimizer and ic-wasm are no longer required, we can probably just check for the wasm32-unknown-unknown target being installed: $global_azle_rustup_bin target list | grep -q "wasm32-unknown-unknown (installed)"

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
    ic_wasm_already_installed=$(test -e "$global_azle_bin_dir"/ic-wasm; echo $?)
    ic_cdk_optimizer_already_installed=$(test -e "$global_azle_bin_dir"/ic-cdk-optimizer; echo $?)

    previous_azle_version=$(ls ~/.config/azle | sort -V | awk -v azle_version="$azle_version" '$0 < azle_version { previous_version = $0 } END { print previous_version }')
    previous_azle_config_dir=~/.config/azle/"$previous_azle_version"
    previous_azle_logs_dir="$previous_azle_config_dir"/logs
    previous_rust_version_file="$previous_azle_logs_dir"/rust_version

    if [ -f "$previous_rust_version_file" ]; then
        previous_rust_version=$(cat "$previous_rust_version_file")
    else
        previous_rust_version=""
    fi

    current_rust_version_file="$global_azle_logs_dir"/rust_version

    if [ -f "$current_rust_version_file" ]; then
        current_rust_version=$(cat "$current_rust_version_file")
    else
        current_rust_version=""
    fi

    if [ "$rust_version" != "$current_rust_version" ] || ([ "$rust_version" != "$previous_rust_version" ] && ([ "$ic_wasm_already_installed" -eq 1 ] || [ "$ic_cdk_optimizer_already_installed" -eq 1 ])); then
        echo -e "\nAzle "$azle_version" prerequisite installation (this may take a few minutes)\n"

        mkdir -p "$global_azle_config_dir"
        mkdir -p "$global_azle_logs_dir"

        echo "$rust_version" > "$global_azle_logs_dir"/rust_version

        install_rustup
        install_wasm32_unknown_unknown
        install_ic_wasm "$ic_wasm_already_installed"
        install_ic_cdk_optimizer "$ic_cdk_optimizer_already_installed"
        echo -e "\n"
    elif [ "$rust_version" == "$previous_rust_version" ]; then
        mv "$previous_azle_config_dir" "$global_azle_config_dir"
    else
        update_rustup
    fi
}

function install_rustup() {
    echo -e "1/4) Installing Rust"

    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- --no-modify-path -y --default-toolchain="$rust_version" &> "$global_azle_logs_dir"/step_1_rust
}

function update_rustup() {
    "$global_azle_rustup_bin" update "$rust_version" &> "$global_azle_logs_dir"/rustup_update
}

function install_wasm32_unknown_unknown() {
    echo -e "2/4) Installing wasm32-unknown-unknown"

    "$global_azle_rustup_bin" target add wasm32-unknown-unknown &> "$global_azle_logs_dir"/step_2_wasm32_unknown_unknown
}

function install_ic_wasm() {
    echo -e "3/4) Installing ic-wasm"

    if [ "$1" -eq 1 ]; then
        "$global_azle_cargo_bin" install ic-wasm --version 0.3.0 &> "$global_azle_logs_dir"/step_3_ic_wasm
    fi
}

function install_ic_cdk_optimizer() {
    echo -e "4/4) Installing ic-cdk-optimizer"

    if [ "$1" -eq 1 ]; then
        "$global_azle_cargo_bin" install ic-cdk-optimizer --version 0.3.4  &> "$global_azle_logs_dir"/step_4_ic_cdk_optimizer
    fi
}

run
