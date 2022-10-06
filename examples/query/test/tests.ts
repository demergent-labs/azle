import { Test } from 'azle/test';

export function get_tests(query_canister: any): Test[] {
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
