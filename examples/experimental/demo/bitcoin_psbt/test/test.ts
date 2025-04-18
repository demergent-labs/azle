import {
    BitcoinDaemon,
    startBitcoinDaemon
} from '@azle/basic_bitcoin_demo/test/bitcoin_daemon';
import { getTests } from '@azle/basic_bitcoin_demo/test/tests';
import { afterAll, beforeAll, describe } from '@jest/globals';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

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
});
