// TODO if these tests break just delete azle/examples/hello_world/node_modules

import { execSync } from 'child_process';
import { getTests } from 'new_end_to_end_test_functional_syntax/test/tests';

import { runTests } from '../../../test'; // We don't want to install Azle

const canisterId = execSync(`cd hello_world && dfx canister id backend`)
    .toString()
    .trim();

runTests(getTests(canisterId));
