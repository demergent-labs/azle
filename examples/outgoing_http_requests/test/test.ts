import { run_tests } from 'azle/test';
import { createActor } from './dfx_generated/outgoing_http_requests';
import { get_tests } from './tests';

const outgoing_http_requests_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

run_tests(get_tests(outgoing_http_requests_canister));
