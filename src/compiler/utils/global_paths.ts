import { homedir } from 'os';
import { join, resolve } from 'path';

export const GLOBAL_AZLE_CONFIG_DIR = resolve(
    homedir(),
    join('.config', 'azle')
);
