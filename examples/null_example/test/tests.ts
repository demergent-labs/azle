import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/null_example/null_example.did';

export function getTests(nullExampleCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('null function', async () => {
            const result = await nullExampleCanister.nullFunction(null);

            expect(result).toBeNull();
        });

        it('void function', async () => {
            const result = await nullExampleCanister.voidIsNotNull();

            expect(result).toBeUndefined();
        });

        it('get partially null record', async () => {
            const result = await nullExampleCanister.getPartiallyNullRecord();

            const record = {
                firstItem: 1n,
                secondItem: null,
                thirdItem: 3n
            };

            expect(result).toStrictEqual(record);
        });

        it('set partially null record', async () => {
            const record = {
                firstItem: 5n,
                secondItem: null,
                thirdItem: 15n
            };
            const result =
                await nullExampleCanister.setPartiallyNullRecord(record);

            expect(result).toStrictEqual(record);
        });

        it('get small null record', async () => {
            const result = await nullExampleCanister.getSmallNullRecord();
            const record = {
                firstItem: null,
                secondItem: null
            };

            expect(result).toStrictEqual(record);
        });

        it('set small null record', async () => {
            const record = {
                firstItem: null,
                secondItem: null
            };
            const result = await nullExampleCanister.setSmallNullRecord(record);

            expect(result).toStrictEqual(record);
        });

        it('get large null record', async () => {
            const result = await nullExampleCanister.getLargeNullRecord();
            const record = {
                firstItem: null,
                secondItem: null,
                thirdItem: null
            };

            expect(result).toStrictEqual(record);
        });

        it('set large null record', async () => {
            const record = {
                firstItem: null,
                secondItem: null,
                thirdItem: null
            };
            const result = await nullExampleCanister.setLargeNullRecord(record);

            expect(result).toStrictEqual(record);
        });
    };
}
