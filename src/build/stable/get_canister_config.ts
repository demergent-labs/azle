import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

import { EnvVars } from './compile/utils/types';

type DfxJson = {
    canisters?: {
        [key: string]: CanisterConfig | undefined;
    };
};

export type CanisterConfig = {
    main?: string;
    custom?: {
        assets?: [string, string][];
        candid_gen?: CandidGen;
        env?: EnvVars;
        experimental?: boolean;
    };
};

type CandidGen = 'automatic' | 'custom';

export async function getCanisterConfig(
    canisterName: string
): Promise<CanisterConfig> {
    const dfxJsonExample = getDfxJsonExample(canisterName);

    if (!existsSync(`dfx.json`)) {
        throw new Error(
            `Create a dfx.json file in the current directory with the following format:\n\n${dfxJsonExample}`
        );
    }

    const dfxJson: DfxJson = JSON.parse(
        (await readFile('dfx.json')).toString()
    );
    const canisterConfig = dfxJson.canisters?.[canisterName];

    if (canisterConfig === undefined) {
        throw new Error(
            `Make sure your dfx.json contains a property for "${canisterName}". For example:\n\n${dfxJsonExample}`
        );
    }

    if (canisterConfig.main === undefined) {
        throw new Error(
            `Make sure your dfx.json contains a property for "main". For example:\n\n${dfxJsonExample}`
        );
    }

    return canisterConfig;
}

function getDfxJsonExample(canisterName: string): string {
    return `{
    "canisters": {
        "${canisterName}": {
            "type": "azle",
            "main": "index.ts",
            "custom": {
                "candid_gen": "automatic"
            }
        }
    }
}
`;
}
