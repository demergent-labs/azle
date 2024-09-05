export function experimentalMessageDfxJson(description: string): string {
    return `Azle: Experimental mode must be enabled to use ${description}. You can enable experimental mode in your dfx.json file like this:
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

export function experimentalMessageCli(description: string): string {
    return `Azle: Experimental mode must be enabled to use ${description}. You can enable experimental mode with the --experimental flag`;
}
