import { execSync, IOType } from 'child_process';
import { existsSync } from 'fs';

import { version as azleVersion } from '../../package.json';
import { yellow } from './utils/colors';

export function prepareDockerImage(
    stdioType: IOType,
    dockerImageName: string,
    dockerImagePathTar: string,
    dockerImagePathTarGz: string,
    dockerContainerName: string,
    wasmedgeQuickJsPath: string
) {
    initAndStartVm(stdioType);

    loadImage(
        stdioType,
        dockerImageName,
        dockerImagePathTar,
        dockerImagePathTarGz
    );

    createAndStartContainer(
        stdioType,
        dockerImageName,
        dockerContainerName,
        wasmedgeQuickJsPath
    );
}

function initAndStartVm(stdioType: IOType) {
    // TODO I believe this is necessary for Mac
    // TODO If they do not need this command always run
    // TODO for example after restarts, then perhaps
    // TODO we can remove this and just instruct the dev
    // TODO to run this command once before azle deploy
    // TODO like the have to do brew install podman

    // TODO detect mac and only run these commands on mac

    execSync(
        `if [ "$(uname -s)" != "Linux" ]; then podman machine init || true; fi`,
        {
            stdio: stdioType
        }
    );

    execSync(
        `if [ "$(uname -s)" != "Linux" ]; then podman machine start || true; fi`,
        {
            stdio: stdioType
        }
    );
}

function loadImage(
    stdioType: IOType,
    dockerImageName: string,
    dockerImagePathTar: string,
    dockerImagePathTarGz: string
) {
    const imageHasAlreadyBeenLoaded = hasImageAlreadyBeenLoaded(
        stdioType,
        dockerImageName
    );

    if (imageHasAlreadyBeenLoaded === true) {
        return;
    }

    const existingLocalImageLoaded = loadExistingLocalImage(
        dockerImagePathTar,
        dockerImagePathTarGz
    );

    if (existingLocalImageLoaded === true) {
        return;
    }

    if (process.env.AZLE_USE_DOCKERFILE === 'true') {
        buildAndLoadImageWithDockerfile(dockerImageName, dockerImagePathTar);
    } else {
        downloadAndLoadRemoteImage(
            dockerImageName,
            dockerImagePathTar,
            dockerImagePathTarGz
        );
    }
}

function hasImageAlreadyBeenLoaded(
    stdioType: IOType,
    dockerImageName: string
): boolean {
    try {
        execSync(`podman image inspect ${dockerImageName}`, {
            stdio: stdioType
        });

        return true;
    } catch (error) {
        return false;
    }
}

function loadExistingLocalImage(
    dockerImagePathTar: string,
    dockerImagePathTarGz: string
): boolean {
    if (existsSync(dockerImagePathTar)) {
        console.info(yellow(`\nLoading image...\n`));

        execSync(`podman load -i ${dockerImagePathTar}`, {
            stdio: 'inherit'
        });

        return true;
    }

    if (existsSync(dockerImagePathTarGz)) {
        console.info(yellow(`\nLoading image...\n`));

        execSync(`gzip -d ${dockerImagePathTarGz}`, {
            stdio: 'inherit'
        });

        execSync(`podman load -i ${dockerImagePathTar}`, {
            stdio: 'inherit'
        });

        return true;
    }

    return false;
}

function buildAndLoadImageWithDockerfile(
    dockerImageName: string,
    dockerImagePathTar: string
) {
    console.info(yellow(`\nBuilding image...\n`));

    execSync(
        `podman build -f ${__dirname}/Dockerfile -t ${dockerImageName} ${__dirname}`,
        {
            stdio: 'inherit'
        }
    );

    console.info(yellow(`\nSaving image...\n`));

    execSync(`podman save -o ${dockerImagePathTar} ${dockerImageName}`, {
        stdio: 'inherit'
    });

    console.info(yellow(`\nCompiling...`));
}

function downloadAndLoadRemoteImage(
    dockerImageName: string,
    dockerImagePathTar: string,
    dockerImagePathTarGz: string
) {
    console.info(yellow(`\nDownloading image...\n`));

    execSync(
        `curl -L -f https://github.com/demergent-labs/azle/releases/download/${azleVersion}/${dockerImageName}.tar.gz -o ${dockerImagePathTarGz}`,
        {
            stdio: 'inherit'
        }
    );

    loadExistingLocalImage(dockerImagePathTar, dockerImagePathTarGz);

    console.info(yellow(`\nCompiling...`));
}

function createAndStartContainer(
    stdioType: IOType,
    dockerImageName: string,
    dockerContainerName: string,
    wasmedgeQuickJsPath: string
) {
    execSync(
        `podman create --name ${dockerContainerName} ${dockerImageName} tail -f /dev/null || true`,
        { stdio: stdioType }
    );

    execSync(`podman start ${dockerContainerName}`, {
        stdio: stdioType
    });

    if (!existsSync(wasmedgeQuickJsPath)) {
        execSync(
            `podman cp ${dockerContainerName}:/wasmedge-quickjs ${wasmedgeQuickJsPath}`,
            { stdio: stdioType }
        );
    }
}
