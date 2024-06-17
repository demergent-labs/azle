import { runTests } from 'azle/test/jest';

import { getTests } from './tests';

runTests(getTests('backend'));
