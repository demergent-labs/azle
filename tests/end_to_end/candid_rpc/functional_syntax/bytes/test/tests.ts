import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
import { expect, it, Test } from 'azle/test';
import { readFileSync } from 'fs';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/bytes_canister/bytes_canister.did';

export function getTests(bytes_canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        describe.each([
            'example_1_kb.txt',
            'example_10_kb.txt',
            'example_100_kb.txt',
            'example_1000_kb.txt',
            'example_2000_kb.txt'
        ])('get bytes from various files', (fileName) => {
            it(`gets bytes from ${fileName}`, async () => {
                const file = Array.from(
                    readFileSync(`./test/example_files/${fileName}`)
                );

                const result = Array.from(await bytes_canister.getBytes(file));

                expect(result).toStrictEqual(file);
            });
        });
    };
}
