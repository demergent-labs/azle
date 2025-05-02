import { IOType } from 'child_process';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { build as stableBuild } from '#build/index';
import { findProjectRoot } from '#experimental/build/utils/find_project_root';
import { runCommand as runBuildCommand } from '#experimental/commands/build/index';
import { runCommand as runUploadAssetsCommand } from '#experimental/commands/upload_assets/index';
import { getCanisterConfig } from '#utils/get_canister_config';
import { Command, ExperimentalCommand } from '#utils/types';

import { devDependencies, version as azleVersion } from '../../../package.json';

export async function build(): Promise<void> {
    await checkAzleExperimentalDeps();

    const command = process.argv[2] as
        | Command
        | ExperimentalCommand
        | undefined;

    if (command === undefined) {
        throw new Error(
            `No command found when running azle. Running azle should start like this: azle [commandName]`
        );
    }

    const ioType = process.env.AZLE_VERBOSE === 'true' ? 'inherit' : 'pipe';

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

    stableBuild();
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

async function checkAzleExperimentalDeps(): Promise<void> {
    const projectRoot = await findProjectRoot();
    const theirAzleExperimentalDepsVersion =
        await getAzleExperimentalDepsVersion(projectRoot);

    const azleExperimentalDepsVersion =
        devDependencies['azle-experimental-deps'];

    const azleExperimentalDepsVersionHash = getAzleExperimentalDepsVersionHash(
        azleExperimentalDepsVersion
    );

    const installPrompt = `Please run \`npm install https://github.com/demergent-labs/azle-experimental-deps#${azleExperimentalDepsVersionHash}\``;

    if (theirAzleExperimentalDepsVersion === undefined) {
        console.warn(
            `azle-experimental-deps might not be installed. ${installPrompt} to ensure it is installed before running azle.`
        );
        return;
    }

    if (theirAzleExperimentalDepsVersion !== azleExperimentalDepsVersion) {
        console.warn(
            `The version of azle-experimental-deps installed in your project (${theirAzleExperimentalDepsVersion}) does not match the version of azle-experimental-deps required by azle@${azleVersion} (${azleExperimentalDepsVersion}). ${installPrompt} to ensure that the versions match before running azle.`
        );
        return;
    }
}

async function getAzleExperimentalDepsVersion(
    resolveDir: string
): Promise<string | undefined> {
    const packageJsonPath = join(resolveDir, 'package.json');
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
    const packageName = 'azle-experimental-deps';
    return (
        packageJson.dependencies?.[packageName] ??
        packageJson.devDependencies?.[packageName] ??
        packageJson.peerDependencies?.[packageName] ??
        packageJson.optionalDependencies?.[packageName]
    );
}

function getAzleExperimentalDepsVersionHash(version: string): string {
    // Extract the hash from the version string by splitting on '#' and taking the last part
    const parts = version.split('#');

    return parts[1];
}
