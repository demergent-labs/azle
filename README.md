DO NOT USE YET. INTERNAL DEVELOPMENT AND TESTING ONGOING. RELEASE IMMINENT.

# Azle

TypeScript CDK for the Internet Computer.

## Contributing

Not currently taking contributions. Please allow time for initial code architecture and governance/legal/token work to be put in place. Expect the ability to contribute to slowly pick up in the next month or so.

## Installation

npm install azle

## Use

See the examples in this respository.

Basically just update your `dfx.json` and use the normal commands like `dfx build`, `dfx deploy`, etc.

If you had one canister named `basic`, your `dfx.json` would look like this:

```json
{
    "canisters": {
        "basic": {
            "type": "custom",
            "build": "azle basic",
            "root": "canisters/basic",
            "js": "canisters/basic/app.js",
            "candid": "canisters/basic/app.did",
            "wasm": "target/wasm32-unknown-unknown/release/basic-optimized.wasm"
        }
    }
}
```

## License

Azle is licensed under the MIT license found in the LICENSE file. The copyright is intended to be assigned to the holders of the AZLE token found at canister id nlhft-2iaaa-aaaae-qaaua-cai on the Internet Computer. Full copyright assignment may require written and signed agreements which have not yet been implemented.

The AZLE token code and supply is currently controlled entirely by Jordan Last (lastmjs). The tentative plan is to decentralize the AZLE ownership, the AZLE canister, and the Azle repository over time. The repository for the AZLE token can be found here: https://github.com/lastmjs/extendable-token-azle