#!/usr/bin/env -S npx tsx

import { getCanisterConfig } from '#utils/get_canister_config';
import { Command, ExperimentalCommand } from '#utils/types';

import { devDependencies } from '../package.json';

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

/**
 * Determines if the build should use experimental features and calls the appropriate build function.
 */
async function build(): Promise<void> {
    if (await isExperimental()) {
        warnAboutExperimentalDeps();
        globalThis._azleExperimental = true;
        const { build } = await import('#experimental/build/index');
        await build();
    } else {
        const { build } = await import('#build/index');
        await build();
    }
}

/**
 * Determines if the current build should use experimental features.
 * Checks canister config, command line arguments, and environment variables.
 * @param canisterName The name of the canister being built.
 * @returns A promise that resolves to true if the build is experimental, false otherwise.
 */
async function isExperimental(): Promise<boolean> {
    const command = process.argv[2] as
        | Command
        | ExperimentalCommand
        | undefined;

    if (
        command === 'dev' ||
        command === 'extension' ||
        command === 'generate' ||
        command === 'new' ||
        command === '--version'
    ) {
        return false;
    }

    if (process.env.AZLE_EXPERIMENTAL === 'true') {
        return true;
    }

    if (
        command === 'build' ||
        command === 'post-install' ||
        command === 'upload-assets'
    ) {
        const canisterName = process.argv[3];

        if (canisterName === undefined) {
            throw new Error(
                `No canister name found when running azle ${command}. Try azle ${command} <canisterName>`
            );
        }

        const canisterConfig = await getCanisterConfig(canisterName);

        return canisterConfig?.custom?.experimental === true;
    }

    return false;
}

function warnAboutExperimentalDeps(): void {
    const azleExperimentalDepsVersionHash =
        devDependencies['azle-experimental-deps'].split('#')[1];
    console.warn(
        `Azle Warning: Experimental mode requires azle-experimental-deps.`,
        `If not yet installed, run \`npm install https://github.com/demergent-labs/azle-experimental-deps#${azleExperimentalDepsVersionHash}\``
    );
}
