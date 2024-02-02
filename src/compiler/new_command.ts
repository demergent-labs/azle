import { copySync, readFileSync, writeFileSync } from 'fs-extra';
import { join } from 'path';

export function generateNewAzleProject(azleVersion: string) {
    if (process.argv[3] === undefined) {
        console.error('You must provide a name for your Azle project');
        return;
    }

    const projectName = process.argv[3];

    if (require.main?.path === undefined) {
        throw new Error(`require.main?.path must be defined`);
    }

    copySync(join(require.main?.path, 'examples', 'hello_world'), projectName);

    const packageJson = readFileSync(
        join(require.main?.path, 'examples', 'hello_world', 'package.json')
    ).toString();

    let parsedPackageJson = JSON.parse(packageJson);

    parsedPackageJson.dependencies.azle = `^${azleVersion}`;

    writeFileSync(
        join(projectName, 'package.json'),
        JSON.stringify(parsedPackageJson, null, 4)
    );
}
