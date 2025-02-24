import { runTests } from 'azle/_internal/test';

import { getTests } from './tests';

runTests(getTests(), 'http_counter');
