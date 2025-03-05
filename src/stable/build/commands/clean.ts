import { rm } from 'fs/promises';

export async function runCommand(): Promise<void> {
    await rm('./.azle', {
        recursive: true,
        force: true
    });

    console.info(`./.azle directory deleted`);

    await rm('./.dfx', {
        recursive: true,
        force: true
    });

    console.info(`./.dfx directory deleted`);

    await rm('./node_modules', {
        recursive: true,
        force: true
    });

    console.info(`./node_modules directory deleted`);
}
