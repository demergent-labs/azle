import { cp, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

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

    // Copy the template to the new project directory
    await cp(templatePath, projectName, { recursive: true });

    // Edit the configuration files in place so they are ready to use in the new project
    await editPackageJson(projectName, templatePath, azleVersion, experimental);
    await editTsConfig(projectName, useExperimentalDecorators);
    await editJestConfig(projectName);
    await editDfxJson(projectName, templatePath, experimental);

    console.info(`${projectName} created successfully`);
}

/**
 * Edits the package.json for the new project.
 *
 * @param projectName - The name of the project directory.
 * @param templatePath - The path to the template directory.
 * @param azleVersion - The version of Azle to set in the project's dependencies.
 * @param experimental - Whether to include experimental dependencies in the project.
 */
async function editPackageJson(
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

    packageJson.dependencies = {
        ...packageJson.dependencies,
        azle: `^${azleVersion}`
    };

    if (experimental === true) {
        packageJson.dependencies['azle-experimental-deps'] =
            devDependencies['azle-experimental-deps'];
    }

    const packageJsonPath = join(projectName, 'package.json');
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 4));
}

/**
 * Edits the tsconfig.json for the new project
 *
 * @param projectName - The name of the project directory.
 * @param useExperimentalDecorators - Whether to enable the TypeScript experimentalDecorators compiler option.
 */
async function editTsConfig(
    projectName: string,
    useExperimentalDecorators: boolean
): Promise<void> {
    const templateTsConfigString = await readFile(
        join(AZLE_ROOT, 'tsconfig.dev.json'),
        { encoding: 'utf-8' }
    );

    let tsConfig = JSON.parse(templateTsConfigString);

    if (useExperimentalDecorators === true) {
        tsConfig.compilerOptions = {
            ...tsConfig.compilerOptions,
            experimentalDecorators: useExperimentalDecorators
        };
    }

    const tsConfigPath = join(projectName, 'tsconfig.json');
    await writeFile(tsConfigPath, JSON.stringify(tsConfig, null, 4));
}

/**
 * Edits the jest.config.js for the new project
 *
 * @param projectName - The name of the project directory.
 */
async function editJestConfig(projectName: string): Promise<void> {
    const templateJestConfigString = await readFile(
        join(AZLE_ROOT, 'jest.config.dev.js'),
        { encoding: 'utf-8' }
    );

    const jestConfigPath = join(projectName, 'jest.config.js');
    await writeFile(jestConfigPath, templateJestConfigString);
}

/**
 * Edits the dfx.json for the new project to enable experimental mode for all canisters if the experimental argument is true.
 *
 * @param projectName - The name of the project directory.
 * @param templatePath - The path to the template directory.
 * @param experimental - Whether to set the experimental flag on all canisters.
 */
async function editDfxJson(
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
            dfxJson.canisters[canister].custom = {
                ...dfxJson.canisters[canister].custom,
                experimental: true
            };
        }

        await writeFile(
            join(projectName, 'dfx.json'),
            JSON.stringify(dfxJson, null, 4)
        );
    }
}
