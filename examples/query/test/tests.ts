import { ActorSubclass } from '@dfinity/agent';
import { Test, testEquality } from 'azle/test';

// @ts-ignore
import { _SERVICE } from '../dfx_generated/query/query.did';

export function getTests(query_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'query',
            test: async () => {
                const result = await query_canister.simpleQuery();

                return testEquality(result, 'This is a query function');
            }
        }
    ];
}
