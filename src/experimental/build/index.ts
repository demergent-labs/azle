#!/usr/bin/env -S npx tsx

import { execSync, IOType } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { build as stableBuild } from '#build/index';
import { runCommand as runStableDevTemplateCommand } from '#commands/dev/template';
import { runCommand as runStableNewCommand } from '#commands/new';
import { findProjectRoot } from '#experimental/build/utils/find_project_root';
import { runCommand as runBuildCommand } from '#experimental/commands/build/index';
import { runCommand as runDevTemplateCommand } from '#experimental/commands/dev/template';
import { runCommand as runUploadAssetsCommand } from '#experimental/commands/upload_assets/index';
import { getCanisterConfig } from '#utils/get_canister_config';
import { AZLE_ROOT } from '#utils/global_paths';
import {
    Command as StableCommand,
    ExperimentalCommand as Command,
    SubCommand
} from '#utils/types';

import { version as azleVersion } from '../../../package.json';

export async function build(): Promise<void> {
    await assertAzleExperimentalDeps();

    const command = process.argv[2] as StableCommand | Command | undefined;

    if (command === undefined) {
        throw new Error(
            `No command found when running azle. Running azle should start like this: azle [commandName]`
        );
    }

    const ioType = process.env.AZLE_VERBOSE === 'true' ? 'inherit' : 'pipe';

    if (command === 'dev') {
        const handledDevCommand = await handleDevCommand();

        if (handledDevCommand === true) {
            return;
        }
    }

    if (command === 'post-install') {
        await handlePostInstallCommand();

        return;
    }

    if (command === 'upload-assets') {
        await handleUploadAssetsCommand();

        return;
    }

    if (command === 'build') {
        await handleBuildCommand(ioType);

        return;
    }

    if (command === 'new') {
        await handleNewCommand();

        return;
    }

    stableBuild();
}

async function handleDevCommand(): Promise<boolean> {
    const subCommand = process.argv[3] as SubCommand['dev'];

    if (subCommand === 'template') {
        await handleDevTemplateCommand('inherit');

        return true;
    }

    return false;
}

async function handleDevTemplateCommand(ioType: IOType): Promise<void> {
    const all = process.argv.includes('--all');

    if (all === true) {
        await runStableDevTemplateCommand(ioType);
        await runDevTemplateCommand(ioType);
    } else {
        const experimental =
            process.argv.includes('--experimental') ||
            process.env.AZLE_EXPERIMENTAL === 'true';

        if (experimental === false) {
            await runStableDevTemplateCommand(ioType);
        } else {
            await runDevTemplateCommand(ioType);
        }
    }
}

async function handlePostInstallCommand(): Promise<void> {
    // Currently, the only post-install step is uploading assets.
    // This function can be expanded if more steps are needed in the future.
    await runUploadAssetsCommand();
}

async function handleUploadAssetsCommand(): Promise<void> {
    await runUploadAssetsCommand();
}

async function handleBuildCommand(ioType: IOType): Promise<void> {
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    await runBuildCommand(canisterName, canisterConfig, ioType);
}

async function handleNewCommand(): Promise<void> {
    const httpServer = process.argv.includes('--http-server');
    const projectName =
        httpServer === true ? 'hello_world_http_server' : 'hello_world';

    const templatePath = join(
        AZLE_ROOT,
        'examples',
        httpServer === true ? 'experimental' : 'stable',
        'demo',
        projectName
    );

    await runStableNewCommand(azleVersion, templatePath, httpServer === true);
}

async function assertAzleExperimentalDeps(): Promise<void> {
    const projectRoot = await findProjectRoot();
    const theirAzleExperimentalDepsVersion =
        await getAzleExperimentalDepsVersion(projectRoot);

    const ourAzleExperimentalDepsVersion =
        await getAzleExperimentalDepsVersion(AZLE_ROOT);

    if (ourAzleExperimentalDepsVersion === undefined) {
        const beChill = true;
        if (beChill === true) {
            throw new Error('Unreachable');
        }
        throw new Error(
            'Something has gone horribly wrong. Please open an issue right away, this must be fixed in azle immediately. Reach out to Jordan and tell him that Some How Azle Suffers Total Annihilation. He will know what to do.'
        );
    }

    if (theirAzleExperimentalDepsVersion !== ourAzleExperimentalDepsVersion) {
        installAzleExperimentalDeps(
            projectRoot,
            ourAzleExperimentalDepsVersion
        );
    }
}

async function getAzleExperimentalDepsVersion(
    resolveDir: string
): Promise<string | undefined> {
    const packageJsonPath = join(resolveDir, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    const packageName = 'azle-experimental-deps';
    return (
        packageJson.dependencies[packageName] ??
        packageJson.devDependencies[packageName]
    );
}

function installAzleExperimentalDeps(
    resolveDir: string,
    version: string
): void {
    try {
        execSync(`npm install azle-experimental-deps@${version}`, {
            cwd: resolveDir
        });
    } catch (error) {
        console.error(
            `Failed to install azle-experimental-deps@${version}:`,
            error
        );
        throw new Error(
            `Failed to install azle-experimental-deps@${version}. Please check your network connection and try again.`
        );
    }
}
