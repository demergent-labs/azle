import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { getTests } from 'superheroes_end_to_end_test_functional_syntax/test/tests';

import { createActor } from '../src/declarations';

const canisterName = 'superheroes';
const superheroesCanister = createActor(getCanisterId(canisterName), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(superheroesCanister), canisterName);
