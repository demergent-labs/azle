import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { whileRunningBitcoinDaemon } from './bitcoin_daemon';
import { getP2pkhAddress, getTests, P2PKH_ADDRESS_FORM } from './tests';

const canisterId = getCanisterId('basic_bitcoin');

whileRunningBitcoinDaemon(() =>
    runTests(getTests(canisterId, getP2pkhAddress, P2PKH_ADDRESS_FORM))
);
