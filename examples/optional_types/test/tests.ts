import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/optional_types/optional_types.did';

export function get_tests(
    optional_types_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'getHTML',
            test: async () => {
                const result = await optional_types_canister.getHTML();

                return {
                    ok: result.head.length === 0
                };
            }
        },
        {
            name: 'getHead',
            test: async () => {
                const result = await optional_types_canister.getHead();

                return {
                    ok: result.length === 1 && result[0].elements.length === 0
                };
            }
        },
        {
            name: 'getHeadWithElements',
            test: async () => {
                const result =
                    await optional_types_canister.getHeadWithElements();

                return {
                    ok:
                        result.length === 1 &&
                        result[0].elements.length === 1 &&
                        result[0].elements[0].id === '0'
                };
            }
        },
        {
            name: 'getElement',
            test: async () => {
                const result = await optional_types_canister.getElement([]);

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'getElement',
            test: async () => {
                const result = await optional_types_canister.getElement([[]]);

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'getElement',
            test: async () => {
                const result = await optional_types_canister.getElement([
                    [{ id: '0' }]
                ]);

                return {
                    ok:
                        result.length === 1 &&
                        result[0].length === 1 &&
                        result[0][0].id === '0'
                };
            }
        }
    ];
}
