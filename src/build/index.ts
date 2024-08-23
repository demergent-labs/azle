#!/usr/bin/env -S tsx --abort-on-uncaught-exception

// TODO --experimental needs to be allowed on commands that are experimental

import { build as buildExperimental } from './experimental';
import { build as buildStable } from './stable';
import { run as runInstallDfxExtension } from './stable/commands/install_dfx_extension';
import { Command } from './stable/compile/utils/types';
import { getCanisterConfig } from './stable/get_canister_config';

build();

// TODO we really need to figure out how to get the commands to work
// TODO even if we don't have the canister name yet
// TODO and we need to know if experimental can work or not
// TODO with those commands
// TODO we probably just need all commands to be stable
// TODO that aren't associated with a canister name

async function build(): Promise<void> {
    // const experimental = await getExperimental();
    const command = process.argv[2] as Command | undefined;

    console.log('command', command);

    if (command === undefined) {
        throw new Error(`You must run a command`);
    }

    const ioType = process.env.AZLE_VERBOSE === 'true' ? 'inherit' : 'pipe';

    if (command === 'install-dfx-extension') {
        runInstallDfxExtension(ioType);

        return;
    }

    if (command === 'upload-assets') {
        const canisterName = process.argv[3];
        const canisterConfig = await getCanisterConfig(canisterName);

        const experimental = canisterConfig?.custom?.experimental === true;

        if (experimental === false) {
            if (canisterConfig.custom?.assets !== undefined) {
                throw new Error(
                    `You must set the experimental flag to upload assets`
                );
            }
        }

        // if (experimental === true) {

        // }

        return;
    }

    if (command === 'compile') {
        const canisterName = process.argv[3];
        const canisterConfig = await getCanisterConfig(canisterName);

        const experimental = canisterConfig?.custom?.experimental === true;

        if (experimental === false) {
            await buildStable(canisterName, canisterConfig);
        } else {
            await buildExperimental();
        }

        return;
    }

    throw new Error(`Azle: invalid command ${command}`);

    // if (commandName === 'install-dfx-extension') {
    //     const dfxExtensionDirectoryPath = join(
    //         AZLE_PACKAGE_PATH,
    //         'dfx_extension'
    //     );
    //     execSyncPretty(
    //         `cd ${dfxExtensionDirectoryPath} && ./install.sh`,
    //         stdioType
    //     );
    // }

    // const canisterName = process.argv[3];

    // console.log('canisterName', canisterName);

    // const canisterConfig = await getCanisterConfig(canisterName);

    // if (canisterConfig?.custom?.experimental !== true) {
    //     await buildStable(canisterName, canisterConfig);
    // } else {
    //     await buildExperimental();
    // }
}

// async function getExperimental(): Promise<boolean> {
//     if (process.argv.includes('--experimental')) {
//         return true;
//     }

//     try {
//         const canisterName = process.argv[3];
//         const canisterConfig = await getCanisterConfig(canisterName);

//         const experimentalRaw = canisterConfig.custom?.experimental;

//         return experimentalRaw === undefined ? false : experimentalRaw;
//     } catch (error: any) {
//         if (
//             (error as Error).message.startsWith(
//                 'Make sure your dfx.json contains a property for'
//             )
//         ) {
//             return false;
//         }

//         throw error;
//     }
// }
