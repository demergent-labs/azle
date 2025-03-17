import { runTests } from 'azle/_internal/test';

import { getTests } from './tests';

const canisterName = 'backend';

runTests(getTests(canisterName));
