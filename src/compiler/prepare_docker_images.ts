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
    buildAndLoadImage(
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

function buildAndLoadImage(
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
        buildAndLoadRemoteImage(dockerImageName, dockerImagePathTarGz);
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

        execSync(`podman load -i ${dockerImagePathTarGz}`, {
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

function buildAndLoadRemoteImage(
    dockerImageName: string,
    dockerImagePathTarGz: string
) {
    console.info(yellow(`\nDownloading image...\n`));

    execSync(
        `curl -L https://github.com/demergent-labs/azle/releases/download/${azleVersion}/${dockerImageName}.tar.gz -o ${dockerImagePathTarGz}`,
        {
            stdio: 'inherit'
        }
    );

    console.info(yellow(`\nLoading image...\n`));

    execSync(`podman load -i ${dockerImagePathTarGz}`, {
        stdio: 'inherit'
    });

    console.info(yellow(`\nCompiling...`));
}

function createAndStartContainer(
    stdioType: IOType,
    dockerImageName: string,
    dockerContainerName: string,
    wasmedgeQuickJsPath: string
) {
    execSync(
        `podman inspect ${dockerContainerName} || podman create --name ${dockerContainerName} ${dockerImageName} tail -f /dev/null`,
        { stdio: stdioType }
    );

    execSync(`podman start ${dockerContainerName}`, {
        stdio: stdioType
    });

    execSync(
        `podman cp ${dockerContainerName}:/wasmedge-quickjs ${wasmedgeQuickJsPath}`,
        { stdio: stdioType }
    );
}
