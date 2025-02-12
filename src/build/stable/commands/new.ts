import { readFile } from 'fs/promises';
import { outputFile } from 'fs-extra';
// @ts-ignore
import { copy } from 'fs-extra/esm';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../utils/global_paths';

export async function runCommand(
    azleVersion: string,
    templatePath: string
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

    await outputFile(
        join(projectName, 'package.json'),
        JSON.stringify(parsedPackageJson, null, 4)
    );

    const tsconfig = await readFile(
        join(AZLE_PACKAGE_PATH, 'tsconfig.dev.json')
    );

    await outputFile(
        join(projectName, 'tsconfig.json'),
        JSON.stringify(tsconfig, null, 4)
    );

    console.info(`${projectName} created successfully`);
}
