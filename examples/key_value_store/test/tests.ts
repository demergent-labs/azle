import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/key_value_store/key_value_store.did';

export function getTests(
    keyValueStoreCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'get 0',
            test: async () => {
                const result = await keyValueStoreCanister.get('0');

                return testEquality(result.length, 0);
            }
        },
        {
            name: 'get 1',
            test: async () => {
                const result = await keyValueStoreCanister.get('1');

                return testEquality(result.length, 0);
            }
        },
        {
            name: 'set 0',
            test: async () => {
                const result = await keyValueStoreCanister.set('0', 'zero');

                return testEquality(result, undefined);
            }
        },
        {
            name: 'set 1',
            test: async () => {
                const result = await keyValueStoreCanister.set('1', 'one');

                return testEquality(result, undefined);
            }
        },
        {
            name: 'get 0',
            test: async () => {
                const result = await keyValueStoreCanister.get('0');
                const expected = ['zero'];

                return testEquality(result, expected);
            }
        },
        {
            name: 'get 1',
            test: async () => {
                const result = await keyValueStoreCanister.get('1');
                const expected = ['one'];

                return testEquality(result, expected);
            }
        }
    ];
}
