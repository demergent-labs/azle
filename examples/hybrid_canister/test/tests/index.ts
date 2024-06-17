import { describe } from '@jest/globals';
import { Test } from 'azle/test/jest';

import { getTests as getTestsCanister } from './canister';
import { getTests as getTestsCanisterInitAndPostUpgrade } from './canister_init_and_post_upgrade';
import { getTests as getTestsServer } from './server';
import { getTests as getTestsServerInitAndPostUpgrade } from './server_init_and_post_upgrade';

export function getTests(): Test {
    return () => {
        describe('canister with HTTP endpoints', getTestsCanister());
        describe(
            'canister with HTTP endpoints and init and postUpgrade methods',
            getTestsCanisterInitAndPostUpgrade()
        );
        describe('server with update and query methods', getTestsServer());
        describe(
            'server with update and query methods and init and postUpgrade methods',
            getTestsServerInitAndPostUpgrade()
        );
    };
}
