import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle';
import {
    callingIdentity,
    canisterId,
    get_tests,
    someonePrincipal
} from './tests';

const whoami_canister = createActor(canisterId, {
    agentOptions: {
        host: 'http://127.0.0.1:8000',
        identity: callingIdentity
    }
});

const tests: Test[] = [
    ...deploy('azle', `'(principal "${someonePrincipal}")'`),
    ...get_tests(whoami_canister)
];

run_tests(tests);
