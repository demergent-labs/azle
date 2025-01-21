import { HttpAgent } from '@dfinity/agent';
import { beforeAll } from '@jest/globals';
import { getCanisterId } from 'azle/dfx';

import { createActor } from './dfx_generated/query';

const canisterName = 'query';

beforeAll(async () => {
    const agent = await HttpAgent.create({
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    });

    global.queryCanister = createActor(getCanisterId(canisterName), {
        agent
    });
});
