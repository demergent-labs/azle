import { large_wasm_deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/hello_world';

const hello_world_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...large_wasm_deploy('hello_world'),
    {
        name: 'main',
        test: async () => {
            const result = await hello_world_canister.main();

            return {
                ok: result === undefined
            };
        }
    }
];

run_tests(tests);
