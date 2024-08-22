import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from './dfx_generated/stable_b_tree_map_instruction_threshold/stable_b_tree_map_instruction_threshold.did';

export function getTests(
    stableBTreeMapInstructionThresholdCanister: ActorSubclass<_SERVICE>
): Test {
    return () => {
        it('test SmallRecord', async () => {
            await stableBTreeMapInstructionThresholdCanister.insertSmallRecord(
                10_000
            );

            const keysResult =
                await stableBTreeMapInstructionThresholdCanister.keysSmallRecord(
                    4_000
                );

            const valuesResult =
                await stableBTreeMapInstructionThresholdCanister.valuesSmallRecord(
                    4_000
                );

            const itemsResult =
                await stableBTreeMapInstructionThresholdCanister.itemsSmallRecord(
                    1_000
                );

            expect(keysResult).toHaveLength(4_000);
            expect(valuesResult).toHaveLength(4_000);
            expect(itemsResult).toHaveLength(1_000);
        }, 100_000);

        it('test MediumRecord', async () => {
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
                    900
                );

            expect(keysResult).toHaveLength(1_000);
            expect(valuesResult).toHaveLength(1_000);
            expect(itemsResult).toHaveLength(900);
        }, 100_000);

        it('test LargeRecord', async () => {
            await stableBTreeMapInstructionThresholdCanister.insertLargeRecord(
                2_000
            );

            const keysResult =
                await stableBTreeMapInstructionThresholdCanister.keysLargeRecord(
                    500
                );

            const valuesResult =
                await stableBTreeMapInstructionThresholdCanister.valuesLargeRecord(
                    300
                );

            const itemsResult =
                await stableBTreeMapInstructionThresholdCanister.itemsLargeRecord(
                    300
                );

            expect(keysResult).toHaveLength(500);
            expect(valuesResult).toHaveLength(300);
            expect(itemsResult).toHaveLength(300);
        }, 100_000);
    };
}
