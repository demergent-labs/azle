import { join, resolve } from 'path';

export const GLOBAL_AZLE_CONFIG_DIR = resolve(
    require('os').homedir(),
    join('.config', 'azle')
);
