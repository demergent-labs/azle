import { getCanisterId } from 'azle/dfx';
import { getTests } from 'azle/examples/sqlite/test/tests';
import { runTests } from 'azle/test';

const canisterId = getCanisterId('sqlite_drizzle');

runTests(getTests(canisterId));
