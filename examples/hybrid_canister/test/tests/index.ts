import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';

import { getTests as getTestsCanister } from './canister';
import { getTests as getTestsServerInitAndPostUpgrade } from './server_init_and_post_upgrade';
import { getTests as getTestsServer } from './server';

export function getTests(): Test[] {
    const canisterTests = getTestsCanister();
    const serverInitAndPostUpgradeTests = getTestsServerInitAndPostUpgrade();
    const serverTests = getTestsServer();

    return [...canisterTests, ...serverInitAndPostUpgradeTests, ...serverTests];
}
