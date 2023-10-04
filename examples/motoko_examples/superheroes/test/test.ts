import { getCanisterId, runTests } from 'azle/test';
import { createActor } from '../src/declarations';
import { getTests } from './tests';

const superheroesCanister = createActor(getCanisterId('superheroes'), {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

runTests(getTests(superheroesCanister));
