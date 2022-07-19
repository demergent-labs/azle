import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/imports';

const imports_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('imports'),
    {
        name: 'getOne',
        test: async () => {
            const result = await imports_canister.getOne();

            return {
                ok: result === 'one'
            };
        }
    },
    {
        name: 'getTwo',
        test: async () => {
            const result = await imports_canister.getTwo();

            return {
                ok: result === 'two'
            };
        }
    },
    {
        name: 'getThree',
        test: async () => {
            const result = await imports_canister.getThree();

            return {
                ok: result === 'three'
            };
        }
    },
    {
        name: 'sha224Hash',
        test: async () => {
            const result = await imports_canister.sha224Hash('hello');

            return {
                ok:
                    result ===
                    'ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa24193'
            };
        }
    }
];

run_tests(tests);
