import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

import { getTests } from './tests';

const canisterName = 'sqlite';
const canisterId = getCanisterId(canisterName);

runTests(getTests(canisterId));
