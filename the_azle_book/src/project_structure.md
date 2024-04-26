# Project Structure TL;DR

Your project is just a directory with a `dfx.json` file that points to your `.ts` or `.js` entrypoint.

Here's what your directory structure might look like:

```
hello_world/
|
├── dfx.json
|
└── src/
    └── api.ts
```

And the corresponding `dfx.json` file:

```json
{
    "canisters": {
        "api": {
            "type": "custom",
            "main": "src/api.ts",
            "candid": "src/api.did",
            "candid_gen": "http",
            "build": "npx azle api",
            "wasm": ".azle/api/api.wasm",
            "gzip": true,
            "metadata": [
                {
                    "name": "candid:service",
                    "path": "src/api.did"
                },
                {
                    "name": "cdk:name",
                    "content": "azle"
                }
            ]
        }
    }
}
```

Once you have created this directory structure you can [deploy to mainnet](./deployment.md#deploying-to-mainnet) or a [locally running replica](./deployment.md#starting-the-local-replica) by running the `dfx deploy` command in the same directory as your `dfx.json` file.
