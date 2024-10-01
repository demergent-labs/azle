import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { getTests } from './tests';

runTests(getTests(getCanisterId('canister')));
