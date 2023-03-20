import { runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/principal';
import { getTests } from './tests';

const principalCanister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(principalCanister));
