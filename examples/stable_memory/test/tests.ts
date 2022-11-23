import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/stable_memory/stable_memory.did';
import { ActorSubclass } from '@dfinity/agent';

const PAGE_SIZE = 65_536;
const MAX_STABLE_MEM_PAGES = 65_536;
const MAX_STABLE64_MEM_PAGES = 524_288n;
const STABLE_BYTES_SIZE = 655_360;

export function get_tests(
    stable_memory_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
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
                const result = await stable_memory_canister.stable_grow(
                    new_pages
                );
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
        {
            name: 'stable write out of bounds error',
            test: async () => {
                const offset = PAGE_SIZE * MAX_STABLE_MEM_PAGES - 1;
                const buffer = [0, 1, 2, 3, 4, 5, 6];

                try {
                    await stable_memory_canister.stable_write(offset, buffer);
                } catch (error) {
                    return {
                        ok: (error as any)
                            .toString()
                            .includes('stable memory out of bounds')
                    };
                }

                return {
                    ok: false
                };
            }
        },
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
        {
            name: 'stable64 write out of bounds error',
            test: async () => {
                const offset = BigInt(PAGE_SIZE) * MAX_STABLE64_MEM_PAGES - 1n;
                const buffer = [0, 1, 2, 3, 4, 5, 6];

                try {
                    await stable_memory_canister.stable64_write(offset, buffer);
                } catch (error) {
                    return {
                        ok: (error as any)
                            .toString()
                            .includes('stable memory out of bounds')
                    };
                }

                return {
                    ok: false
                };
            }
        },
        {
            name: 'stable grow to max',
            test: async () => {
                const old_size = await stable_memory_canister.stable_size();
                const new_pages = MAX_STABLE_MEM_PAGES - old_size;
                const result = await stable_memory_canister.stable_grow(
                    new_pages
                );
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
                const result = await stable_memory_canister.stable_grow(1);

                return {
                    ok: 'err' in result && 'OutOfMemory' in result.err
                };
            }
        },
        {
            name: 'stable64 grow to max',
            test: async () => {
                const old_size = await stable_memory_canister.stable64_size();
                const new_pages = MAX_STABLE64_MEM_PAGES - old_size;
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
            name: 'stable64 grow out of memory',
            test: async () => {
                const result = await stable_memory_canister.stable64_grow(1n);

                return {
                    ok: 'err' in result && 'OutOfMemory' in result.err
                };
            }
        }
    ];
}

function arrayEquals(a: any[], b: any[]): boolean {
    return a.length === b.length && a.every((item, index) => item === b[index]);
}
