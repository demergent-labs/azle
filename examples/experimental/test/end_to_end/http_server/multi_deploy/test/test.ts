import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/test';

import { getTests } from './tests';

runTests(getTests(getCanisterId('multi_deploy')));
