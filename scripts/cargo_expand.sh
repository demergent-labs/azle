# To exapand the generated lib file, run each of these commands one by one from inside the azle/examples/canister_name/.azle/canister_name/src direcotry
# install cargo expand
RUSTUP_HOME=~/.config/azle/1.68.2 CARGO_HOME=~/.config/azle/1.68.2 CARGO_TARGET_DIR=~/.config/azle/target/ ~/.config/azle/1.68.2/bin/cargo install cargo-expand

# install the nightly compiler
RUSTUP_HOME=~/.config/azle/1.68.2 CARGO_HOME=~/.config/azle/1.68.2 CARGO_TARGET_DIR=~/.config/azle/target/ ~/.config/azle/1.68.2/bin/rustup default nightly

# revert to the stable compiler
RUSTUP_HOME=~/.config/azle/1.68.2 CARGO_HOME=~/.config/azle/1.68.2 CARGO_TARGET_DIR=~/.config/azle/target/ ~/.config/azle/1.68.2/bin/rustup default stable

# install wasm32-wasi
RUSTUP_HOME=~/.config/azle/1.68.2 CARGO_HOME=~/.config/azle/1.68.2 CARGO_TARGET_DIR=~/.config/azle/target/ ~/.config/azle/1.68.2/bin/rustup target add wasm32-wasi

# run cargo expand
RUSTUP_HOME=~/.config/azle/1.68.2 CARGO_HOME=~/.config/azle/1.68.2 CARGO_TARGET_DIR=~/.config/azle/target/ ~/.config/azle/1.68.2/bin/cargo expand --target wasm32-wasi
