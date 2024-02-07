import { join } from 'path';

export const GLOBAL_AZLE_WASMEDGE_QUICKJS_DIR =
    process.env.AZLE_WASMEDGE_QUICKJS_DIR ??
    join(process.cwd(), '.azle', 'wasmedge-quickjs');
