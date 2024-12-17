import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/key_value_store/key_value_store.did';

export function getTests(keyValueStoreCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('gets initial value 0 from simple key value store', async () => {
            const result = await keyValueStoreCanister.get('0');

            expect(result).toHaveLength(0);
        });

        it('gets initial value 1 from simple key value store', async () => {
            const result = await keyValueStoreCanister.get('1');

            expect(result).toHaveLength(0);
        });

        it('sets value 0 from a simple key value store', async () => {
            const result = await keyValueStoreCanister.set('0', 'zero');

            expect(result).toBeUndefined();
        });

        it('sets value 1 from a simple key value store', async () => {
            const result = await keyValueStoreCanister.set('1', 'one');

            expect(result).toBeUndefined();
        });

        it('gets value 0 from a simple key value store', async () => {
            const result = await keyValueStoreCanister.get('0');

            expect(result).toStrictEqual(['zero']);
        });

        it('gets value 1 from a simple key value store', async () => {
            const result = await keyValueStoreCanister.get('1');

            expect(result).toStrictEqual(['one']);
        });
    };
}
