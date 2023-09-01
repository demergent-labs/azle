import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/blob_array/blob_array.did';

const HELLO_BYTES = Uint8Array.from([104, 101, 108, 108, 111]);
const WORLD_BYTES = Uint8Array.from([119, 111, 114, 108, 100]);

export function get_tests(blob_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'get blob',
            test: async () => {
                const result = await blob_canister.getBlob();
                return {
                    Ok: blob_equals(result, HELLO_BYTES)
                };
            }
        },
        {
            name: 'get blobs',
            test: async () => {
                const result = await blob_canister.getBlobs();
                return {
                    Ok: blob_array_equals(result, [HELLO_BYTES, WORLD_BYTES])
                };
            }
        }
    ];
}

function blob_array_equals(
    blob_array: (number[] | Uint8Array)[],
    other: Uint8Array[]
) {
    return (
        blob_array.length === other.length &&
        blob_array.every((item, index) => blob_equals(item, other[index]))
    );
}

function blob_equals(blob: Uint8Array | number[], other: Uint8Array) {
    return (
        blob.length === other.length &&
        blob.every((item, index) => item === other[index])
    );
}
