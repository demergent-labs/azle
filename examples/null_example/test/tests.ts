import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/null_example/null_example.did';

export function getTests(nullExampleCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'null function',
            test: async () => {
                const result = await nullExampleCanister.nullFunction(null);

                return testEquality(result, null);
            }
        },
        {
            name: 'void function',
            test: async () => {
                const result = await nullExampleCanister.voidIsNotNull();

                return testEquality(result, undefined);
            }
        },
        {
            name: 'get partially null record',
            test: async () => {
                const result =
                    await nullExampleCanister.getPartiallyNullRecord();

                const record = {
                    firstItem: 1n,
                    secondItem: null,
                    thirdItem: 3n
                };

                return testEquality(result, record);
            }
        },
        {
            name: 'set partially null record',
            test: async () => {
                const record = {
                    firstItem: 5n,
                    secondItem: null,
                    thirdItem: 15n
                };
                const result =
                    await nullExampleCanister.setPartiallyNullRecord(record);

                return testEquality(result, record);
            }
        },
        {
            name: 'get small null record',
            test: async () => {
                const result = await nullExampleCanister.getSmallNullRecord();
                const record = {
                    firstItem: null,
                    secondItem: null
                };

                return testEquality(result, record);
            }
        },
        {
            name: 'set small null record',
            test: async () => {
                const record = {
                    firstItem: null,
                    secondItem: null
                };
                const result =
                    await nullExampleCanister.setSmallNullRecord(record);

                return testEquality(result, record);
            }
        },
        {
            name: 'get large null record',
            test: async () => {
                const result = await nullExampleCanister.getLargeNullRecord();
                const record = {
                    firstItem: null,
                    secondItem: null,
                    thirdItem: null
                };

                return testEquality(result, record);
            }
        },
        {
            name: 'set large null record',
            test: async () => {
                const record = {
                    firstItem: null,
                    secondItem: null,
                    thirdItem: null
                };
                const result =
                    await nullExampleCanister.setLargeNullRecord(record);

                return testEquality(result, record);
            }
        }
    ];
}
