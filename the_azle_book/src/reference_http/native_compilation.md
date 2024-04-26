# Native Compilation TL;DR

Add the `--native-compilation` option to the command in the `build` property of your canister object in your `dfx.json` file. Make sure you install the correct dependencies for your project's version of Azle.

# Native Compilation

Examples:

-   [key_value_store](https://github.com/demergent-labs/azle/tree/main/examples/key_value_store)
-   [primitive_types](https://github.com/demergent-labs/azle/tree/main/examples/primitive_types)
-   [stable_structures](https://github.com/demergent-labs/azle/tree/main/examples/stable_structures)

Azle uses a container image and [Podman](https://podman.io/) to simplify the development environment experience. Because of this, Azle only requires `dfx`, `node/npm`, and `podman` to be installed on the developer's machine.

But this setup isn't always desirable. For example, Podman has trouble running inside of a Docker container.

If you would like to skip the container and run Azle's build process directly on your machine, you can do so as follows:

Add the `--native-compilation` option to the command in the `build` property of your canister object in your `dfx.json` file, like this: `npx azle canister_name --native-compilation`.

Install prerequisites:

```bash
sudo apt-get update
sudo apt-get install clang
sudo apt-get install build-essential
```

Install Rust:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --default-toolchain=1.73.0 --profile=minimal
```

Install `wasm32-wasi`:

```bash
rustup target add wasm32-wasi
```

Install `wasi2ic`:

```bash
cargo install --git https://github.com/wasm-forge/wasi2ic --rev 806c3558aad24224852a9582f018178402cb3679
```

Download and rename `wasmedge-quickjs`:

```bash
mkdir -p ~/.config/azle
cd ~/.config/azle
git clone https://github.com/demergent-labs/wasmedge-quickjs
cd wasmedge-quickjs
git checkout c21ff69f442998e4cda4619166e23a9bc91418be
cd -
mv wasmedge-quickjs wasmedge-quickjs_$(npx azle@0.21.1 dockerfile-hash)
```

Keep in mind that much of this setup is Azle version-specific. The installation steps above are accurate as of version `0.21.1` of Azle. If your Azle project uses a different version of Azle then you might need to make changes to these instructions to ensure correct compilation and execution.

If you are struggling to get `--native-compilation` to work, it may be helpful for you to view the following files from the Azle repository:

-   [Dockerfile](https://github.com/demergent-labs/azle/blob/main/src/compiler/Dockerfile)
-   [test.yml](https://github.com/demergent-labs/azle/blob/main/.github/workflows/test.yml), search for `--native-compilation`
