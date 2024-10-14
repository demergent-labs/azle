import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/audio_recorder';
import { getTests } from './tests';

const canisterName = 'audio_recorder';
const audio_recorder_canister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(audio_recorder_canister), canisterName);
