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
        name: 'msg_cycles_accept128',
        test: async () => {
            const result = await cycles_canister.msgCyclesAccept128(
                340_282_366_920_938_463_463_374_607_431_768_211_455n
            );
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
