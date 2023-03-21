import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/optional_types/optional_types.did';

export function getTests(
    optionalTypesCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getHtml',
            test: async () => {
                const result = await optionalTypesCanister.getHtml();

                return {
                    Ok: result.head.length === 0
                };
            }
        },
        {
            name: 'getHead',
            test: async () => {
                const result = await optionalTypesCanister.getHead();

                return {
                    Ok: result.length === 1 && result[0].elements.length === 0
                };
            }
        },
        {
            name: 'getHeadWithElements',
            test: async () => {
                const result =
                    await optionalTypesCanister.getHeadWithElements();

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].elements.length === 1 &&
                        result[0].elements[0].id === '0'
                };
            }
        },
        {
            name: 'getElement',
            test: async () => {
                const result = await optionalTypesCanister.getElement([]);

                return {
                    Ok: result.length === 0
                };
            }
        },
        {
            name: 'getElement',
            test: async () => {
                const result = await optionalTypesCanister.getElement([[]]);

                return {
                    Ok: result.length === 0
                };
            }
        },
        {
            name: 'getElement',
            test: async () => {
                const result = await optionalTypesCanister.getElement([
                    [{ id: '0' }]
                ]);

                return {
                    Ok:
                        result.length === 1 &&
                        result[0].length === 1 &&
                        result[0][0].id === '0'
                };
            }
        }
    ];
}
