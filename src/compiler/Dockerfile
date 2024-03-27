FROM debian:12

RUN apt-get update
RUN apt-get install -y clang
RUN apt-get install -y build-essential

# TODO these are probably not necessary, remove them after a while
# RUN apt-get install -y libssl-dev
# RUN apt-get install -y pkg-config

RUN apt-get install -y curl
RUN apt-get install -y git

ENV PATH="/root/.cargo/bin:${PATH}"
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain=1.73.0 --profile=minimal
RUN rustup target add wasm32-wasi

RUN cargo install --git https://github.com/wasm-forge/wasi2ic --rev 806c3558aad24224852a9582f018178402cb3679

# This is all on one line so that when the commit is changed Docker will rerun the clone
RUN git clone https://github.com/demergent-labs/wasmedge-quickjs && cd wasmedge-quickjs && git checkout c21ff69f442998e4cda4619166e23a9bc91418be

RUN mkdir /global_target_dir

# The following is to pre-compile as many dependencies as possible for Azle projects
# We simply copy over the current Rust setup and do a cargo build
COPY rust/ /azle_rust_dependencies

RUN touch /azle_rust_dependencies/canister/src/main.js
RUN touch /azle_rust_dependencies/canister/src/candid.did
RUN mkdir /azle_rust_dependencies/canister/src/assets
RUN echo "{\"canister_methods\":{\"queries\":[],\"updates\":[],\"callbacks\":{}},\"env_vars\":[],\"assets\":[]}" > /azle_rust_dependencies/canister/src/compiler_info.json
RUN echo "[workspace]\nmembers = [\"canister\"]\n\n[profile.release]\nopt-level = 'z'" > /azle_rust_dependencies/Cargo.toml

WORKDIR /azle_rust_dependencies

RUN AZLE_SKIP_COMPILER_INFO=true CARGO_TARGET_DIR=/global_target_dir cargo build --target wasm32-wasi --manifest-path canister/Cargo.toml --release
