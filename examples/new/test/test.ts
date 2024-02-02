// TODO if these tests break just delete azle/examples/hello_world/node_modules

import { execSync } from 'child_process';

import { runTests } from '../../../test'; // We don't want to install Azle
import { getTests } from './tests';

const canisterId = execSync(`cd hello_world && dfx canister id backend`)
    .toString()
    .trim();

runTests(getTests(canisterId));
