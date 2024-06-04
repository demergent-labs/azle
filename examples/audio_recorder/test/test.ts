import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from '../test/dfx_generated/audio_recorder';
import { get_tests } from './tests';

const canisterName = 'audio_recorder';

const audio_recorder_canister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(canisterName, get_tests(audio_recorder_canister));
