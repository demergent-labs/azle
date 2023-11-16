import { ActorSubclass } from '@dfinity/agent';
import { Test } from 'azle/test';
import { _SERVICE } from './dfx_generated/stable_b_tree_map_instruction_threshold/stable_b_tree_map_instruction_threshold.did';

export function getTests(
    stableBTreeMapInstructionThresholdCanister: ActorSubclass<_SERVICE>
): Test[] {
    return [
        {
            name: 'test SmallRecord',
            test: async () => {
                await stableBTreeMapInstructionThresholdCanister.insertSmallRecord(
                    10_000
                );

                const result =
                    await stableBTreeMapInstructionThresholdCanister.valuesSmallRecord(
                        6_000
                    );

                return {
                    Ok: result.length === 6_000
                };
            }
        },
        {
            name: 'test MediumRecord',
            test: async () => {
                await stableBTreeMapInstructionThresholdCanister.insertMediumRecord(
                    5_000
                );

                const result =
                    await stableBTreeMapInstructionThresholdCanister.valuesMediumRecord(
                        1_000
                    );

                return {
                    Ok: result.length === 1_000
                };
            }
        },
        {
            name: 'test LargeRecord',
            test: async () => {
                await stableBTreeMapInstructionThresholdCanister.insertLargeRecord(
                    2_000
                );

                const result =
                    await stableBTreeMapInstructionThresholdCanister.valuesLargeRecord(
                        500
                    );

                return {
                    Ok: result.length === 500
                };
            }
        }
    ];
}
