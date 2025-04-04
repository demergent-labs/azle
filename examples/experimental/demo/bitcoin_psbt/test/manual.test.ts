import { getTests } from '@azle/basic_bitcoin_demo/test/tests';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { getP2wpkhAddress, P2WPKH_ADDRESS_FORM } from './tests';

const canisterName = 'bitcoin_psbt';
const canisterId = getCanisterId(canisterName);

// Allows running of the tests without starting and stopping a Bitcoin daemon
// automatically. That is to say you will need to start and stop the Bitcoin
// daemon manually. Great for running cli commands after or during the tests to
// check the state of the test network
runTests(getTests(canisterId, getP2wpkhAddress, P2WPKH_ADDRESS_FORM));
