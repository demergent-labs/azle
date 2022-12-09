import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/init/init.did';

export function get_tests(init_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'get_user',
            test: async () => {
                const result = await init_canister.get_user();

                return {
                    ok: result.length === 1 && result[0].id === '0'
                };
            }
        },
        {
            name: 'get_reaction',
            test: async () => {
                const result = await init_canister.get_reaction();

                return {
                    ok: result.length === 1 && 'Fire' in result[0]
                };
            }
        },
        {
            name: 'get_owner',
            test: async () => {
                const result = await init_canister.get_owner();

                return {
                    ok:
                        result.length === 1 &&
                        result[0].toText() === 'rrkah-fqaaa-aaaaa-aaaaq-cai'
                };
            }
        }
    ];
}
