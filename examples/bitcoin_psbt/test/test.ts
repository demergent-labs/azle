import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { whileRunningBitcoinDaemon } from 'basic_bitcoin/test/bitcoin_daemon';
import { getTests } from 'basic_bitcoin/test/tests';

import { getP2wpkhAddress, P2WPKH_ADDRESS_FORM } from './tests';

const canisterId = getCanisterId('bitcoin_psbt');

whileRunningBitcoinDaemon(() =>
    runTests(getTests(canisterId, getP2wpkhAddress, P2WPKH_ADDRESS_FORM))
);
