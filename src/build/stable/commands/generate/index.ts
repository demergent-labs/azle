import { readFile } from 'fs/promises';

import { candid_to_ts_js } from './rust/candid_to_ts_js/pkg/candid_to_ts_js';

export async function runCommand(candidPath: string): Promise<void> {
    const candid = await readFile(candidPath, 'utf-8');
    const result = candid_to_ts_js(candid);

    process.stdout.write(result);
}
