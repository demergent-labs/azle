import { rm } from 'fs/promises';

import { GLOBAL_AZLE_CONFIG_DIR } from '../utils/global_paths';

export async function runCommand(): Promise<void> {
    await rm(GLOBAL_AZLE_CONFIG_DIR, {
        recursive: true,
        force: true
    });

    console.info(`~/.config/azle directory deleted`);

    await rm('.azle', {
        recursive: true,
        force: true
    });

    console.info(`.azle directory deleted`);

    await rm('.dfx', {
        recursive: true,
        force: true
    });

    console.info(`.dfx directory deleted`);

    await rm('node_modules', {
        recursive: true,
        force: true
    });

    console.info(`node_modules directory deleted`);
}
