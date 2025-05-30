import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/stable_b_tree_map_instruction_threshold';
import { getTests } from './tests';

const canisterName = 'stable_b_tree_map_instruction_threshold';
const stableBTreeMapInstructionThresholdCanister = createActor(
    getCanisterId(canisterName),
    {
        agentOptions: {
            host: 'http://127.0.0.1:4943',
            shouldFetchRootKey: true
        }
    }
);

runTests(getTests(stableBTreeMapInstructionThresholdCanister));
