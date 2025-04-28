import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Determines the dfx root (directory containing the dfx.json file) for the current project.
 * First checks the AZLE_DFX_ROOT environment variable.
 * If not defined, looks for dfx.json in the current working directory.
 *
 * @returns {string} The absolute path to the directory containing the dfx.json file
 * @throws {Error} If AZLE_DFX_ROOT environment variable is not defined and dfx.json is not found in the current directory
 */
export function getDfxRoot(): string {
    if (process.env.AZLE_DFX_ROOT !== undefined) {
        return process.env.AZLE_DFX_ROOT;
    }

    if (existsSync(join(process.cwd(), 'dfx.json'))) {
        return process.cwd();
    }

    throw new Error(
        'Unable to locate the dfx.json file. There must be a dfx.json file in the current working directory or the AZLE_DFX_ROOT environment variable must be defined'
    );
}

/**
 * Gets the absolute path to the dfx.json file.
 *
 * @returns {string} The absolute path to the dfx.json file
 * @throws {Error} If the dfx.json directory cannot be determined (inherited from getDfxRoot)
 */
export function getDfxJsonPath(): string {
    return join(getDfxRoot(), 'dfx.json');
}
