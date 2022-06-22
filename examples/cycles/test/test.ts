import { cleanDeploy, run_tests, Test } from 'azle/test';
import { createActor } from '../test/dfx_generated/cycles';

const cycles_canister = createActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const tests: Test[] = [
    ...cleanDeploy('cycles'),
    {
        name: 'msg_cycles_accept',
        test: async () => {
            const result = await cycles_canister.msgCyclesAccept(1000n);
            // TODO: DFX 0.9.3 doesn't have full cycle support so for now this
            // will always return `0n`.
            // See https://github.com/demergent-labs/azle/issues/433
            return {
                ok: result === 0n
            };
        }
    }
];

run_tests(tests);
