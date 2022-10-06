import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/azle/azle.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(query_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'query',
            test: async () => {
                const result = await query_canister.simple_query();

                return {
                    ok: result === 'This is a query function'
                };
            }
        }
    ];
}
