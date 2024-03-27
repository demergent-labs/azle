import { runTests } from 'azle/test';
import { getCanisterId } from '../../../dfx';
import { createActor } from './dfx_generated/rejections';
import { getTests } from './tests';

const rejectionsCanister = createActor(getCanisterId('rejections'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(rejectionsCanister));
