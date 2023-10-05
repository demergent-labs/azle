# Environment Variables

You can provide environment variables to Azle canisters by specifying their names in your `dfx.json` file and then using the `process.env` object in Azle. Be aware that the environment variables that you specify in your `dfx.json` file will be included in plain text in your canister's Wasm binary.

## dfx.json

Modify your `dfx.json` file with the `env` property to specify which environment variables you would like included in your Azle canister's binary. In this case, `CANISTER1_PRINCIPAL` and `CANISTER2_PRINCIPAL` will be included:

```json
{
    "canisters": {
        "canister1": {
            "type": "custom",
            "main": "src/canister1/index.ts",
            "build": "npx azle canister1",
            "candid": "src/canister1/index.did",
            "wasm": ".azle/canister1/canister1.wasm",
            "gzip": true,
            "declarations": {
                "output": "test/dfx_generated/canister1",
                "node_compatibility": true
            },
            "env": ["CANISTER1_PRINCIPAL", "CANISTER2_PRINCIPAL"]
        }
    }
}
```

## process.env

You can access the specified environment variables in Azle like so:

```typescript
import { Canister, query, text } from 'azle';

export default Canister({
    canister1PrincipalEnvVar: query([], text, () => {
        return (
            process.env.CANISTER1_PRINCIPAL ??
            'process.env.CANISTER1_PRINCIPAL is undefined'
        );
    }),
    canister2PrincipalEnvVar: query([], text, () => {
        return (
            process.env.CANISTER2_PRINCIPAL ??
            'process.env.CANISTER2_PRINCIPAL is undefined'
        );
    })
});
```
