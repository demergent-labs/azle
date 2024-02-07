FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install -y clang
RUN apt-get install -y build-essential
RUN apt-get install -y libssl-dev
RUN apt-get install -y pkg-config
RUN apt-get install -y curl
RUN apt-get install -y git

RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain=1.73.0 --profile=minimal
ENV PATH="/root/.cargo/bin:${PATH}"
RUN rustup target add wasm32-wasi

RUN mkdir /global_target_dir

RUN cargo install --git https://github.com/wasm-forge/wasi2ic --rev 806c3558aad24224852a9582f018178402cb3679

RUN git clone https://github.com/demergent-labs/wasmedge-quickjs
RUN cd wasmedge-quickjs && git checkout a64adb5910cd7c065b1f0efa337b0a03ffb6afc9
