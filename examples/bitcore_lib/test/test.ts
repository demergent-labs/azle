import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { getTests } from './tests';

const canisterId = getCanisterId('bitcore_lib');

runTests(getTests(canisterId));
