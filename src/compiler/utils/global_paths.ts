import { resolve, join } from 'path';

import { rust_version } from '../../../package.json';

export const GLOBAL_AZLE_CONFIG_DIR = resolve(
    require('os').homedir(),
    join('.config', 'azle')
);
export const GLOBAL_AZLE_RUST_DIR = join(GLOBAL_AZLE_CONFIG_DIR, rust_version);
export const GLOBAL_AZLE_BIN_DIR = join(GLOBAL_AZLE_RUST_DIR, 'bin');
export const GLOBAL_AZLE_TARGET_DIR = join(GLOBAL_AZLE_CONFIG_DIR, 'target');
