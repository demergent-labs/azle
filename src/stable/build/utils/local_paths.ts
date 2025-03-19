import { join } from 'path';

export const AZLE_DFX_JSON_DIR = process.env.AZLE_DFX_JSON_DIR || process.cwd(); // TODO: should we throw if not defined? or assume cwd?

export const AZLE_DFX_JSON_PATH = join(AZLE_DFX_JSON_DIR, 'dfx.json');
