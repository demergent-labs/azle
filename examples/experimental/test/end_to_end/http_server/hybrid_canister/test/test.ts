import { runTests } from 'azle/_internal/test';

import { getTests } from './tests';

runTests(getTests(), [
    'server',
    'server_init_and_post_upgrade',
    'canister',
    'canister_init_and_post_upgrade'
]);
