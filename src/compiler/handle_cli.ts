import { rmSync } from 'fs';

import { version as azleVersion } from '../../package.json';
import { uploadFiles } from './file_uploader';
import { getFilesToUpload } from './file_uploader/get_files_to_upload';
import { generateNewAzleProject } from './new_command';
import { GLOBAL_AZLE_CONFIG_DIR } from './utils/global_paths';

export function handleCli(): boolean {
    const commandName = process.argv[2];

    if (commandName === 'new') {
        handleCommandNew();

        return true;
    }

    if (commandName === 'clean') {
        handleCommandClean();

        return true;
    }

    if (commandName === 'upload-assets') {
        handleUploadAssets();

        return true;
    }

    if (commandName === '--version') {
        handleVersionCommand();

        return true;
    }

    return false;
}

function handleCommandNew(): void {
    generateNewAzleProject(azleVersion);
}

function handleCommandClean(): void {
    rmSync(GLOBAL_AZLE_CONFIG_DIR, {
        recursive: true,
        force: true
    });

    console.info(`~/.config/azle directory deleted`);

    rmSync('.azle', {
        recursive: true,
        force: true
    });

    console.info(`.azle directory deleted`);

    rmSync('.dfx', {
        recursive: true,
        force: true
    });

    console.info(`.dfx directory deleted`);

    rmSync('node_modules', {
        recursive: true,
        force: true
    });

    console.info(`node_modules directory deleted`);
}

async function handleUploadAssets(): Promise<void> {
    const canisterName = process.argv[3];
    const srcPath = process.argv[4];
    const destPath = process.argv[5];
    const filesToUpload = getFilesToUpload(canisterName, srcPath, destPath);
    await uploadFiles(canisterName, filesToUpload);
}

function handleVersionCommand(): void {
    console.info(azleVersion);
}
