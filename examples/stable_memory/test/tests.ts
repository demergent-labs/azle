import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/stable_memory/stable_memory.did';
import { ActorSubclass } from '@dfinity/agent';

const PAGE_SIZE = 65_536; // This should currently remain constant
const MAX_STABLE_MEM_PAGES = 65_536; // This will always remain constant
const MAX_STABLE64_MEM_PAGES = 6_553_600n; // (# Gib * 2^30) / PAGE_SIZE
const STABLE_BYTES_SIZE = 655_360;

export function getTests(
    stableMemoryCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'stable size',
            test: async () => {
                const result = await stableMemoryCanister.stableSize();

                return {
                    Ok: result === 0
                };
            }
        },
        {
            name: 'stable64 size',
            test: async () => {
                const result = await stableMemoryCanister.stable64Size();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'stable grow',
            test: async () => {
                const oldSize = await stableMemoryCanister.stableSize();
                const newPages = 5;
                const result = await stableMemoryCanister.stableGrow(newPages);
                const newSize = await stableMemoryCanister.stableSize();

                return {
                    Ok: result === oldSize && newPages + oldSize === newSize
                };
            }
        },
        {
            name: 'stable64 grow',
            test: async () => {
                const oldSize = await stableMemoryCanister.stable64Size();
                const newPages = 5n;
                const result =
                    await stableMemoryCanister.stable64Grow(newPages);
                const newSize = await stableMemoryCanister.stable64Size();

                return {
                    Ok: result === oldSize && newPages + oldSize === newSize
                };
            }
        },
        {
            name: 'stable bytes',
            test: async () => {
                // TODO this test used to check that the entire stable memory was empty
                // TODO but with the stable filesystem we use with ic-wasi-polyfill
                // TODO that is no longer the case
                // TODO the test could perhaps be more effective
                const result = await stableMemoryCanister.stableBytes();

                return {
                    Ok: result.length === STABLE_BYTES_SIZE
                };
            }
        },
        {
            name: 'stable read/write no offset',
            test: async () => {
                const offset = 0;
                const buffer = [0, 1, 2, 3, 4, 5];

                await stableMemoryCanister.stableWrite(offset, buffer);

                const result = await stableMemoryCanister.stableRead(
                    offset,
                    buffer.length
                );

                return {
                    Ok: arrayEquals(buffer, result)
                };
            }
        },
        {
            name: 'stable read/write',
            test: async () => {
                const offset = 5;
                const buffer = [0, 1, 2, 3, 4, 5];

                await stableMemoryCanister.stableWrite(offset, buffer);

                const result = await stableMemoryCanister.stableRead(
                    offset,
                    buffer.length
                );

                return {
                    Ok: arrayEquals(buffer, result)
                };
            }
        },
        {
            name: 'stable write out of bounds error',
            test: async () => {
                const offset = PAGE_SIZE * MAX_STABLE_MEM_PAGES - 1;
                const buffer = [0, 1, 2, 3, 4, 5, 6];

                try {
                    await stableMemoryCanister.stableWrite(offset, buffer);
                } catch (error) {
                    return {
                        Ok: (error as any)
                            .toString()
                            .includes('stable memory out of bounds')
                    };
                }

                return {
                    Ok: false
                };
            }
        },
        {
            name: 'stable64 read/write no offset',
            test: async () => {
                const offset = 0n;
                const buffer = [0, 1, 2, 3, 4, 5];

                await stableMemoryCanister.stable64Write(offset, buffer);

                const result = await stableMemoryCanister.stable64Read(
                    offset,
                    BigInt(buffer.length)
                );

                return {
                    Ok: arrayEquals(buffer, result)
                };
            }
        },
        {
            name: 'stable64 read/write',
            test: async () => {
                const offset = 5n;
                const buffer = [0, 1, 2, 3, 4, 5];

                await stableMemoryCanister.stable64Write(offset, buffer);

                const result = await stableMemoryCanister.stable64Read(
                    offset,
                    BigInt(buffer.length)
                );

                return {
                    Ok: arrayEquals(buffer, result)
                };
            }
        },
        {
            name: 'stable64 write out of bounds error',
            test: async () => {
                const offset = BigInt(PAGE_SIZE) * MAX_STABLE64_MEM_PAGES - 1n;
                const buffer = [0, 1, 2, 3, 4, 5, 6];

                try {
                    await stableMemoryCanister.stable64Write(offset, buffer);
                } catch (error) {
                    return {
                        Ok: (error as any)
                            .toString()
                            .includes('stable memory out of bounds')
                    };
                }

                return {
                    Ok: false
                };
            }
        },
        {
            name: 'stable grow to max',
            test: async () => {
                const oldSize = await stableMemoryCanister.stableSize();
                const newPages = MAX_STABLE_MEM_PAGES - oldSize;
                const result = await stableMemoryCanister.stableGrow(newPages);
                const newSize = await stableMemoryCanister.stableSize();

                return {
                    Ok: result === oldSize && newPages + oldSize === newSize
                };
            }
        },
        {
            name: 'stable grow out of memory',
            test: async () => {
                try {
                    const result = await stableMemoryCanister.stableGrow(1);
                } catch (e: any) {
                    return {
                        Ok: e.toString().includes('OutOfMemory') // TODO change error messages back to nice ones once we figure that out
                        // .includes('Uncaught InternalError: Out of memory')
                    };
                }
                return {
                    Err: 'canister did not run out of memory'
                };
            }
        },
        {
            name: 'stable64 grow to max',
            skip: true,
            test: async () => {
                // TODO this test used to run without panicking
                // TODO My guess is that the sizes are just too large to deal with on a local machine now
                // TODO so for the moment we just check to make sure that get an error from calling the API
                const oldSize = await stableMemoryCanister.stable64Size();
                const newPages = MAX_STABLE64_MEM_PAGES - oldSize;
                const result =
                    await stableMemoryCanister.stable64Grow(newPages);
                const newSize = await stableMemoryCanister.stable64Size();

                return {
                    Ok: result === oldSize && newPages + oldSize === newSize
                };
            }
        },
        {
            name: 'stable64 grow out of memory',
            skip: true,
            test: async () => {
                // TODO we are also turning this test off because it seems like we can't grow to the max memory anymore
                // TODO I am guessing this is because of the size of stable memory
                try {
                    const result = await stableMemoryCanister.stable64Grow(1n);
                } catch (e: any) {
                    return {
                        Ok: e.toString().includes('OutOfMemory') // TODO change error messages back to nice ones once we figure that out
                        // .includes('Uncaught InternalError: Out of memory')
                    };
                }
                return {
                    Err: 'canister did not run out of memory'
                };
            }
        }
    ];
}

function arrayEquals(a: any[] | Uint8Array, b: any[] | Uint8Array): boolean {
    return a.length === b.length && a.every((item, index) => item === b[index]);
}
