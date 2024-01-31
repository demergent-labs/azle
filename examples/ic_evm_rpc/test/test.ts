import { getCanisterId, runTests } from 'azle/test';
import { getTests } from './tests';

const canisterId = getCanisterId('ic_evm_rpc');

runTests(getTests(canisterId));
