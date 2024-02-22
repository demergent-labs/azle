import { execSync, IOType } from 'child_process';
import { rmSync } from 'fs';

import { generateNewAzleProject } from './new_command';
import { version as azleVersion } from '../../package.json';
import { GLOBAL_AZLE_CONFIG_DIR } from './utils/global_paths';
import { uploadAssets } from './asset_uploader';

export function handleCli(
    stdioType: IOType,
    dockerfileHash: string,
    dockerContainerPrefix: string,
    dockerImagePrefix: string
): boolean {
    const commandName = process.argv[2];

    if (commandName === 'new') {
        handleCommandNew();

        return true;
    }

    if (commandName === 'dockerfile-hash') {
        handleCommandDockerfileHash(dockerfileHash);

        return true;
    }

    if (commandName === 'clean') {
        handleCommandClean(stdioType, dockerImagePrefix, dockerContainerPrefix);

        return true;
    }

    if (commandName === 'upload-assets') {
        handleUploadAssets();

        return true;
    }

    return false;
}

function handleCommandNew() {
    generateNewAzleProject(azleVersion);
}

function handleCommandDockerfileHash(dockerfileHash: string) {
    execSync(`echo -n "${dockerfileHash}"`, {
        stdio: 'inherit'
    });
}

function handleCommandClean(
    stdioType: IOType,
    dockerImagePrefix: string,
    dockerContainerPrefix: string
) {
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

    execSync(
        `podman stop $(podman ps --filter "name=${dockerContainerPrefix}" --format "{{.ID}}") || true`,
        {
            stdio: stdioType
        }
    );

    console.info(`azle containers stopped`);

    execSync(
        `podman rm $(podman ps -a --filter "name=${dockerContainerPrefix}" --format "{{.ID}}") || true`,
        {
            stdio: stdioType
        }
    );

    console.info(`azle containers removed`);

    execSync(
        `podman image rm $(podman images --filter "reference=${dockerImagePrefix}" --format "{{.ID}}") || true`,
        {
            stdio: stdioType
        }
    );

    console.info(`azle images removed`);
}

// TODO add a command that will let people call it and pass in their own without going to the command line

async function handleUploadAssets() {
    const canisterId = process.argv[3];
    const replicaWebServerPort = process.argv[4];
    await uploadAssets(canisterId, replicaWebServerPort);
}
