import { cp, mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, join } from 'path';

import { AZLE_ROOT } from '#utils/global_paths';

import { devDependencies } from '../../../../package.json';

export async function runCommand(
    azleVersion: string,
    templatePath: string,
    useExperimentalDecorators: boolean = false,
    experimental: boolean = false
): Promise<void> {
    if (process.argv[3] === undefined) {
        throw new Error(`You must provide a name for your Azle project`);
    }

    const projectName = process.argv[3];

    await cp(templatePath, projectName, { recursive: true });

    configurePackageJson(projectName, templatePath, azleVersion, experimental);
    configureTsConfig(projectName, useExperimentalDecorators);
    configureDfxJson(projectName, templatePath, experimental);

    console.info(`${projectName} created successfully`);
}

async function configurePackageJson(
    projectName: string,
    templatePath: string,
    azleVersion: string,
    experimental: boolean
): Promise<void> {
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

    if (experimental === true) {
        packageJson.dependencies['azle-experimental-deps'] =
            devDependencies['azle-experimental-deps'];
    }

    const packageJsonPath = join(projectName, 'package.json');
    await mkdir(dirname(packageJsonPath), { recursive: true });
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 4));
}

async function configureTsConfig(
    projectName: string,
    useExperimentalDecorators: boolean
): Promise<void> {
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
}

async function configureDfxJson(
    projectName: string,
    templatePath: string,
    experimental: boolean
): Promise<void> {
    if (experimental === true) {
        const templateDfxJsonString = await readFile(
            join(templatePath, 'dfx.json'),
            {
                encoding: 'utf-8'
            }
        );

        let dfxJson = JSON.parse(templateDfxJsonString);

        // Set experimental flag for all canisters
        for (const canister of Object.keys(dfxJson.canisters)) {
            if (dfxJson.canisters[canister].custom === undefined) {
                dfxJson.canisters[canister].custom = {};
            }
            dfxJson.canisters[canister].custom.experimental = true;
        }

        await writeFile(
            join(projectName, 'dfx.json'),
            JSON.stringify(dfxJson, null, 4)
        );
    }
}
