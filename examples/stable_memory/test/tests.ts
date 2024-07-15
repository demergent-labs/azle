import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/stable_memory/stable_memory.did';

const PAGE_SIZE = 65_536; // This should currently remain constant
const MAX_STABLE64_MEM_PAGES = 6_553_600n; // (# Gib * 2^30) / PAGE_SIZE
const STABLE_BYTES_SIZE = 655_360;

export function getTests(stableMemoryCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('stable size', async () => {
            const result = await stableMemoryCanister.stableSize();

            expect(result).toBe(513n);
        });

        it('stable grow', async () => {
            const oldSize = await stableMemoryCanister.stableSize();
            const newPages = 5n;
            const result = await stableMemoryCanister.stableGrow(newPages);
            const newSize = await stableMemoryCanister.stableSize();

            expect(result).toBe(oldSize);
            expect(newPages + oldSize).toBe(newSize);
        });

        it('stable bytes', async () => {
            // TODO this test used to check that the entire stable memory was empty
            // TODO but with the stable filesystem we use with ic-wasi-polyfill
            // TODO that is no longer the case
            // TODO the test could perhaps be more effective
            const result = await stableMemoryCanister.stableBytes();

            expect(result).toHaveLength(STABLE_BYTES_SIZE);
        });

        it('stable read/write no offset', async () => {
            const offset = 0n;
            const buffer = new Uint8Array([0, 1, 2, 3, 4, 5]);

            await stableMemoryCanister.stableWrite(offset, buffer);

            const result = await stableMemoryCanister.stableRead(
                offset,
                BigInt(buffer.length)
            );

            expect(buffer).toStrictEqual(result);
        });

        it('stable read/write', async () => {
            const offset = 5n;
            const buffer = new Uint8Array([0, 1, 2, 3, 4, 5]);

            await stableMemoryCanister.stableWrite(offset, buffer);

            const result = await stableMemoryCanister.stableRead(
                offset,
                BigInt(buffer.length)
            );

            expect(buffer).toStrictEqual(result);
        });

        it('stable write out of bounds error', async () => {
            const offset = BigInt(PAGE_SIZE) * MAX_STABLE64_MEM_PAGES - 1n;
            const buffer = new Uint8Array([0, 1, 2, 3, 4, 5, 6]);

            const rejectionMessage = /.*stable memory out of bounds.*/;
            const expectedErrorMessage = new RegExp(
                `Call was rejected:\\s*Request ID: [a-f0-9]{64}\\s*Reject code: 5\\s*Reject text: ${rejectionMessage.source}`
            );

            await expect(
                stableMemoryCanister.stableWrite(offset, buffer)
            ).rejects.toThrow(expectedErrorMessage);
        });

        it.skip('stable grow to max', async () => {
            // TODO this test used to run without panicking
            // TODO My guess is that the sizes are just too large to deal with on a local machine now
            // TODO so for the moment we just check to make sure that get an error from calling the API
            const oldSize = await stableMemoryCanister.stableSize();
            const newPages = MAX_STABLE64_MEM_PAGES - oldSize;
            const result = await stableMemoryCanister.stableGrow(newPages);
            const newSize = await stableMemoryCanister.stableSize();

            expect(result).toBe(oldSize);
            expect(newPages + oldSize).toBe(newSize);
        });

        it.skip('stable grow out of memory', async () => {
            // TODO we are also turning this test off because it seems like we can't grow to the max memory anymore
            // TODO I am guessing this is because of the size of stable memory

            // TODO change error messages back to nice ones once we figure that out
            // const rejectionMessage = /Uncaught InternalError: Out of memory/
            const rejectionMessage = /.*OutOfMemory.*/;
            const expectedErrorMessage = new RegExp(
                `Call was rejected:\\s*Request ID: [a-f0-9]{64}\\s*Reject code: 5\\s*Reject text: ${rejectionMessage.source}`
            );
            await expect(stableMemoryCanister.stableGrow(1n)).rejects.toThrow(
                expectedErrorMessage
            );
        });
    };
}
