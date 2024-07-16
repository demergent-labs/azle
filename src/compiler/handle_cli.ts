import { IOType } from 'child_process';
import { rm } from 'fs/promises';
import { join } from 'path';

import { version as azleVersion } from '../../package.json';
import { uploadFiles } from './file_uploader';
import { getFilesToUpload } from './file_uploader/get_files_to_upload';
import { generateNewAzleProject } from './new_command';
import { getStdIoType } from './utils';
import { execSyncPretty } from './utils/exec_sync_pretty';
import {
    AZLE_PACKAGE_PATH,
    GLOBAL_AZLE_CONFIG_DIR
} from './utils/global_paths';

export async function handleCli(): Promise<boolean> {
    const commandName = process.argv[2];

    if (commandName === 'new') {
        await handleCommandNew();

        return true;
    }

    if (commandName === 'clean') {
        await handleCommandClean();

        return true;
    }

    if (commandName === 'upload-assets') {
        await handleUploadAssets();

        return true;
    }

    if (commandName === '--version') {
        handleVersionCommand();

        return true;
    }

    if (commandName === 'install-dfx-extension') {
        installDfxExtension(getStdIoType());

        return true;
    }

    return false;
}

async function handleCommandNew(): Promise<void> {
    await generateNewAzleProject(azleVersion);
}

async function handleCommandClean(): Promise<void> {
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

async function handleUploadAssets(): Promise<void> {
    const canisterName = process.argv[3];
    const srcPath = process.argv[4];
    const destPath = process.argv[5];
    const filesToUpload = await getFilesToUpload(
        canisterName,
        srcPath,
        destPath
    );
    await uploadFiles(canisterName, filesToUpload);
}

function handleVersionCommand(): void {
    console.info(azleVersion);
}

// TODO this is just temporary
// TODO until we either make azle an official extension in the DFINITY dfx extensions repo
// TODO or we have a better way for the developer to install the extension locally
function installDfxExtension(stdioType: IOType): void {
    const dfxExtensionDirectoryPath = join(AZLE_PACKAGE_PATH, 'dfx_extension');
    execSyncPretty(
        `cd ${dfxExtensionDirectoryPath} && ./install.sh`,
        stdioType
    );
}
