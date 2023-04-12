import { resolve, join } from 'path';

import { version } from '../../../package.json';

export const GLOBAL_AZLE_CONFIG_DIR = resolve(
    require('os').homedir(),
    join('.config', 'azle', version)
);
export const GLOBAL_AZLE_BIN_DIR = join(GLOBAL_AZLE_CONFIG_DIR, 'bin');
export const GLOBAL_AZLE_TARGET_DIR = join(GLOBAL_AZLE_CONFIG_DIR, 'target');
