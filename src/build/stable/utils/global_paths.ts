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
    'canister_templates',
    'stable.wasm'
);
