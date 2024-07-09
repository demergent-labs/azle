import { getTests } from 'audio_recorder_end_to_end_test_functional_syntax/test/tests';
import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { createActor } from './dfx_generated/audio_recorder';

const audioRecorderCanister = createActor(getCanisterId('audio_recorder'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(audioRecorderCanister));
