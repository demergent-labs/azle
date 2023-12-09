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

                const keysResult =
                    await stableBTreeMapInstructionThresholdCanister.keysSmallRecord(
                        5_000
                    );

                const valuesResult =
                    await stableBTreeMapInstructionThresholdCanister.valuesSmallRecord(
                        6_000
                    );

                const itemsResult =
                    await stableBTreeMapInstructionThresholdCanister.itemsSmallRecord(
                        2_000
                    );

                return {
                    Ok:
                        keysResult.length === 5_000 &&
                        valuesResult.length === 6_000 &&
                        itemsResult.length === 2_000
                };
            }
        },
        {
            name: 'test MediumRecord',
            test: async () => {
                await stableBTreeMapInstructionThresholdCanister.insertMediumRecord(
                    5_000
                );

                const keysResult =
                    await stableBTreeMapInstructionThresholdCanister.keysMediumRecord(
                        1_000
                    );

                const valuesResult =
                    await stableBTreeMapInstructionThresholdCanister.valuesMediumRecord(
                        1_000
                    );

                const itemsResult =
                    await stableBTreeMapInstructionThresholdCanister.itemsMediumRecord(
                        1_000
                    );

                return {
                    Ok:
                        keysResult.length === 1_000 &&
                        valuesResult.length === 1_000 &&
                        itemsResult.length === 1_000
                };
            }
        },
        {
            name: 'test LargeRecord',
            test: async () => {
                await stableBTreeMapInstructionThresholdCanister.insertLargeRecord(
                    2_000
                );

                const keysResult =
                    await stableBTreeMapInstructionThresholdCanister.keysLargeRecord(
                        500
                    );

                const valuesResult =
                    await stableBTreeMapInstructionThresholdCanister.valuesLargeRecord(
                        500
                    );

                const itemsResult =
                    await stableBTreeMapInstructionThresholdCanister.itemsLargeRecord(
                        400
                    );

                return {
                    Ok:
                        keysResult.length === 500 &&
                        valuesResult.length === 500 &&
                        itemsResult.length === 400
                };
            }
        }
    ];
}
