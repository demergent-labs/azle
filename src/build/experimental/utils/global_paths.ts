import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../../stable/utils/global_paths';

export const EXPERIMENTAL_CANISTER_TEMPLATE_PATH = join(
    AZLE_PACKAGE_PATH,
    'canister_templates',
    'experimental.wasm'
);
