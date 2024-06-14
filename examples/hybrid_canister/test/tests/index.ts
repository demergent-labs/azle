import { describe } from '@jest/globals';
import { Test } from 'azle/test/jest';

import { getTests as getTestsCanister } from './canister';
import { getTests as getTestsCanisterInitAndPostUpgrade } from './canister_init_and_post_upgrade';
import { getTests as getTestsServer } from './server';
import { getTests as getTestsServerInitAndPostUpgrade } from './server_init_and_post_upgrade';

export function getTests(): Test {
    return () => {
        describe('', getTestsCanister());
        describe('', getTestsCanisterInitAndPostUpgrade());
        describe('', getTestsServer());
        describe('', getTestsServerInitAndPostUpgrade());
    };
}
