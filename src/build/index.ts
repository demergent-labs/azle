#!/usr/bin/env -S tsx --abort-on-uncaught-exception

import { IOType } from 'child_process';
import { join } from 'path';

import { version as azleVersion } from '../../package.json';
import { runCommand as runExperimentalCompileCommand } from './experimental/commands/compile';
import { runCommand as runUploadAssetsCommand } from './experimental/commands/upload_assets';
import {
    experimentalMessageCli,
    experimentalMessageDfxJson
} from './experimental/utils/experimental_message';
import { runCommand as runCleanCommand } from './stable/commands/clean';
import { runCommand as runStableCompileCommand } from './stable/commands/compile';
import { runCommand as runInstallDfxExtensionCommand } from './stable/commands/install_dfx_extension';
import { runCommand as runNewCommand } from './stable/commands/new';
import { runCommand as runVersionCommand } from './stable/commands/version';
import { getCanisterConfig } from './stable/utils/get_canister_config';
import { AZLE_PACKAGE_PATH } from './stable/utils/global_paths';
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
        handleInstallDfxExtensionCommand(ioType);

        return;
    }

    if (command === 'upload-assets') {
        await handleUploadAssetsCommand();

        return;
    }

    if (command === 'compile') {
        await handleCompileCommand(ioType);

        return;
    }

    if (command === '--version') {
        runVersionCommand();

        return;
    }

    if (command === 'clean') {
        await runCleanCommand();

        return;
    }

    if (command === 'new') {
        await handleNewCommand();

        return;
    }

    throw new Error(
        `Azle: Invalid command found when running azle. Running azle ${command} is not valid`
    );
}

function handleInstallDfxExtensionCommand(ioType: IOType): void {
    runInstallDfxExtensionCommand(ioType);
}

async function handleUploadAssetsCommand(): Promise<void> {
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    const experimental = canisterConfig?.custom?.experimental === true;

    if (experimental === false) {
        if (canisterConfig.custom?.assets !== undefined) {
            throw new Error(
                experimentalMessageDfxJson('the upload-assets command')
            );
        }
    } else {
        await runUploadAssetsCommand();
    }
}

async function handleCompileCommand(ioType: IOType): Promise<void> {
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    const experimental = canisterConfig?.custom?.experimental === true;

    if (experimental === false) {
        await runStableCompileCommand(canisterName, canisterConfig, ioType);
    } else {
        // TODO the developer needs to somehow have their build process fail if they try to
        // TODO do something that isn't experimental in their code
        // TODO how will this work with the build process?
        // TODO hmmmm...at runtime we check for imports
        // TODO and we will check for globals
        // TODO and if they try to import from any azle code it will throw
        // TODO is that good enough?
        // TODO maybe we need to check for experimental values in the dfx.json custom property
        // TODO and throw if we see them?
        // TODO we must throw if they EVER try to do anything experimental and they have not
        // TODO set the experimental flag
        await runExperimentalCompileCommand(
            canisterName,
            canisterConfig,
            ioType
        );
    }
}

async function handleNewCommand(): Promise<void> {
    const experimental = process.argv.includes('--experimental');

    if (experimental === false) {
        if (process.argv.includes('--http-server')) {
            throw new Error(experimentalMessageCli('the --http-server option'));
        }

        const templatePath = join(
            AZLE_PACKAGE_PATH,
            'examples',
            'hello_world_candid_rpc'
        );

        await runNewCommand(azleVersion, templatePath);
    } else {
        const templatePath = join(AZLE_PACKAGE_PATH, 'examples', 'hello_world');

        await runNewCommand(azleVersion, templatePath);
    }
}
