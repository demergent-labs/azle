import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    key_value_store_canister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get 0',
            test: async () => {
                const result = await key_value_store_canister.get('0');

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'get 1',
            test: async () => {
                const result = await key_value_store_canister.get('1');

                return {
                    ok: result.length === 0
                };
            }
        },
        {
            name: 'set 0',
            test: async () => {
                const result = await key_value_store_canister.set('0', 'zero');

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'set 1',
            test: async () => {
                const result = await key_value_store_canister.set('1', 'one');

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'get 0',
            test: async () => {
                const result = await key_value_store_canister.get('0');

                return {
                    ok: result.length === 1 && result[0] === 'zero'
                };
            }
        },
        {
            name: 'get 1',
            test: async () => {
                const result = await key_value_store_canister.get('1');

                return {
                    ok: result.length === 1 && result[0] === 'one'
                };
            }
        }
    ];
}
