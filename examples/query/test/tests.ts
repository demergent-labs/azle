import { Test } from 'azle/test';
import { _SERVICE } from '../dfx_generated/query/query.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(query_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'query',
            test: async () => {
                const result = await query_canister.simpleQuery();

                return {
                    Ok: result === 'This is a query function'
                };
            }
        }
    ];
}
