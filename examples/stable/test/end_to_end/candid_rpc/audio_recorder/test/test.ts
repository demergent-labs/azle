import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/audio_recorder';
import { getTests } from './tests';

const canisterName = 'audio_recorder';
const audioRecorderCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(getTests(audioRecorderCanister));
