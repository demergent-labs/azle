import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';

import { getTests } from './tests';

const canisterName = 'apollo_server';
const canisterId = getCanisterId(canisterName);

runTests(getTests(canisterId), canisterName);
