import { runTests } from 'azle/test';
import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';
import { get_tests } from './tests';

const canister1 = createActorCanister1('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const canister2 = createActorCanister2('ryjl3-tyaaa-aaaaa-aaaba-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(canister1, canister2));
