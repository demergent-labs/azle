import { afterAll, beforeAll, describe } from '@jest/globals';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { createActor } from './dfx_generated/bitcoin';
import { BitcoinDaemon, startBitcoinDaemon } from './setup';
import { getTests } from './tests';

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
        if (
            process.env.AZLE_RUNNING_IN_WSL !== 'true' &&
            process.env.AZLE_RUNNING_IN_MAC !== 'true'
        ) {
            console.info('Starting bitcoind for Bitcoin tests...');
            bitcoinDaemon = await startBitcoinDaemon();
        } else {
            console.info('Skipping bitcoind startup on Mac or WSL environment');
        }
    }, 60_000);

    afterAll(() => {
        if (bitcoinDaemon !== undefined && bitcoinDaemon.killed === false) {
            bitcoinDaemon.kill();
        }
    });

    describe(
        'runs bitcoin tests while bitcoin daemon is running',
        getTests(bitcoinCanister)
    );
});
