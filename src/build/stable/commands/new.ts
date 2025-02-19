import { readFile } from 'fs/promises';
import { outputFile } from 'fs-extra';
// @ts-ignore
import { copy } from 'fs-extra/esm';
import { join } from 'path';

import { devDependencies } from '../../../../package.json';
import { AZLE_PACKAGE_PATH } from '../utils/global_paths';

export async function runCommand(
    azleVersion: string,
    templatePath: string,
    useExperimentalDecorators?: boolean
): Promise<void> {
    if (process.argv[3] === undefined) {
        throw new Error(`You must provide a name for your Azle project`);
    }

    const projectName = process.argv[3];

    await copy(templatePath, projectName);

    const packageJson = (
        await readFile(join(templatePath, 'package.json'))
    ).toString();

    let parsedPackageJson = JSON.parse(packageJson);

    parsedPackageJson.dependencies.azle = `^${azleVersion}`;
    parsedPackageJson.devDependencies = {
        ...parsedPackageJson.devDependencies,
        jest: devDependencies.jest,
        'ts-jest': devDependencies['ts-jest']
    };

    await outputFile(
        join(projectName, 'package.json'),
        JSON.stringify(parsedPackageJson, null, 4)
    );

    let tsConfig = JSON.parse(
        await readFile(join(AZLE_PACKAGE_PATH, 'tsconfig.dev.json'), {
            encoding: 'utf-8'
        })
    );

    if (useExperimentalDecorators === true) {
        tsConfig.compilerOptions.experimentalDecorators =
            useExperimentalDecorators;
    }

    await outputFile(
        join(projectName, 'tsconfig.json'),
        JSON.stringify(tsConfig, null, 4)
    );

    console.info(`${projectName} created successfully`);
}
