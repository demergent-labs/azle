import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(update_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'update',
            test: async () => {
                const result = await update_canister.update('Why hello there');

                return {
                    ok: result === undefined
                };
            }
        },
        {
            name: 'get_current_message',
            test: async () => {
                const result = await update_canister.get_current_message();

                return {
                    ok: result === 'Why hello there'
                };
            }
        }
    ];
}
