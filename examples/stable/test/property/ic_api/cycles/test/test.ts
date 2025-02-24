import { runTests } from 'azle/_internal/test';

import { getTests } from './tests';

const canisterNames = ['cycles', 'intermediary'];
runTests(getTests(), canisterNames);
