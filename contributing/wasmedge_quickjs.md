To develop locally you will need to do the following:

1. Set the `AZLE_WASMEDGE_QUICKJS_DIR` environment variable on deploy or test to the location of your locally cloned `wasmedge-quickjs`.

2. Change the `wasmedge_quickjs` dependency in `azle/src/compiler/rust/canister/Cargo.toml` to the location of your locally cloned `wasmedge-quickjs`.

3. When you are ready to commit your changes, make sure to update `azle/src/compiler/Dockerfile` with the new git commit hash of the `wasmedge-quickjs` repository. To use the new `Dockerfile` run `npx azle clean` and deploy with the `AZLE_USE_DOCKERFILE=true` environment variable
