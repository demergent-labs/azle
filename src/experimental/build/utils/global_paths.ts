import { createRequire } from 'module';
import { dirname, join } from 'path';

import { AZLE_ROOT } from '#utils/global_paths';

export const EXPERIMENTAL_STATIC_CANISTER_TEMPLATE_PATH = join(
    AZLE_ROOT,
    'dist',
    'canister_templates',
    'experimental.wasm'
);

export const WASMEDGE_QUICKJS_PATH = dirname(
    createRequire(import.meta.url).resolve('wasmedge_quickjs/package.json')
);
