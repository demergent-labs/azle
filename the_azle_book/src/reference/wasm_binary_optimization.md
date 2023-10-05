# Wasm Binary Optimization

The IC currently limits Wasm binaries to a relatively small size of ~2MiB (with some caveats). You are likely to hit this limit as your Azle canisters grow in size. Azle provides some automatic optimizations to help you deal with this limit. It is hoped that the IC-imposed limit will be greatly increased sometime in 2023.

To optimize the Wasm binary of an Azle canister, you can add the `opt_level` property to your `dfx.json` with the following options: `"0"`, `"1"`, `"2"`, `"3"`, or `"4"`. `"0"` is the default option if `opt_level` is not specified.

Each option is intended to reduce the size of your Wasm binary as the value increases. Each option is likely to take longer to compile than the previous option. It is recommended to start at `"1"` and increase only as necessary.

Here's an example using `opt_level` `"1"`:

```json
{
    "canisters": {
        "hello_world": {
            "type": "custom",
            "main": "src/index.ts",
            "build": "npx azle hello_world",
            "candid": "src/index.did",
            "wasm": ".azle/hello_world/hello_world.wasm.gz",
            "opt_level": "1"
        }
    }
}
```
