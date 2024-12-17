import { runTests } from 'azle/test';

import { getTests } from './tests';

const canisterName = 'backend';

runTests(getTests(canisterName), canisterName);
