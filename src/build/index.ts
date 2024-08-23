#!/usr/bin/env -S tsx --abort-on-uncaught-exception

import { IOType } from 'child_process';

import { experimentalMessage } from './experimental/experimental_message';
import { runCommand as runCompileCommand } from './stable/commands/compile';
import { runCommand as runInstallDfxExtension } from './stable/commands/install_dfx_extension';
import { getCanisterConfig } from './stable/utils/get_canister_config';
import { Command } from './stable/utils/types';

build();

async function build(): Promise<void> {
    const command = process.argv[2] as Command | undefined;

    if (command === undefined) {
        throw new Error(
            `Azle: No command found when running azle. Running azle should start like this: azle [commandName]`
        );
    }

    const ioType = process.env.AZLE_VERBOSE === 'true' ? 'inherit' : 'pipe';

    if (command === 'install-dfx-extension') {
        handleCommandInstallDfxExtension(ioType);

        return;
    }

    if (command === 'upload-assets') {
        await handleCommandUploadAssets();

        return;
    }

    if (command === 'compile') {
        await handleCommandCompile();

        return;
    }

    throw new Error(
        `Azle: Invalid command found when running azle. Running azle ${command} is not valid`
    );
}

function handleCommandInstallDfxExtension(ioType: IOType): void {
    runInstallDfxExtension(ioType);
}

async function handleCommandUploadAssets(): Promise<void> {
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    const experimental = canisterConfig?.custom?.experimental === true;

    if (experimental === false) {
        if (canisterConfig.custom?.assets !== undefined) {
            throw new Error(experimentalMessage('the upload-assets command'));
        }
    }
}

async function handleCommandCompile(): Promise<void> {
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    const experimental = canisterConfig?.custom?.experimental === true;

    if (experimental === false) {
        await runCompileCommand(canisterName, canisterConfig);
    }
}
