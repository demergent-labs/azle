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

    const templatePackageJsonString = await readFile(
        join(templatePath, 'package.json'),
        {
            encoding: 'utf-8'
        }
    );

    let packageJson = JSON.parse(templatePackageJsonString);

    packageJson.dependencies.azle = `^${azleVersion}`;
    packageJson.devDependencies = {
        ...packageJson.devDependencies,
        jest: devDependencies.jest,
        'ts-jest': devDependencies['ts-jest']
    };

    const packageJsonPath = join(projectName, 'package.json');
    await mkdir(dirname(packageJsonPath), { recursive: true });
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 4));

    const templateTsConfigString = await readFile(
        join(AZLE_ROOT, 'tsconfig.dev.json'),
        { encoding: 'utf-8' }
    );

    let tsConfig = JSON.parse(templateTsConfigString);

    if (useExperimentalDecorators === true) {
        tsConfig.compilerOptions.experimentalDecorators =
            useExperimentalDecorators;
    }

    const tsConfigPath = join(projectName, 'tsconfig.json');
    await mkdir(dirname(tsConfigPath), { recursive: true });
    await writeFile(tsConfigPath, JSON.stringify(tsConfig, null, 4));

    console.info(`${projectName} created successfully`);
}
