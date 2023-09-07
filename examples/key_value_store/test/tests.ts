import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/key_value_store/key_value_store.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    keyValueStoreCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get 0',
            test: async () => {
                const result = await keyValueStoreCanister.get('0');

                return {
                    Ok: result.length === 0
                };
            }
        },
        {
            name: 'get 1',
            test: async () => {
                const result = await keyValueStoreCanister.get('1');

                return {
                    Ok: result.length === 0
                };
            }
        },
        {
            name: 'set 0',
            test: async () => {
                const result = await keyValueStoreCanister.set('0', 'zero');

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'set 1',
            test: async () => {
                const result = await keyValueStoreCanister.set('1', 'one');

                return {
                    Ok: result === undefined
                };
            }
        },
        {
            name: 'get 0',
            test: async () => {
                const result = await keyValueStoreCanister.get('0');

                return {
                    Ok: result.length === 1 && result[0] === 'zero'
                };
            }
        },
        {
            name: 'get 1',
            test: async () => {
                const result = await keyValueStoreCanister.get('1');

                return {
                    Ok: result.length === 1 && result[0] === 'one'
                };
            }
        }
    ];
}
