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
RUN git clone https://github.com/demergent-labs/wasmedge-quickjs && cd wasmedge-quickjs && git checkout ce02a5969befebfe47b1bfe3231c367afa34188b

RUN mkdir /global_target_dir
