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

For an HTTP server canister this would be the simplest corresponding `dfx.json` file:

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts"
        }
    }
}
```

For a Candid RPC canister this would be the simplest corresponding `dfx.json` file:

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "candid_gen": "automatic"
        }
    }
}
```

Once you have created this directory structure you can [deploy to mainnet](./deployment.md#deploying-to-mainnet) or a [locally running replica](./deployment.md#starting-the-local-replica) by running the `dfx deploy` command in the same directory as your `dfx.json` file.

## dfx.json

The `dfx.json` file is the main ICP-specific configuration file for your canisters. The following are various examples of `dfx.json` files.

### Automatic Candid File Generation

The command-line tools `dfx` require a Candid file to deploy your canister. HTTP server canisters will automatically have their Candid files generated and stored in the `.azle` directory without any extra property in the `dfx.json` file. Candid RPC canisters must specify `"candid_gen": "automatic"` for their Candid files to be generated automatically in the `.azle` directory:

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "candid_gen": "automatic"
        }
    }
}
```

### Custom Candid File

If you would like to provide your own custom Candid file you can specify `"candid_gen": "custom"`:

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "candid": "src/api.did",
            "candid_gen": "custom"
        }
    }
}
```

### Environment Variables

You can provide environment variables to Azle canisters by specifying their names in your `dfx.json` file and then accessing them through the `process.env` object in Azle.

You must provide the environment variables that you want included in the same process as your `dfx deploy` command.

Be aware that the environment variables that you specify in your `dfx.json` file will be included in plain text in your canister's Wasm binary.

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "env": ["MY_ENVIRONMENT_VARIABLE"]
        }
    }
}
```

### Assets

See [the Assets chapter](./assets.md) for more information:

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "assets": [
                ["src/frontend/dist", "dist"],
                ["src/backend/media/audio.ogg", "media/audio.ogg"],
                ["src/backend/media/video.ogv", "media/video.ogv"]
            ]
        }
    }
}
```

### Assets Large

See [the Assets chapter](./assets.md) for more information:

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "assets_large": [
                ["assets/auto", "assets"],
                ["assets/permanent", "assets"],
                ["assets/single_asset.txt", "assets/text/single.txt"]
            ]
        }
    }
}
```

### Build Assets

See [the Assets chapter](./assets.md) for more information:

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "assets": [
                ["src/frontend/dist", "dist"],
                ["src/backend/media/audio.ogg", "media/audio.ogg"],
                ["src/backend/media/video.ogv", "media/video.ogv"]
            ],
            "build_assets": "npm run build"
        }
    }
}
```

### ESM Externals

This will instruct Azle's TypeScript/JavaScript build process to ignore bundling the provided named packages.

Sometimes the build process is overly eager to include packages that won't actually be used at runtime. This can be a problem if those packages wouldn't even work at runtime due to limitations in ICP or Azle. It is thus useful to be able to exclude them:

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "esm_externals": ["@nestjs/microservices", "@nestjs/websockets"]
        }
    }
}
```

### ESM Aliases

This will instruct Azle's TypeScript/JavaScript build process to alias a package name to another pacakge name.

This can be useful if you need to polyfill certain packages that might not exist in Azle:

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "esm_aliases": {
                "crypto": "crypto-browserify"
            }
        }
    }
}
```

### Opt Level

To optimize the Wasm binary of an Azle canister, you can add the `opt_level` property to your `dfx.json` with the following options: `"0"`, `"1"`, `"2"`, `"3"`, or `"4"`. `"0"` is the default option if `opt_level` is not specified.

Each option is intended to reduce the size of your Wasm binary as the value increases. Each option is likely to take longer to compile than the previous option. It is recommended to start at `"1"` and increase only as necessary.

```json
{
    "canisters": {
        "api": {
            "type": "azle",
            "main": "src/api.ts",
            "opt_level": "4"
        }
    }
}
```
