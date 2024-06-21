import { afterAll, beforeAll, describe } from '@jest/globals';
import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from './dfx_generated/bitcoin';
import { BitcoinDaemon, startBitcoinDaemon } from './setup';
import { getTests } from './tests';

const bitcoinCanister = createActor(getCanisterId('bitcoin'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
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
