import { Test } from 'azle/_internal/test';

import { getTests as getTestsServer } from './server';
import { getTests as getTestsServerInitAndPostUpgrade } from './server_init_and_post_upgrade';

export function getTests(): Test {
    return () => {
        getTestsServer();
        getTestsServerInitAndPostUpgrade();
    };
}
