import { runTests } from 'azle/test/jest';

import { getTests } from './tests';

runTests('fetch_ic', getTests('backend'));
