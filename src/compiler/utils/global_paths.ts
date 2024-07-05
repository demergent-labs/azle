import { homedir } from 'os';
import { join, resolve } from 'path';
import { dirname } from 'path';
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
