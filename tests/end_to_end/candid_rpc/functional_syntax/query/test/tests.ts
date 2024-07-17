import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore
import { _SERVICE } from '../dfx_generated/query/query.did';

export function getTests(queryCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('makes a simple query call', async () => {
            const result = await queryCanister.simpleQuery();

            expect(result).toBe('This is a query function');
        });
    };
}
