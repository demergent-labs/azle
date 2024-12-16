import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/stable_b_tree_map_instruction_threshold';
import { getTests } from './tests';

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