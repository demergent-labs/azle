import { readFile } from 'fs/promises';
import { outputFile } from 'fs-extra';
// @ts-ignore
import { copy } from 'fs-extra/esm';
import { join } from 'path';

export async function runCommand(
    azleVersion: string,
    templatePath: string
): Promise<void> {
    if (process.argv[3] === undefined) {
        console.error('You must provide a name for your Azle project');
        return;
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

    console.info(`${projectName} created successfully`);
}
