import { ActorSubclass } from '@icp-sdk/core/agent';
import { expect, it, Test } from 'azle/_internal/test';
import { readFileSync } from 'fs';

import { _SERVICE } from './dfx_generated/bytes_canister/bytes_canister.did';

export function getTests(bytes_canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it.each([
            'example_1_kb.txt',
            'example_10_kb.txt',
            'example_100_kb.txt',
            'example_1000_kb.txt',
            'example_2000_kb.txt'
        ])('gets bytes from %s', async (fileName) => {
            const file = Array.from(
                readFileSync(`./test/example_files/${fileName}`)
            );

            const result = Array.from(await bytes_canister.getBytes(file));

            expect(result).toStrictEqual(file);
        });
    };
}
