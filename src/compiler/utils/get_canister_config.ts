import { existsSync, readFileSync } from 'fs';

import { red, yellow, green, blue, purple } from './colors';
import { Err, Ok, Result } from './result';
import { AzleError, DfxJson, JSCanisterConfig } from './types';

export function getCanisterConfig(
    canisterName: string
): Result<JSCanisterConfig, AzleError> {
    const exampleDfxJson = colorFormattedDfxJsonExample(canisterName);

    if (!existsSync(`dfx.json`)) {
        return Err({
            error: 'Missing dfx.json',
            suggestion: `Create a dfx.json file in the current directory with the following format:\n\n${exampleDfxJson}`,
            exitCode: 2
        });
    }

    const dfxJson: DfxJson = JSON.parse(readFileSync('dfx.json').toString());
    const canisterConfig = dfxJson.canisters[canisterName];

    if (!canisterConfig) {
        return Err({
            error: `Unable to find canister "${canisterName}" in ./dfx.json`,
            suggestion: `Make sure your dfx.json contains an entry for "${canisterName}". For example:\n\n${exampleDfxJson}`,
            exitCode: 3
        });
    }

    const { main, candid } = canisterConfig;

    if (!main || !candid) {
        const missingFields = [
            ['"main"', main],
            ['"candid"', candid]
        ]
            .filter(([_, value]) => !value)
            .map(([field, _]) => field);
        const fieldOrFields = missingFields.length == 1 ? 'field' : 'fields';
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
                ${red('"type"')}: ${green('"custom"')},
                ${red('"main"')}: ${green('"src/index.ts"')},
                ${red('"build"')}: ${green(`"npx azle ${canisterName}"`)},
                ${red('"candid"')}: ${green('"src/index.did"')},
                ${red('"wasm"')}: ${green(
                    `".azle/${canisterName}/${canisterName}.wasm"`
                )},
            ${blue('}')}
        ${purple('}')}
    ${yellow('}')}`;
}
