import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle';

const update_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('azle'),
    {
        name: 'update',
        test: async () => {
            const result = await update_canister.update('Why hello there');

            return {
                ok: result === undefined
            };
        }
    },
    {
        name: 'get_current_message',
        test: async () => {
            const result = await update_canister.get_current_message();

            return {
                ok: result === 'Why hello there'
            };
        }
    }
];

run_tests(tests);
