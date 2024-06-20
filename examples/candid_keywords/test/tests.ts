import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from './dfx_generated/candid_keywords/candid_keywords.did';

export function getTests(candid_canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('calls a query with a keyword name', async () => {
            await candid_canister.opt();

            expect(true).toBe(true);
        });

        it('returns a variant with some keyword options', async () => {
            const result = await candid_canister.variant();

            expect(result).toHaveProperty('query');
            expect((result as { query: string }).query).toBe('hello');
        });

        it('returns a record with every keyword', async () => {
            const result = await candid_canister.candidTypes();
            const expectedResult = {
                query: 'query',
                text: 'text',
                blob: Uint8Array.from([]),
                nat: 340_282_366_920_938_463_463_374_607_431_768_211_455n,
                nat64: 18_446_744_073_709_551_615n,
                nat32: 4_294_967_295,
                nat16: 65_535,
                nat8: 255,
                int: 170_141_183_460_469_231_731_687_303_715_884_105_727n,
                int64: 9_223_372_036_854_775_807n,
                int32: 2_147_483_647,
                int16: 32_767,
                int8: 127,
                float64: Math.E,
                float32: 3.1415927410125732,
                bool: true,
                null: null,
                vec: ['has one element'],
                opt: [],
                record: {
                    firstName: 'John',
                    lastName: 'Doe',
                    age: 35
                },
                variant: {
                    Tag1: null
                },
                func: [
                    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai'),
                    'candidTypes'
                ],
                service: Principal.fromText('aaaaa-aa'),
                principal: Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
            };

            expect(result).toEqual(expectedResult);
        });
    };
}
