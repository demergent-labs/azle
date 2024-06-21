import { get_tests } from 'audio_recorder_end_to_end_test_functional_syntax/test/tests';
import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from '../test/dfx_generated/audio_recorder';

const audio_recorder_canister = createActor(getCanisterId('audio_recorder'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(audio_recorder_canister));
