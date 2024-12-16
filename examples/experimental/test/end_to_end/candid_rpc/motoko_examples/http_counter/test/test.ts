import { runTests } from 'azle/test';

import { getTests } from './tests';

runTests(getTests(), 'http_counter');
