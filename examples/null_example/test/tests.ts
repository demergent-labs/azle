import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/null_example/null_example.did';

export function getTests(nullExampleCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'null function',
            test: async () => {
                const result = await nullExampleCanister.nullFunction(null);

                return {
                    Ok: result === null
                };
            }
        },
        {
            name: 'void function',
            test: async () => {
                const result = await nullExampleCanister.voidIsNotNull();

                return {
                    Ok: result === undefined
                };
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

                return {
                    Ok:
                        result.firstItem === record.firstItem &&
                        result.secondItem === record.secondItem &&
                        result.thirdItem === record.thirdItem
                };
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
                const result = await nullExampleCanister.setPartiallyNullRecord(
                    record
                );

                return {
                    Ok:
                        result.firstItem === record.firstItem &&
                        result.secondItem === record.secondItem &&
                        result.thirdItem === record.thirdItem
                };
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

                return {
                    Ok:
                        result.firstItem === record.firstItem &&
                        result.secondItem === record.secondItem
                };
            }
        },
        {
            name: 'set small null record',
            test: async () => {
                const record = {
                    firstItem: null,
                    secondItem: null
                };
                const result = await nullExampleCanister.setSmallNullRecord(
                    record
                );

                return {
                    Ok:
                        result.firstItem === record.firstItem &&
                        result.secondItem === record.secondItem
                };
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

                return {
                    Ok:
                        result.firstItem === record.firstItem &&
                        result.secondItem === record.secondItem &&
                        result.thirdItem === record.thirdItem
                };
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
                const result = await nullExampleCanister.setLargeNullRecord(
                    record
                );

                return {
                    Ok:
                        result.firstItem === record.firstItem &&
                        result.secondItem === record.secondItem &&
                        result.thirdItem === record.thirdItem
                };
            }
        }
    ];
}
