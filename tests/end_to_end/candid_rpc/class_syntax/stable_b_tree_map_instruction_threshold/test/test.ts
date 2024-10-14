import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'stable_b_tree_map_instruction_threshold_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/stable_b_tree_map_instruction_threshold';

const canisterName = 'stable_b_tree_map_instruction_threshold';
const stableBTreeMapInstructionThresholdCanister = createActor(
    getCanisterId(canisterName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

runTests(getTests(stableBTreeMapInstructionThresholdCanister), canisterName);
