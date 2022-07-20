import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from './dfx_generated/stable_memory';

// TODO Understand why these numbers are the way they are https://github.com/demergent-labs/azle/issues/485
const MAX_STABLE_MEM = 65_536;
const STABLE_BYTES_SIZE = 655_360;

const stable_memory_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...deploy('stable_memory'),
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
        name: 'stable64 grow',
        test: async () => {
            const old_size = await stable_memory_canister.stable64_size();
            const new_pages = 5n;
            const result = await stable_memory_canister.stable64_grow(
                new_pages
            );
            const new_size = await stable_memory_canister.stable64_size();

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
        name: 'stable bytes',
        test: async () => {
            const result = await stable_memory_canister.stable_bytes();
            const expected_bytes = new Array(STABLE_BYTES_SIZE).fill(0);

            return {
                ok: arrayEquals(expected_bytes, result)
            };
        }
    },
    {
        name: 'stable read/write no offset',
        test: async () => {
            const offset = 0;
            const buffer = [0, 1, 2, 3, 4, 5];

            await stable_memory_canister.stable_write(offset, buffer);

            const result = await stable_memory_canister.stable_read(
                offset,
                buffer.length
            );

            return {
                ok: arrayEquals(buffer, result)
            };
        }
    },
    {
        name: 'stable read/write',
        test: async () => {
            const offset = 5;
            const buffer = [0, 1, 2, 3, 4, 5];

            await stable_memory_canister.stable_write(offset, buffer);

            const result = await stable_memory_canister.stable_read(
                offset,
                buffer.length
            );

            return {
                ok: arrayEquals(buffer, result)
            };
        }
    },
    // TODO ic_cdk::api::stable::stable_write doesn't panic when given an invalid offset.
    // https://github.com/demergent-labs/azle/issues/481
    // {
    //     name: 'stable write out of bounds error',
    //     test: async () => {
    //         const offset = MAX_STABLE_MEM;
    //         const buffer = [0, 1, 2, 3, 4, 5, 6];

    //         await stable_memory_canister.stable_write(offset, buffer);

    //         return {
    //             ok: true
    //         };
    //     }
    // },
    {
        name: 'stable64 read/write no offset',
        test: async () => {
            const offset = 0n;
            const buffer = [0, 1, 2, 3, 4, 5];

            await stable_memory_canister.stable64_write(offset, buffer);

            const result = await stable_memory_canister.stable64_read(
                offset,
                BigInt(buffer.length)
            );

            return {
                ok: arrayEquals(buffer, result)
            };
        }
    },
    {
        name: 'stable64 read/write',
        test: async () => {
            const offset = 5n;
            const buffer = [0, 1, 2, 3, 4, 5];

            await stable_memory_canister.stable64_write(offset, buffer);

            const result = await stable_memory_canister.stable64_read(
                offset,
                BigInt(buffer.length)
            );

            return {
                ok: arrayEquals(buffer, result)
            };
        }
    },
    // TODO ic_cdk::api::stable::stable_write doesn't panic when given an invalid offset.
    // https://github.com/demergent-labs/azle/issues/481
    // {
    //     name: 'stable64 write out of bounds error',
    //     test: async () => {
    //         const offset = MAX_STABLE_MEM;
    //         const buffer = [0, 1, 2, 3, 4, 5, 6];

    //         await stable_memory_canister.stable64_write(offset, buffer);

    //         return {
    //             ok: true
    //         };
    //     }
    // },
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
    },
    {
        name: 'stable64 grow out of memory',
        test: async () => {
            const new_pages = MAX_STABLE_MEM + 1;
            const result = await stable_memory_canister.stable64_grow(
                BigInt(new_pages)
            );

            return {
                ok: 'err' in result && 'OutOfMemory' in result.err
            };
        }
    }
];

function arrayEquals(a: any[], b: any[]): boolean {
    return a.length === b.length && a.every((item, index) => item === b[index]);
}

run_tests(tests);
