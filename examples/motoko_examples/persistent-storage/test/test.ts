import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle';

const persistentStorage_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('azle'),
    {
        name: 'increment',
        test: async () => {
            const result = await persistentStorage_canister.increment();
            return {
                ok: result === 1n
            };
        }
    },
    {
        name: 'reset',
        test: async () => {
            const result = await persistentStorage_canister.reset();
            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'increment',
        test: async () => {
            const result = await persistentStorage_canister.increment();
            return {
                ok: result === 1n
            };
        }
    },
    // TODO: upgrade to DFX v0.10.x
    // {
    //     name: 'deploy (upgrade)',
    //     prep: async () => {
    //         execSync(`dfx deploy --upgrade-unchanged`, {
    //             stdio: 'inherit'
    //         });
    //     }
    // },
    {
        name: 'get',
        test: async () => {
            const result = await persistentStorage_canister.get();
            return {
                ok: result === 1n
            };
        }
    }
];

run_tests(tests);
