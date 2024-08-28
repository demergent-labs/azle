if (globalThis._azleExperimental !== true) {
    const importName = getImportName();

    throw new Error(experimentalMessage(importName));
}

function getImportName(): string {
    if (import.meta.url.includes('azle/src/lib/experimental')) {
        return 'azle/experimental';
    }

    throw new Error(
        `Azle: Experimental import name for module path ${
            import.meta.url
        } has not been created`
    );
}

function experimentalMessage(importName: string): string {
    return `Azle: experimental mode must be enabled to import from ${importName}. You can enable experimental mode in your dfx.json file like this:
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
