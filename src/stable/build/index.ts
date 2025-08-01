import { IOType } from 'child_process';
import { join } from 'path';

import { generateLicenses } from '#build/commands/dev/template/generate_licenses';
import {
    experimentalMessageCli,
    experimentalMessageDfxJson
} from '#build/utils/experimental_message';
import { runCommand as runBuildCommand } from '#commands/build/index';
import { runCommand as runCleanCommand } from '#commands/clean';
import { runCommand as runDevAuditCommand } from '#commands/dev/audit';
import { runCommand as runDevSetupCommand } from '#commands/dev/setup/index';
import { runCommand as runExperimentalDevTemplateCommand } from '#commands/dev/template/experimental';
import { runCommand as runDevTemplateCommand } from '#commands/dev/template/stable';
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
        await handleDevCommand(ioType);

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

async function handleDevCommand(ioType: IOType): Promise<void> {
    const subCommand = process.argv[3] as SubCommand['dev'];

    if (subCommand === 'audit') {
        await runDevAuditCommand(ioType);

        return;
    }

    if (subCommand === 'setup') {
        handleDevSetupCommand();

        return;
    }

    if (subCommand === 'template') {
        await handleDevTemplateCommand(ioType);

        return;
    }

    throwIfInvalidCommand(`dev ${subCommand}`);
}

export async function handleDevSetupCommand(): Promise<void> {
    // About the ordering:
    // rust must come before any other dependencies that depend on cargo/rust.
    // cargo-auditable must come before all other dependencies that produce binaries from cargo.
    const dfx = process.argv.includes('--dfx');
    const node = process.argv.includes('--node');
    const rust = process.argv.includes('--rust');
    const cargoAuditable = process.argv.includes('--cargo-auditable');
    const cargoAudit = process.argv.includes('--cargo-audit');
    const cargoBundleLicenses = process.argv.includes(
        '--cargo-bundle-licenses'
    );
    const cargoDeny = process.argv.includes('--cargo-deny');
    const wasi2ic = process.argv.includes('--wasi2ic');

    if (
        dfx === false &&
        node === false &&
        rust === false &&
        cargoAuditable === false &&
        cargoAudit === false &&
        cargoBundleLicenses === false &&
        cargoDeny === false &&
        wasi2ic === false
    ) {
        await runDevSetupCommand({
            dfx: true,
            node: true,
            rust: true,
            'cargo-auditable': true,
            'cargo-audit': true,
            'cargo-bundle-licenses': true,
            'cargo-deny': true,
            wasi2ic: true
        });
    } else {
        await runDevSetupCommand({
            dfx,
            node,
            rust,
            'cargo-auditable': cargoAuditable,
            'cargo-audit': cargoAudit,
            'cargo-bundle-licenses': cargoBundleLicenses,
            'cargo-deny': cargoDeny,
            wasi2ic
        });
    }
}

async function handleDevTemplateCommand(ioType: IOType): Promise<void> {
    const all = process.argv.includes('--all');
    const experimental = process.argv.includes('--experimental');

    if (all === true) {
        await runDevTemplateCommand('inherit');
        await runExperimentalDevTemplateCommand('inherit');
    } else if (experimental === true) {
        await runExperimentalDevTemplateCommand('inherit');
    } else {
        await runDevTemplateCommand('inherit');
    }

    generateLicenses(ioType);
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
}
