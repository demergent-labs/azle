import { expect, it, Test } from 'azle/test';

// @ts-ignore
import { _SERVICE } from '../dfx_generated/query/query.did';

export function getTests(): Test {
    return () => {
        it('makes a simple query call', async () => {
            const result = await global.queryCanister.simpleQuery();
            expect(result).toBe('This is a query function');
        });
    };
}
