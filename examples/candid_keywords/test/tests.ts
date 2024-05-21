import { ActorSubclass } from '@dfinity/agent';
import { pass, Test } from 'azle/test';

import { _SERVICE } from './dfx_generated/candid_keywords/candid_keywords.did';

export function getTests(candid_canister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'test query with keyword name',
            test: async () => {
                await candid_canister.opt();

                return pass();
            }
        },
        {
            name: 'test variant with some keyword options',
            test: async () => {
                const result = await candid_canister.variant();

                return {
                    Ok: {
                        passes: 'query' in result && result.query === 'hello'
                    }
                };
            }
        },
        {
            name: 'test record with every keyword',
            test: async () => {
                const result = await candid_canister.candidTypes();

                return {
                    Ok: {
                        passes:
                            result.bool &&
                            result.query === 'query' &&
                            result.text === 'text' &&
                            result.null === null &&
                            result.record.age === 35
                    }
                };
            }
        }
    ];
}
