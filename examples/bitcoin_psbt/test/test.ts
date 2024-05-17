import { getCanisterId } from 'azle/dfx';
import { whileRunningBitcoinDaemon } from 'azle/examples/basic_bitcoin/test/test';
import { runTests } from 'azle/test';

import { getTests } from './tests';

const canisterId = getCanisterId('bitcoin_psbt');

whileRunningBitcoinDaemon(() => runTests(getTests(canisterId)));
