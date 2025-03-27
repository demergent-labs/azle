import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const AZLE_PACKAGE_PATH = join(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..',
    '..'
);

export const AZLE_CARGO_TARGET_DIR = join(AZLE_PACKAGE_PATH, 'target');

export const STABLE_STATIC_CANISTER_TEMPLATE_PATH = join(
    AZLE_PACKAGE_PATH,
    'dist',
    'canister_templates',
    'stable.wasm'
);

/**
 * The directory containing the dfx.json file.
 * @throws {Error} If AZLE_DFX_JSON_DIR environment variable is not defined
 */
export function getDfxJsonDirPath(): string {
    if (process.env.AZLE_DFX_JSON_DIR !== undefined) {
        return process.env.AZLE_DFX_JSON_DIR;
    }

    if (existsSync(join(process.cwd(), 'dfx.json'))) {
        return process.cwd();
    }

    throw new Error(
        'Unable to locate the dfx.json file. AZLE_DFX_JSON_DIR environment variable must be defined'
    );
}

export function getDfxJsonPath(): string {
    return join(getDfxJsonDirPath(), 'dfx.json');
}
