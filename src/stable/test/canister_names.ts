import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { getDfxRoot } from '#utils/dfx_root';
import { DfxJson } from '#utils/types';

/**
 * Returns the names of all canisters defined in the dfx.json file of the current project.
 *
 * @param onlyAzle - If true, only returns canisters of type 'azle'. If false, returns all canisters. Defaults to true.
 */
export async function getCanisterNames(
    onlyAzle: boolean = true
): Promise<string[]> {
    const dfxJson = await getDfxJson();

    if (dfxJson.canisters === undefined) {
        throw new Error('No canisters found in dfx.json');
    }

    return Object.entries(dfxJson.canisters)
        .filter(([_, value]) => {
            if (onlyAzle === false) {
                return true;
            }

            return value?.type === 'azle';
        })
        .map(([key, _]) => key);
}

async function getDfxJson(): Promise<DfxJson> {
    const dfxFile = await readFile(join(getDfxRoot(), 'dfx.json'), 'utf-8');

    return JSON.parse(dfxFile);
}
