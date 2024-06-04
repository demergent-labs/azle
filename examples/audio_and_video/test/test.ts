import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { getTests } from './tests';

const canisterId = getCanisterId('backend');

runTests('audio_and_video', getTests(canisterId));
