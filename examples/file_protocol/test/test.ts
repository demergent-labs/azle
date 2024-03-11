import { getCanisterId, runTests } from 'azle/test';
import { getTests } from './tests';

const canisterId = getCanisterId('backend');

runTests(getTests(canisterId));
