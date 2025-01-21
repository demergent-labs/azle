import { ActorSubclass, HttpAgent } from '@dfinity/agent';
import { runTests } from 'azle/test';

import { getCanisterId } from '../../../../../../../dfx';
import { createActor } from './dfx_generated/query';
import { _SERVICE } from './dfx_generated/query/query.did';
import { getTests } from './tests';

const canisterName = 'query';

async function createQueryCanister(): Promise<ActorSubclass<_SERVICE>> {
    const canisterId = getCanisterId(canisterName);
    const newAgent = await HttpAgent.create({
        host: 'http://127.0.0.1:8000',
        shouldFetchRootKey: true
    });
    return createActor(canisterId, { agent: newAgent });
}

runTests(getTests(), [createQueryCanister], canisterName);
