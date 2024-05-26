import { ActorSubclass } from '@dfinity/agent';
import { Test, test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/optional_types/optional_types.did';

export function getTests(
    optionalTypesCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getHtml',
            test: async () => {
                const result = await optionalTypesCanister.getHtml();

                return testEquality(result.head.length, 0);
            }
        },
        {
            name: 'getHead',
            test: async () => {
                const result = await optionalTypesCanister.getHead();

                return test(
                    result.length === 1 && result[0].elements.length === 0
                );
            }
        },
        {
            name: 'getHeadWithElements',
            test: async () => {
                const result =
                    await optionalTypesCanister.getHeadWithElements();

                return test(
                    result.length === 1 &&
                        result[0].elements.length === 1 &&
                        result[0].elements[0].id === '0'
                );
            }
        },
        {
            name: 'getElement(None)',
            test: async () => {
                const result = await optionalTypesCanister.getElement([]);

                return testEquality(result.length, 0);
            }
        },
        {
            name: 'getElement(Some(None))',
            test: async () => {
                const result = await optionalTypesCanister.getElement([[]]);

                return test(result.length === 1 && result[0].length === 0);
            }
        },
        {
            name: 'getElement(Some(Some({ id: "0" })))',
            test: async () => {
                const result = await optionalTypesCanister.getElement([
                    [{ id: '0' }]
                ]);

                return test(
                    result.length === 1 &&
                        result[0].length === 1 &&
                        result[0][0].id === '0'
                );
            }
        },
        {
            name: 'getNull',
            test: async () => {
                const result = await optionalTypesCanister.getNull();

                return testEquality(result, null);
            }
        },
        {
            name: 'getOptNull',
            test: async () => {
                const result = await optionalTypesCanister.getOptNull();

                return testEquality(result.length, 0);
            }
        },
        {
            name: 'stringToBoolean(Some("something"))',
            test: async () => {
                const result = await optionalTypesCanister.stringToBoolean([
                    'something'
                ]);

                return test(result);
            }
        },
        {
            name: 'stringToBoolean(None)',
            test: async () => {
                const result = await optionalTypesCanister.stringToBoolean([]);

                return test(!result);
            }
        }
    ];
}
