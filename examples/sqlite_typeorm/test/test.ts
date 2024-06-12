import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'sqlite_example/test/tests';

const canisterId = getCanisterId('sqlite_typeorm');

runTests(getTests(canisterId));
