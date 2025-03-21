import { afterAll, beforeAll, describe } from '@jest/globals';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { BitcoinDaemon, startBitcoinDaemon } from './bitcoin_daemon';
import { getP2pkhAddress, getTests, P2PKH_ADDRESS_FORM } from './tests';

const canisterName = 'basic_bitcoin';
const canisterId = getCanisterId(canisterName);

runTests(() => {
    let bitcoinDaemon: BitcoinDaemon;

    beforeAll(async () => {
        bitcoinDaemon = await startBitcoinDaemon();
    }, 60_000);

    afterAll(() => {
        bitcoinDaemon.kill();
    });

    describe(
        'runs basic bitcoin tests while bitcoin daemon is running',
        getTests(canisterId, getP2pkhAddress, P2PKH_ADDRESS_FORM)
    );
});
