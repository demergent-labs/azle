import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';

import { getTests } from './tests';

const canisterName = 'backend';
const canisterId = getCanisterId(canisterName);

runTests(getTests(canisterId), canisterName);
