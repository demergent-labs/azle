import { getTests } from '@azle/sqlite/test/tests';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';

const canisterName = 'sqlite_typeorm';
const canisterId = getCanisterId(canisterName);

runTests(getTests(canisterId));
