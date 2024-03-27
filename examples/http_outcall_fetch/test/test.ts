import { runTests } from 'azle/test';
import { getCanisterId } from 'azle/dfx';
import { getTests } from './tests';

const canisterId = getCanisterId('server');

runTests(getTests(canisterId));
