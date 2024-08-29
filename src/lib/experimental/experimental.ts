if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage());
}

function experimentalMessage(): string {
    return `Azle: experimental mode must be enabled to import from azle/experimental. You can enable experimental mode in your dfx.json file like this:
{
    "canisters": {
        "canisterName": {
            "type": "azle",
            "main": "index.ts",
            "custom": {
                "experimental": true
            }
        }
    }
}
`;
}
