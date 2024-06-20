import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, Test } from 'azle/test/jest';

import { _SERVICE } from './dfx_generated/init/init.did';

export function getTests(initCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('accepts Records as init arguments', async () => {
            const result = await initCanister.getUser();

            expect(result).toStrictEqual([{ id: '0' }]);
        });

        it('accepts Variants as init arguments', async () => {
            const result = await initCanister.getReaction();

            expect(result).toStrictEqual([{ Fire: null }]);
        });

        it('accepts Principals as init arguments', async () => {
            const result = await initCanister.getOwner();

            expect(result).toEqual([
                Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
            ]);
        });
    };
}
