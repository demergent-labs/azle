import { IOType } from 'child_process';
import { join } from 'path';

import { version as azleVersion } from '../../package.json';
import { runCommand as runExperimentalCompileCommand } from './experimental/commands/compile';
import { runCommand as runExperimentalTemplateCommand } from './experimental/commands/template';
import { runCommand as runUploadAssetsCommand } from './experimental/commands/upload_assets';
import {
    experimentalMessageCli,
    experimentalMessageDfxJson
} from './experimental/utils/experimental_message';
import { runCommand as runCleanCommand } from './stable/commands/clean';
import { runCommand as runStableCompileCommand } from './stable/commands/compile';
import { runCommand as runInstallDfxExtensionCommand } from './stable/commands/install_dfx_extension';
import { runCommand as runNewCommand } from './stable/commands/new';
import { runCommand as runStableTemplateCommand } from './stable/commands/template';
import { runCommand as runVersionCommand } from './stable/commands/version';
import { getCanisterConfig } from './stable/utils/get_canister_config';
import { AZLE_PACKAGE_PATH } from './stable/utils/global_paths';
import { CanisterConfig, Command } from './stable/utils/types';

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

    if (command === 'template') {
        await handleTemplateCommand(ioType);

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
        checkForExperimentalDfxJsonFields(canisterConfig);

        await runStableCompileCommand(canisterName, canisterConfig, ioType);
    } else {
        await runExperimentalCompileCommand(
            canisterName,
            canisterConfig,
            ioType
        );
    }
}

async function handleTemplateCommand(ioType: IOType): Promise<void> {
    const experimental = process.argv.includes('--experimental');

    if (experimental === false) {
        await runStableTemplateCommand(ioType);
    } else {
        await runExperimentalTemplateCommand(ioType);
    }
}

async function handleNewCommand(): Promise<void> {
    const experimental = process.argv.includes('--experimental');
    const httpServer = process.argv.includes('--http-server');

    if (experimental === false) {
        if (httpServer === true) {
            throw new Error(experimentalMessageCli('the --http-server option'));
        }

        const templatePath = join(AZLE_PACKAGE_PATH, 'examples', 'hello_world');

        await runNewCommand(azleVersion, templatePath);
    } else {
        const projectName =
            httpServer === true ? 'hello_world_http_server' : 'hello_world';

        const templatePath = join(AZLE_PACKAGE_PATH, 'examples', projectName);

        await runNewCommand(azleVersion, templatePath);
    }
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
