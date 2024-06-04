import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { getTests } from './tests';

const canisterName = 'autoreload';

const canisterId = getCanisterId(canisterName);

runTests(canisterName, getTests(canisterId));
