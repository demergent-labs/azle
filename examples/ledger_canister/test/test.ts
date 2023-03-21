import { runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/ledger_canister';
import { getTests } from './tests';

const ledger_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(ledger_canister));
