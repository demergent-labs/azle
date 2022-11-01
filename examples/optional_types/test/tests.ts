import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/optional_types/optional_types.did';

export function get_tests(
    optional_types_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get_html',
            test: async () => {
                const result = await optional_types_canister.get_html();

                return {
                    ok: result.head.length === 0
                };
            }
        },
        {
            name: 'get_head',
            test: async () => {
                const result = await optional_types_canister.get_head();

                return {
                    ok: result.length === 1 && result[0].elements.length === 0
                };
            }
        },
        {
            name: 'get_head_with_elements',
            test: async () => {
                const result =
                    await optional_types_canister.get_head_with_elements();

                return {
                    ok:
                        result.length === 1 &&
                        result[0].elements.length === 1 &&
                        result[0].elements[0].id === '0'
                };
            }
        },
        {
            name: 'get_element',
            test: async () => {
                const result = await optional_types_canister.get_element([]);

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'get_element',
            test: async () => {
                const result = await optional_types_canister.get_element([[]]);

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'get_element',
            test: async () => {
                const result = await optional_types_canister.get_element([
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
