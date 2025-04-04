import { afterAll, beforeAll, describe } from '@jest/globals';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'bitcoin_end_to_end_test_functional_syntax/test/tests';

import { createActor } from './dfx_generated/bitcoin';
import { BitcoinDaemon, startBitcoinDaemon } from './setup';

const canisterName = 'bitcoin';
const bitcoinCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:4943',
        shouldFetchRootKey: true
    }
});

runTests(() => {
    let bitcoinDaemon: BitcoinDaemon;

    beforeAll(async () => {
        bitcoinDaemon = await startBitcoinDaemon();
    }, 60_000);

    afterAll(() => {
        bitcoinDaemon.kill();
    });

    describe(
        'runs bitcoin tests while bitcoin daemon is running',
        getTests(bitcoinCanister)
    );
});
