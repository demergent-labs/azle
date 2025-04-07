import { rm } from 'fs/promises';
import { join } from 'path';

import { getDfxRoot } from '#utils/global_paths';

export async function runCommand(): Promise<void> {
    const dotAzlePath = join(getDfxRoot(), '.azle');

    await rm(dotAzlePath, {
        recursive: true,
        force: true
    });

    console.info(`${dotAzlePath} directory deleted`);
}
