import { join, resolve } from 'path';
import { version as azleVersion } from '../../../package.json';

export const GLOBAL_AZLE_CONFIG_DIR = resolve(
    require('os').homedir(),
    join('.config', 'azle')
);

export const GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR =
    process.env.AZLE_WASMEDGE_QUICKJS_DIR ??
    join(GLOBAL_AZLE_CONFIG_DIR, `wasmedge-quickjs_${azleVersion}`);
