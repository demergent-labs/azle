import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test/jest';

import { createActor } from '../src/declarations';
import { getTests } from './tests';

const canisterName = 'superheroes';

const superheroesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(canisterName, getTests(superheroesCanister));
