#!/usr/bin/env -S npx tsx

import { IOType } from 'child_process';
import { join } from 'path';

import { build as stableBuild } from '#build/index';
import { runCommand as runDevTemplateCommand } from '#commands/dev/template';
import { runCommand as runNewCommand } from '#commands/new';
import { runCommand as runExperimentalBuildCommand } from '#experimental/commands/build/index';
import { runCommand as runExperimentalDevTemplateCommand } from '#experimental/commands/dev/template';
import { runCommand as runExperimentalUploadAssetsCommand } from '#experimental/commands/upload_assets/index';
import { Command as ExperimentalCommand } from '#experimental/utils/types';
import { getCanisterConfig } from '#utils/get_canister_config';
import { AZLE_ROOT } from '#utils/global_paths';
import { Command, SubCommand } from '#utils/types';

import { version as azleVersion } from '../../../package.json';

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

    if (command === 'dev') {
        const handledDevCommand = await handleDevCommand();

        if (handledDevCommand === true) {
            return;
        }
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
        await runDevTemplateCommand(ioType);
        await runExperimentalDevTemplateCommand(ioType);
    } else {
        const experimental =
            process.argv.includes('--experimental') ||
            process.env.AZLE_EXPERIMENTAL === 'true';

        if (experimental === false) {
            await runDevTemplateCommand(ioType);
        } else {
            await runExperimentalDevTemplateCommand(ioType);
        }
    }
}

async function handleUploadAssetsCommand(): Promise<void> {
    await runExperimentalUploadAssetsCommand();
}

async function handleBuildCommand(ioType: IOType): Promise<void> {
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    await runExperimentalBuildCommand(canisterName, canisterConfig, ioType);
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

    await runNewCommand(azleVersion, templatePath, httpServer === true);
}
