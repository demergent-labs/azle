#!/usr/bin/env -S tsx --abort-on-uncaught-exception

import { build as buildExperimental } from './experimental';
import { build as buildStable } from './stable';
import { getCanisterConfig } from './stable/get_canister_config';

build();

// TODO we really need to figure out how to get the commands to work
// TODO even if we don't have the canister name yet
// TODO and we need to know if experimental can work or not
// TODO with those commands
// TODO we probably just need all commands to be stable
// TODO that aren't associated with a canister name
async function build(): Promise<void> {
    // const commandName = process.argv[1];

    // if (commandName === 'install-dfx-extension') {

    // }

    const canisterName = process.argv[3];

    console.log('canisterName', canisterName);

    const canisterConfig = await getCanisterConfig(canisterName);

    if (canisterConfig?.custom?.experimental !== true) {
        await buildStable(canisterName, canisterConfig);
    } else {
        await buildExperimental();
    }
}
