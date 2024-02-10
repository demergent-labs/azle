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
    const imageHasBeenLoaded = hasImageBeenLoaded(dockerImageName, stdioType);

    if (process.env.AZLE_USE_DOCKERFILE === 'true') {
        try {
            if (!imageHasBeenLoaded) {
                if (existsSync(dockerImagePathTar)) {
                    console.info(yellow(`\nLoading image...\n`));

                    execSync(`podman load -i ${dockerImagePathTar}`, {
                        stdio: 'inherit'
                    });
                } else if (existsSync(dockerImagePathTarGz)) {
                    console.info(yellow(`\nLoading image...\n`));

                    execSync(`podman load -i ${dockerImagePathTarGz}`, {
                        stdio: 'inherit'
                    });
                } else {
                    throw new Error(
                        `${dockerImagePathTar} or ${dockerImagePathTarGz} does not exist`
                    );
                }
            }
        } catch (error) {
            console.info(yellow(`\nBuilding image...\n`));

            execSync(
                `podman build -f ${__dirname}/Dockerfile -t ${dockerImageName} ${__dirname}`,
                {
                    stdio: 'inherit'
                }
            );

            console.info(yellow(`\nSaving image...\n`));

            execSync(
                `podman save -o ${dockerImagePathTar} ${dockerImageName}`,
                {
                    stdio: 'inherit'
                }
            );

            console.info(yellow(`\nCompiling...`));
        }
    } else {
        try {
            if (!imageHasBeenLoaded) {
                if (existsSync(dockerImagePathTar)) {
                    console.info(yellow(`\nLoading image...\n`));

                    execSync(`podman load -i ${dockerImagePathTar}`, {
                        stdio: 'inherit'
                    });
                } else if (existsSync(dockerImagePathTarGz)) {
                    console.info(yellow(`\nLoading image...\n`));

                    execSync(`podman load -i ${dockerImagePathTarGz}`, {
                        stdio: 'inherit'
                    });
                } else {
                    throw new Error(
                        `${dockerImagePathTar} or ${dockerImagePathTarGz} does not exist`
                    );
                }
            }
        } catch (error) {
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
    }

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

function hasImageBeenLoaded(
    dockerImageName: string,
    stdioType: IOType
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
