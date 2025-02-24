import { runTests } from 'azle/_internal/test';

import { getTests } from './tests';

const canisterName = 'cert-var';

runTests(getTests(), canisterName);
