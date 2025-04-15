import { cp, mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

import { AZLE_ROOT } from '#utils/global_paths';

import { devDependencies } from '../../../../package.json';

export async function runCommand(
    azleVersion: string,
    templatePath: string,
    useExperimentalDecorators?: boolean
): Promise<void> {
    if (process.argv[3] === undefined) {
        throw new Error(`You must provide a name for your Azle project`);
    }

    const projectName = process.argv[3];

    await cp(templatePath, projectName, { recursive: true });

    const packageJsonPath = join(projectName, 'package.json');
    const packageJsonContent = (
        await readFile(join(templatePath, 'package.json'))
    ).toString();

    let parsedPackageJson = JSON.parse(packageJsonContent);

    parsedPackageJson.dependencies.azle = `^${azleVersion}`;
    parsedPackageJson.devDependencies = {
        ...parsedPackageJson.devDependencies,
        jest: devDependencies.jest,
        'ts-jest': devDependencies['ts-jest']
    };

    await mkdir(dirname(packageJsonPath), { recursive: true });
    await writeFile(
        packageJsonPath,
        JSON.stringify(parsedPackageJson, null, 4)
    );

    const tsConfigPath = join(projectName, 'tsconfig.json');
    const tsConfigTemplatePath = join(AZLE_ROOT, 'tsconfig.dev.json');
    let tsConfig = JSON.parse(
        await readFile(tsConfigTemplatePath, {
            encoding: 'utf-8'
        })
    );

    if (useExperimentalDecorators === true) {
        tsConfig.compilerOptions.experimentalDecorators =
            useExperimentalDecorators;
    }

    await mkdir(dirname(tsConfigPath), { recursive: true });
    await writeFile(tsConfigPath, JSON.stringify(tsConfig, null, 4));

    console.info(`${projectName} created successfully`);
}
