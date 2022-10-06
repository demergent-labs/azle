import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/init/init.did';

export function get_tests(init_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'getUser',
            test: async () => {
                const result = await init_canister.getUser();

                return {
                    ok: result.length === 1 && result[0].id === '0'
                };
            }
        },
        {
            name: 'getReaction',
            test: async () => {
                const result = await init_canister.getReaction();

                return {
                    ok: result.length === 1 && 'Fire' in result[0]
                };
            }
        },
        {
            name: 'getOwner',
            test: async () => {
                const result = await init_canister.getOwner();

                return {
                    ok:
                        result.length === 1 &&
                        result[0].toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        }
    ];
}
