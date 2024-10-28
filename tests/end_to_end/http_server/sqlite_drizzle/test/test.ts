import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'sqlite_drizzle/test/tests';

const canisterName = 'sqlite_drizzle';
const canisterId = getCanisterId(canisterName);

runTests(getTests(canisterId), canisterName);
