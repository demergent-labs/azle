import { expect, it, Test } from 'azle/test';

// @ts-ignore
import { _SERVICE } from '../dfx_generated/query/query.did';

export function getTests(): Test {
    return () => {
        it<[_SERVICE]>('makes a simple query call', async (actor) => {
            const result = await actor.simpleQuery();

            expect(result).toBe('This is a query function');
        });
    };
}
