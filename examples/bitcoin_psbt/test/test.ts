import { afterAll, beforeAll, describe } from '@jest/globals';
import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import {
    BitcoinDaemon,
    startBitcoinDaemon
} from 'basic_bitcoin/test/bitcoin_daemon';
import { getTests } from 'basic_bitcoin/test/tests';

import { getP2wpkhAddress, P2WPKH_ADDRESS_FORM } from './tests';

const canisterName = 'bitcoin_psbt';
const canisterId = getCanisterId(canisterName);

let bitcoinDaemon: BitcoinDaemon;

runTests(() => {
    beforeAll(async () => {
        bitcoinDaemon = await startBitcoinDaemon();
    }, 60_000);

    afterAll(async () => {
        bitcoinDaemon.kill();
    });

    describe(
        'runs bitcoin psbt tests while bitcoin daemon is running',
        getTests(canisterId, getP2wpkhAddress, P2WPKH_ADDRESS_FORM)
    );
}, canisterName);
