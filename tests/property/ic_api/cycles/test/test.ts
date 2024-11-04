import { runTests } from 'azle/test';

import { getTests } from './tests';

const canisterNames = ['cycles', 'intermediary'];
runTests(getTests(), canisterNames);
