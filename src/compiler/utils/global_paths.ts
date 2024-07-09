import { homedir } from 'os';
import { join, resolve } from 'path';

export const GLOBAL_AZLE_CONFIG_DIR = resolve(
    homedir(),
    join('.config', 'azle')
);

export const AZLE_PACKAGE_PATH =
    require.main?.path ??
    ((): never => {
        throw new Error(`Azle: azle package path cannot be undefined`);
    })();
