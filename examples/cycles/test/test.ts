import { cleanDeploy, run_tests, Test } from 'azle/test';
import { createActor as createCyclesActor } from '../test/dfx_generated/cycles';
import { createActor as createIntermediaryActor } from '../test/dfx_generated/intermediary';

const cycles_canister = createCyclesActor('rrkah-fqaaa-aaaaa-aaaaq-cai', {
    agentOptions: {
        host: 'http://127.0.0.1:8000'
    }
});

const intermediary_canister = createIntermediaryActor(
    'ryjl3-tyaaa-aaaaa-aaaba-cai',
    {
        agentOptions: {
            host: 'http://127.0.0.1:8000'
        }
    }
);

const tests: Test[] = [
    ...cleanDeploy('cycles', 'intermediary'),
    {
        name: 'msg_cycles_available and msg_cycles_accept',
        test: async () => {
            const result = await cycles_canister.sendCycles();
            // TODO: DFX 0.9.3 doesn't have full cycle support so for now this
            // will always return `0n`.
            // See https://github.com/demergent-labs/azle/issues/433
            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'msg_cycles_available128 and msg_cycles_accept128',
        test: async () => {
            const result = await cycles_canister.sendCycles128();
            // TODO: DFX 0.9.3 doesn't have full cycle support so for now this
            // will always return `0n`.
            // See https://github.com/demergent-labs/azle/issues/433
            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'msg_cycles_refunded',
        test: async () => {
            const result = await intermediary_canister.reportRefund();
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
