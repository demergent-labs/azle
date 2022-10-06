import { run_tests } from 'azle/test';
import { createActor } from '../test/dfx_generated/ledger_canister';
import { get_tests } from './tests';

const ledger_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

run_tests(get_tests(ledger_canister));
