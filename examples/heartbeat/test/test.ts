import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/heartbeat';

const heartbeat_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('heartbeat'),
    {
        name: 'Wait for first heartbeat to be called',
        wait: 5000
    },
    {
        name: 'getInitialized',
        test: async () => {
            const result = await heartbeat_canister.getInitialized();

            return {
                ok: result
            };
        }
    }
];

run_tests(tests);
