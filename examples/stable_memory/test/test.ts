import { cleanDeploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/stable_memory';

const MAX_STABLE_MEM = 65_536;

const stable_memory_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...cleanDeploy('stable_memory'),
    {
        name: 'stable size',
        test: async () => {
            const result = await stable_memory_canister.stable_size();

            return {
                ok: result === 0
            };
        }
    },
    {
        name: 'stable64 size',
        test: async () => {
            const result = await stable_memory_canister.stable64_size();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'stable grow',
        test: async () => {
            const old_size = await stable_memory_canister.stable_size();
            const new_pages = 5;
            const result = await stable_memory_canister.stable_grow(new_pages);
            const new_size = await stable_memory_canister.stable_size();

            if ('err' in result) {
                return {
                    err: JSON.stringify(result.err)
                };
            }

            return {
                ok:
                    'ok' in result &&
                    result.ok === old_size &&
                    new_pages + old_size === new_size
            };
        }
    },
    {
        name: 'stable grow to max',
        test: async () => {
            const old_size = await stable_memory_canister.stable_size();
            const new_pages = MAX_STABLE_MEM - old_size;
            const result = await stable_memory_canister.stable_grow(new_pages);
            const new_size = await stable_memory_canister.stable_size();

            if ('err' in result) {
                return {
                    err: JSON.stringify(result.err)
                };
            }

            return {
                ok:
                    'ok' in result &&
                    result.ok === old_size &&
                    new_pages + old_size === new_size
            };
        }
    },
    {
        name: 'stable grow out of memory',
        test: async () => {
            const new_pages = MAX_STABLE_MEM + 1;
            const result = await stable_memory_canister.stable_grow(new_pages);

            return {
                ok: 'err' in result && 'OutOfMemory' in result.err
            };
        }
    }
];

run_tests(tests);
