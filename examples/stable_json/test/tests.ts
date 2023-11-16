import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/stable_json/stable_json.did';

export function getTests(stableJsonCanister: ActorSubclass<_SERVICE>): Test[] {
    return [
        {
            name: 'test SmallRecord',
            test: async () => {
                await stableJsonCanister.insertSmallRecord(10_000);

                const result =
                    await stableJsonCanister.valuesSmallRecord(6_000);

                return {
                    Ok: result.length === 6_000
                };
            }
        },
        {
            name: 'test MediumRecord',
            test: async () => {
                await stableJsonCanister.insertMediumRecord(5_000);

                const result =
                    await stableJsonCanister.valuesMediumRecord(1_000);

                return {
                    Ok: result.length === 1_000
                };
            }
        },
        {
            name: 'test LargeRecord',
            test: async () => {
                await stableJsonCanister.insertLargeRecord(2_000);

                const result = await stableJsonCanister.valuesLargeRecord(500);

                return {
                    Ok: result.length === 500
                };
            }
        }
    ];
}
