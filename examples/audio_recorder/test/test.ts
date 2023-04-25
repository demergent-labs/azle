import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../test/dfx_generated/audio_recorder';
import { get_tests } from './tests';

const audio_recorder_canister = createActor(getCanisterId('audio_recorder'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(get_tests(audio_recorder_canister));
