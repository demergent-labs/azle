import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from './dfx_generated/blob_array/blob_array.did';

const HELLO_BYTES = Uint8Array.from([104, 101, 108, 108, 111]);
const WORLD_BYTES = Uint8Array.from([119, 111, 114, 108, 100]);

export function getTests(blob_canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('sends a blob', async () => {
            const result = await blob_canister.getBlob();

            expect(result).toStrictEqual(HELLO_BYTES);
        });
        it('sends an array of blobs', async () => {
            const result = await blob_canister.getBlobs();

            expect(result).toStrictEqual([HELLO_BYTES, WORLD_BYTES]);
        });
    };
}
