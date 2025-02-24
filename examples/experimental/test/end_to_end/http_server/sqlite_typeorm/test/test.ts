import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { getTests } from 'sqlite_example/test/tests';

const canisterName = 'sqlite_typeorm';
const canisterId = getCanisterId(canisterName);

runTests(getTests(canisterId), canisterName);
