import { readFileSync, writeFileSync } from 'fs';
import { copySync } from 'fs-extra/esm';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from './utils/global_paths';

export function generateNewAzleProject(azleVersion: string) {
    if (process.argv[3] === undefined) {
        console.error('You must provide a name for your Azle project');
        return;
    }

    const projectName = process.argv[3];

    copySync(join(AZLE_PACKAGE_PATH, 'examples', 'hello_world'), projectName);

    const packageJson = readFileSync(
        join(AZLE_PACKAGE_PATH, 'examples', 'hello_world', 'package.json')
    ).toString();

    let parsedPackageJson = JSON.parse(packageJson);

    parsedPackageJson.dependencies.azle = `^${azleVersion}`;

    writeFileSync(
        join(projectName, 'package.json'),
        JSON.stringify(parsedPackageJson, null, 4)
    );
}
