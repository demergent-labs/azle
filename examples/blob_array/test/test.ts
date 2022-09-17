import { deploy, run_tests, Test } from 'azle/test';
import { createActor } from '../dfx_generated/azle/';

const blob_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const HELLO_BYTES = [104, 101, 108, 108, 111];
const WORLD_BYTES = [119, 111, 114, 108, 100];

const tests: Test[] = [
    ...deploy('azle'),
    {
        name: 'get blob',
        test: async () => {
            const result = await blob_canister.get_blob();
            return {
                ok: blob_equals(result, HELLO_BYTES)
            };
        }
    },
    {
        name: 'get blobs',
        test: async () => {
            const result = await blob_canister.get_blobs();
            return {
                ok: blob_array_equals(result, [HELLO_BYTES, WORLD_BYTES])
            };
        }
    }
];

function blob_array_equals(blob_array: number[][], other: number[][]) {
    return (
        blob_array.length === other.length &&
        blob_array.every((item, index) => blob_equals(item, other[index]))
    );
}

function blob_equals(blob: number[], other: number[]) {
    return (
        blob.length === other.length &&
        blob.every((item, index) => item === other[index])
    );
}

run_tests(tests);
