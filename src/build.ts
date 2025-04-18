#!/usr/bin/env -S npx tsx

import { IOType } from 'child_process';
import { join } from 'path';

import { runCommand as runBuildCommand } from '#commands/build/index';
import { runCommand as runCleanCommand } from '#commands/clean';
import { runCommand as runDevSetupCommand } from '#commands/dev/setup/index';
import { runCommand as runDevTemplateCommand } from '#commands/dev/template';
import { runCommand as runExtensionInstallCommand } from '#commands/extension/install';
import { runCommand as runGenerateCommand } from '#commands/generate/index';
import { runCommand as runNewCommand } from '#commands/new';
import { runCommand as runVersionCommand } from '#commands/version';
import { runCommand as runExperimentalBuildCommand } from '#experimental/commands/build/index';
import { runCommand as runExperimentalDevTemplateCommand } from '#experimental/commands/dev/template';
import { runCommand as runExperimentalUploadAssetsCommand } from '#experimental/commands/upload_assets/index';
import {
    experimentalMessageCli,
    experimentalMessageDfxJson
} from '#experimental/utils/experimental_message';
import { Command as ExperimentalCommand } from '#experimental/utils/types';
import { getCanisterConfig } from '#utils/get_canister_config';
import { AZLE_ROOT } from '#utils/global_paths';
import { CanisterConfig, Command, SubCommand } from '#utils/types';

import { version as azleVersion } from '../package.json';

process.on('uncaughtException', (error: Error) => {
    const prefix = 'Azle BuildError';

    const message =
        process.env.AZLE_VERBOSE === 'true'
            ? `${prefix}: ${error.stack}`
            : `${prefix}: ${error}`;

    console.error(message);

    process.exit(1);
});

process.on('unhandledRejection', (reason: any) => {
    const prefix = 'Azle BuildError';

    const message =
        process.env.AZLE_VERBOSE === 'true' && reason instanceof Error
            ? `${prefix}: ${reason.stack}`
            : `${prefix}: ${reason}`;

    console.error(message);

    process.exit(1);
});

build();

async function build(): Promise<void> {
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

    if (command === 'extension') {
        await handleExtensionCommand(ioType);

        return;
    }

    if (command === 'dev') {
        await handleDevCommand();

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

    if (command === 'generate') {
        await handleGenerateCommand();

        return;
    }

    throwIfInvalidCommand(command);
}

function throwIfInvalidCommand(command: string): void {
    throw new Error(
        `Invalid command found when running azle. Running azle ${command} is not valid`
    );
}

async function handleExtensionCommand(ioType: IOType): Promise<void> {
    const subCommand = process.argv[3] as SubCommand['extension'];

    if (subCommand === 'install') {
        handleExtensionInstallCommand(ioType);

        return;
    }

    throwIfInvalidCommand(`extension ${subCommand}`);
}

function handleExtensionInstallCommand(ioType: IOType): void {
    runExtensionInstallCommand(ioType);
}

async function handleDevCommand(): Promise<void> {
    const subCommand = process.argv[3] as SubCommand['dev'];

    if (subCommand === 'setup') {
        handleDevSetupCommand();

        return;
    }

    if (subCommand === 'template') {
        await handleDevTemplateCommand('inherit');

        return;
    }

    throwIfInvalidCommand(`dev ${subCommand}`);
}

async function handleDevSetupCommand(): Promise<void> {
    const node = process.argv.includes('--node');
    const dfx = process.argv.includes('--dfx');
    // Rust must come before any other dependencies that use the Rust compiler
    // to ensure that they are compiled with the latest version of Rust
    const rust = process.argv.includes('--rust');
    const wasi2ic = process.argv.includes('--wasi2ic');

    if (!node && !dfx && !rust && !wasi2ic) {
        await runDevSetupCommand({
            dfx: true,
            node: true,
            rust: true,
            wasi2ic: true
        });
    } else {
        await runDevSetupCommand({ dfx, node, rust, wasi2ic });
    }
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
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    const experimental =
        canisterConfig?.custom?.experimental === true ||
        process.env.AZLE_EXPERIMENTAL === 'true';

    if (experimental === false) {
        if (canisterConfig.custom?.assets !== undefined) {
            throw new Error(
                experimentalMessageDfxJson('the upload-assets command')
            );
        }
    } else {
        await runExperimentalUploadAssetsCommand();
    }
}

async function handleBuildCommand(ioType: IOType): Promise<void> {
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    const experimental =
        canisterConfig?.custom?.experimental === true ||
        process.env.AZLE_EXPERIMENTAL === 'true';

    if (experimental === false) {
        checkForExperimentalDfxJsonFields(canisterConfig);

        await runBuildCommand(canisterName, canisterConfig, ioType);
    } else {
        await runExperimentalBuildCommand(canisterName, canisterConfig, ioType);
    }
}

async function handleNewCommand(): Promise<void> {
    const experimental =
        process.argv.includes('--experimental') ||
        process.env.AZLE_EXPERIMENTAL === 'true';
    const httpServer = process.argv.includes('--http-server');

    if (experimental === false) {
        if (httpServer === true) {
            throw new Error(experimentalMessageCli('the --http-server option'));
        }

        const templatePath = join(
            AZLE_ROOT,
            'examples',
            'stable',
            'demo',
            'hello_world'
        );

        await runNewCommand(azleVersion, templatePath);
    } else {
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
}

async function handleGenerateCommand(): Promise<void> {
    const candidPath = process.argv[3];

    await runGenerateCommand(candidPath);
}

function checkForExperimentalDfxJsonFields(
    canisterConfig: CanisterConfig
): void {
    if (canisterConfig.custom?.assets !== undefined) {
        throw new Error(
            experimentalMessageDfxJson('the assets field in your dfx.json file')
        );
    }

    if (canisterConfig.custom?.build_assets !== undefined) {
        throw new Error(
            experimentalMessageDfxJson(
                'the build_assets field in your dfx.json file'
            )
        );
    }

    if (canisterConfig.custom?.candid_gen === 'http') {
        throw new Error(
            experimentalMessageDfxJson(
                'the "candid_gen": "http" field in your dfx.json file'
            )
        );
    }

    if (canisterConfig.custom?.esm_aliases !== undefined) {
        throw new Error(
            experimentalMessageDfxJson(
                'the esm_aliases field in your dfx.json file'
            )
        );
    }

    if (canisterConfig.custom?.esm_externals !== undefined) {
        throw new Error(
            experimentalMessageDfxJson(
                'the esm_externals field in your dfx.json file'
            )
        );
    }

    if (canisterConfig.custom?.openValueSharing !== undefined) {
        throw new Error(
            experimentalMessageDfxJson(
                'the openValueSharing field in your dfx.json file'
            )
        );
    }
}
