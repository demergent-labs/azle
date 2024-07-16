import { homedir } from 'os';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

export const GLOBAL_AZLE_CONFIG_DIR = resolve(
    homedir(),
    join('.config', 'azle')
);

export const AZLE_PACKAGE_PATH = join(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..'
);

export const STATIC_CANISTER_TEMPLATE_PATH = join(
    AZLE_PACKAGE_PATH,
    `static_canister_template.wasm`
);
