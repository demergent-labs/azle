import { IOType } from 'child_process';
import { join } from 'path';

import { runCommand as runExperimentalDevTemplateCommand } from '#build/commands/dev/template/experimental';
import { runCommand as runDevTemplateCommand } from '#build/commands/dev/template/stable';
import {
    experimentalMessageCli,
    experimentalMessageDfxJson
} from '#build/utils/experimental_message';
import { runCommand as runBuildCommand } from '#commands/build/index';
import { runCommand as runCleanCommand } from '#commands/clean';
import { runCommand as runDevSetupCommand } from '#commands/dev/setup/index';
import { runCommand as runExtensionInstallCommand } from '#commands/extension/install';
import { runCommand as runGenerateCommand } from '#commands/generate/index';
import { runCommand as runNewCommand } from '#commands/new';
import { runCommand as runVersionCommand } from '#commands/version';
import { getCanisterConfig } from '#utils/get_canister_config';
import { AZLE_ROOT } from '#utils/global_paths';
import {
    CanisterConfig,
    Command,
    ExperimentalCommand,
    SubCommand
} from '#utils/types';

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

    if (command === 'extension') {
        await handleExtensionCommand(ioType);

        return;
    }

    if (command === 'dev') {
        await handleDevCommand();

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

    if (command === 'post-install') {
        // This block is reserved for future post-install steps.
        // Currently, no actions are required.
        return;
    }

    if (command === 'upload-assets') {
        throw new Error(experimentalMessageDfxJson(`the ${command} command`));
    }

    throwIfInvalidCommand(command);
}

export function throwIfInvalidCommand(command: string): void {
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

export async function handleDevSetupCommand(): Promise<void> {
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
            'cargo-audit': true,
            'cargo-deny': true,
            wasi2ic: true
        });
    } else {
        await runDevSetupCommand({
            dfx,
            node,
            rust,
            'cargo-audit': true,
            'cargo-deny': true,
            wasi2ic
        });
    }
}

async function handleDevTemplateCommand(ioType: IOType): Promise<void> {
    const all = process.argv.includes('--all');
    const experimental = process.argv.includes('--experimental');

    if (all === true) {
        await runDevTemplateCommand(ioType);
        await runExperimentalDevTemplateCommand(ioType);
    } else if (experimental === true) {
        await runExperimentalDevTemplateCommand(ioType);
    } else {
        await runDevTemplateCommand(ioType);
    }
}

async function handleBuildCommand(ioType: IOType): Promise<void> {
    const canisterName = process.argv[3];
    const canisterConfig = await getCanisterConfig(canisterName);

    checkForExperimentalDfxJsonFields(canisterConfig);

    await runBuildCommand(canisterName, canisterConfig, ioType);
}

async function handleNewCommand(): Promise<void> {
    const experimental = process.argv.includes('--experimental');
    const httpServer = process.argv.includes('--http-server');
    const projectName =
        httpServer === true ? 'hello_world_http_server' : 'hello_world';

    if (httpServer === true && experimental === false) {
        throw new Error(experimentalMessageCli('the --http-server option'));
    }
    const templatePath = join(
        AZLE_ROOT,
        'examples',
        httpServer === true ? 'experimental' : 'stable',
        'demo',
        projectName
    );

    await runNewCommand(
        azleVersion,
        templatePath,
        httpServer === true,
        experimental === true
    );
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
