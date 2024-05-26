import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Test, testEquality } from 'azle/test';

import { _SERVICE } from './dfx_generated/init/init.did';

export function getTests(initCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'getUser',
            test: async () => {
                const result = await initCanister.getUser();
                const expectedUser = { id: '0' };

                return testEquality(result, [expectedUser]);
            }
        },
        {
            name: 'getReaction',
            test: async () => {
                const result = await initCanister.getReaction();
                const expectedReaction = { Fire: null };

                return testEquality(result, [expectedReaction]);
            }
        },
        {
            name: 'getOwner',
            test: async () => {
                const result = await initCanister.getOwner();
                const expectedPrincipal = Principal.fromText(
                    'rrkah-fqaaa-aaaaa-aaaaq-cai'
                );

                return testEquality(result, [expectedPrincipal]);
            }
        }
    ];
}
