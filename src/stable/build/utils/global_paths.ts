import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

export const AZLE_ROOT = join(
    dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..',
    '..'
);

export const AZLE_CARGO_TARGET_DIR = join(AZLE_ROOT, 'target');

export const STABLE_STATIC_CANISTER_TEMPLATE_PATH = join(
    AZLE_ROOT,
    'dist',
    'canister_templates',
    'stable.wasm'
);
