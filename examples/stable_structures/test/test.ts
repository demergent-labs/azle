import { runTests, Test } from 'azle/test';
import { execSync } from 'child_process';
import { createActor as createActorCanister1 } from './dfx_generated/canister1';
import { createActor as createActorCanister2 } from './dfx_generated/canister2';
import { createActor as createActorCanister3 } from './dfx_generated/canister3';
import { _SERVICE } from './dfx_generated/canister3/canister3.did';
import { preRedeployTests, postRedeployTests, insertErrorTests } from './tests';

const stableStructuresCanister_1 = createActorCanister1(
    'rrkah-fqaaa-aaaaa-aaaaq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const stableStructuresCanister_2 = createActorCanister2(
    'ryjl3-tyaaa-aaaaa-aaaba-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);
const stableStructuresCanister_3 = createActorCanister3(
    'r7inp-6aaaa-aaaaa-aaabq-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    ...preRedeployTests(stableStructuresCanister_1, 0, 4),
    ...preRedeployTests(stableStructuresCanister_2, 5, 9),
    ...preRedeployTests(stableStructuresCanister_3, 10, 13),
    {
        name: 'redeploy canisters',
        prep: async () => {
            execSync('dfx deploy', { stdio: 'inherit' });
        }
    },
    ...postRedeployTests(stableStructuresCanister_1, 0, 4),
    ...postRedeployTests(stableStructuresCanister_2, 5, 9),
    ...postRedeployTests(stableStructuresCanister_3, 10, 13),
    ...insertErrorTests(stableStructuresCanister_1, stableStructuresCanister_3)
];

runTests(tests);
