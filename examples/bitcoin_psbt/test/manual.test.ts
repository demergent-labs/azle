import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { getCanisterId } from 'azle/dfx';
import { describe } from 'azle/test/jest';
import { getTests } from 'basic_bitcoin/test/tests';

import { getP2wpkhAddress, P2WPKH_ADDRESS_FORM } from './tests';

const canisterId = getCanisterId('bitcoin_psbt');

// Allows running of the tests without starting and stopping a Bitcoin daemon
// automatically. That is to say you will need to start and stop the Bitcoin
// daemon manually. Great for running cli commands after or during the tests to
// check the state of the test network
describe(
    'Azle manual bitcoin psbt tests',
    getTests(canisterId, getP2wpkhAddress, P2WPKH_ADDRESS_FORM)
);
