import '#experimental/build/assert_experimental';

import { IOType } from 'child_process';

import { build as stableBuild } from '#build/index';
import { runCommand as runBuildCommand } from '#experimental/commands/build/index';
import { runCommand as runUploadAssetsCommand } from '#experimental/commands/upload_assets/index';
import { getCanisterConfig } from '#utils/get_canister_config';
import { Command, ExperimentalCommand } from '#utils/types';

export async function build(): Promise<void> {
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
