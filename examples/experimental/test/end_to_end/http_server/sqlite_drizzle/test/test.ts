import { getTests } from '@azle/sqlite_end_to_end_test/test/tests';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

const canisterName = 'sqlite_drizzle';
const canisterId = getCanisterId(canisterName);

runTests(getTests(canisterId));
