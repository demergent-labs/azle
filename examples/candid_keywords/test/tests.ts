import { ActorSubclass } from '@dfinity/agent';
import { succeed, Test, test } from 'azle/test';

import { _SERVICE } from './dfx_generated/candid_keywords/candid_keywords.did';

export function getTests(candid_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'test query with keyword name',
            test: async () => {
                await candid_canister.opt();

                return succeed();
            }
        },
        {
            name: 'test variant with some keyword options',
            test: async () => {
                const result = await candid_canister.variant();

                return test('query' in result && result.query === 'hello');
            }
        },
        {
            name: 'test record with every keyword',
            test: async () => {
                const result = await candid_canister.candidTypes();

                return test(
                    result.bool &&
                        result.query === 'query' &&
                        result.text === 'text' &&
                        result.null === null &&
                        result.record.age === 35
                );
            }
        }
    ];
}
