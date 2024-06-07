import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'basic_bitcoin/test/tests';

import { getP2wpkhAddress, P2WPKH_ADDRESS_FORM } from './tests';

const canisterId = getCanisterId('bitcoin_psbt');

// Allows running of the tests without starting and stopping a Bitcoin daemon
// automatically. That is to say you will need to start and stop the Bitcoin
// daemon manually. Great for running cli commands after or during the tests to
// check the state of the test network
runTests(getTests(canisterId, getP2wpkhAddress, P2WPKH_ADDRESS_FORM));
