import { existsSync } from 'fs';
import { readFile } from 'fs/promises';

import { blue, green, purple, red, yellow } from './colors';
import { Err, Ok, Result } from './result';
import { AzleError, CanisterConfig, DfxJson } from './types';

export async function getCanisterConfig(
    canisterName: string
): Promise<Result<CanisterConfig, AzleError>> {
    const exampleDfxJson = colorFormattedDfxJsonExample(canisterName);

    if (!existsSync(`dfx.json`)) {
        return Err({
            error: 'Missing dfx.json',
            suggestion: `Create a dfx.json file in the current directory with the following format:\n\n${exampleDfxJson}`,
            exitCode: 2
        });
    }

    const dfxJson: DfxJson = JSON.parse(
        (await readFile('dfx.json')).toString()
    );
    const canisterConfig = dfxJson.canisters[canisterName];

    if (!canisterConfig) {
        return Err({
            error: `Unable to find canister "${canisterName}" in ./dfx.json`,
            suggestion: `Make sure your dfx.json contains an entry for "${canisterName}". For example:\n\n${exampleDfxJson}`,
            exitCode: 3
        });
    }

    const { main } = canisterConfig;

    if (main === undefined) {
        const missingFields = [['"main"', main]]
            .filter(([_, value]) => !value)
            .map(([field, _]) => field);
        const fieldOrFields = missingFields.length === 1 ? 'field' : 'fields';
        const missingFieldNames = missingFields.join(', ');
        return Err({
            error: `Missing ${fieldOrFields} ${missingFieldNames} in ./dfx.json`,
            suggestion: `Make sure your dfx.json looks similar to the following:\n\n${exampleDfxJson}`,
            exitCode: 4
        });
    }

    return Ok(canisterConfig);
}

function colorFormattedDfxJsonExample(canisterName: string): string {
    return `    ${yellow('{')}
        ${red('"canisters"')}: ${purple('{')}
            ${red(`"${canisterName}"`)}: ${blue('{')}
                ${red('"type"')}: ${green('"azle"')},
                ${red('"main"')}: ${green('"src/index.ts"')}
            ${blue('}')}
        ${purple('}')}
    ${yellow('}')}`;
}
