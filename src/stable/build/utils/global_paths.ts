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
    const envDir = process.env.AZLE_DFX_JSON_DIR;

    if (envDir !== undefined) {
        return envDir;
    }

    throw new Error('AZLE_DFX_JSON_DIR environment variable must be defined');
}

export function getDfxJsonPath(): string {
    return join(getDfxJsonDirPath(), 'dfx.json');
}
