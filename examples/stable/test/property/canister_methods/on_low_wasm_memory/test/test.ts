import { runTests } from 'azle/test';

import { getTests } from './tests';

runTests(getTests(), undefined, undefined, {
    shouldSetupAgent: false
});
