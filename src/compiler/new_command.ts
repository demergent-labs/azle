import { readFile, writeFile } from 'fs/promises';
// @ts-ignore
import { copy } from 'fs-extra/esm';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from './utils/global_paths';

export async function generateNewAzleProject(
    azleVersion: string
): Promise<void> {
    if (process.argv[3] === undefined) {
        console.error('You must provide a name for your Azle project');
        return;
    }

    const projectName = process.argv[3];

    await copy(join(AZLE_PACKAGE_PATH, 'examples', 'hello_world'), projectName);

    const packageJson = (
        await readFile(
            join(AZLE_PACKAGE_PATH, 'examples', 'hello_world', 'package.json')
        )
    ).toString();

    let parsedPackageJson = JSON.parse(packageJson);

    parsedPackageJson.dependencies.azle = `^${azleVersion}`;

    await writeFile(
        join(projectName, 'package.json'),
        JSON.stringify(parsedPackageJson, null, 4)
    );
}
