import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';

import { getTests } from './tests';

const canisterId = getCanisterId('sqlite_drizzle');

runTests(getTests(canisterId));
