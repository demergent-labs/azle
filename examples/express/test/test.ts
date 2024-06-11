import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { getTests } from './tests';

const canisterName = 'express';

const canisterId = getCanisterId(canisterName);

runTests(canisterName, getTests(canisterId));
