import { runTests } from 'azle/test';

import { getTests } from './tests';

const canisterName = 'cert-var';

runTests(getTests(), canisterName);
