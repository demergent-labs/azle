import { rm } from 'fs/promises';
import { join } from 'path';

import { getDfxRoot } from '#utils/global_paths';

export async function runCommand(): Promise<void> {
    await rm(join(getDfxRoot(), '.azle'), {
        recursive: true,
        force: true
    });

    console.info(`${join(getDfxRoot(), '.azle')} directory deleted`);
}
