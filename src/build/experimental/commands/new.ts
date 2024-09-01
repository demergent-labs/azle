import { readFile } from 'fs/promises';
import { outputFile } from 'fs-extra';
// @ts-ignore
import { copy } from 'fs-extra/esm';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../../stable/utils/global_paths';

export async function runCommand(azleVersion: string): Promise<void> {
    if (process.argv[3] === undefined) {
        console.error('You must provide a name for your Azle project');
        return;
    }

    const projectName = process.argv[3];
    const flag = process.argv[4];

    const path =
        flag === '--http-server'
            ? join(AZLE_PACKAGE_PATH, 'examples', 'hello_world')
            : join(AZLE_PACKAGE_PATH, 'examples', 'hello_world_candid_rpc');

    await copy(path, projectName);

    const packageJson = (await readFile(join(path, 'package.json'))).toString();

    let parsedPackageJson = JSON.parse(packageJson);

    parsedPackageJson.dependencies.azle = `^${azleVersion}`;

    await outputFile(
        join(projectName, 'package.json'),
        JSON.stringify(parsedPackageJson, null, 4)
    );
}
