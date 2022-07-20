// TODO If we want these tests to be more exact, we can check balances and make sure they are within some margin of error

import { deploy, ok, run_tests, Test } from 'azle/test';
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
    ...deploy('cycles'), // TODO for now these tests need to be run on a fresh dfx start --clean, since cycles are not discarded on uninstall-code
    ...deploy('intermediary'), // TODO for now these tests need to be run on a fresh dfx start --clean, since cycles are not discarded on uninstall-code
    {
        name: 'initial getCanisterBalance',
        test: async () => {
            const intermediary_canister_result =
                await intermediary_canister.getCanisterBalance();
            const cycles_canister_result =
                await cycles_canister.getCanisterBalance();

            const intermediary_canister128_result =
                await intermediary_canister.getCanisterBalance128();
            const cycles_canister128_result =
                await cycles_canister.getCanisterBalance128();

            return {
                ok:
                    intermediary_canister_result > 3_000_000_000_000n &&
                    intermediary_canister_result < 4_000_000_000_000n &&
                    cycles_canister_result > 3_000_000_000_000n &&
                    cycles_canister_result < 4_000_000_000_000n &&
                    intermediary_canister128_result > 3_000_000_000_000n &&
                    intermediary_canister128_result < 4_000_000_000_000n &&
                    cycles_canister128_result > 3_000_000_000_000n &&
                    cycles_canister128_result < 4_000_000_000_000n
            };
        }
    },
    {
        name: 'msg_cycles_available and msg_cycles_accept with 0 cycles sent',
        test: async () => {
            const result = await cycles_canister.receiveCycles();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'msg_cycles_available128 and msg_cycles_accept128 with 0 cycles sent',
        test: async () => {
            const result = await cycles_canister.receiveCycles128();

            return {
                ok: result === 0n
            };
        }
    },
    {
        name: 'msg_cycles_refunded',
        test: async () => {
            const refund_result = await intermediary_canister.sendCycles();

            if (!ok(refund_result)) {
                return { err: refund_result.err };
            }

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediary_canister_result =
            //     await intermediary_canister.getCanisterBalance();
            // const cycles_canister_result =
            //     await cycles_canister.getCanisterBalance();

            // const intermediary_canister128_result =
            //     await intermediary_canister.getCanisterBalance128();
            // const cycles_canister128_result =
            //     await cycles_canister.getCanisterBalance128();

            return {
                ok: refund_result.ok === 500_000n
                // intermediary_canister_result === 3_999_999_500_000n &&
                // cycles_canister_result === 4_000_000_500_000n &&
                // intermediary_canister128_result === 3_999_999_500_000n &&
                // cycles_canister128_result === 4_000_000_500_000n
            };
        }
    },
    {
        name: 'msg_cycles_refunded128',
        test: async () => {
            const refund_result = await intermediary_canister.sendCycles128();

            if (!ok(refund_result)) {
                return { err: refund_result.err };
            }

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediary_canister_result =
            //     await intermediary_canister.getCanisterBalance();
            // const cycles_canister_result =
            //     await cycles_canister.getCanisterBalance();

            // const intermediary_canister128_result =
            //     await intermediary_canister.getCanisterBalance128();
            // const cycles_canister128_result =
            //     await cycles_canister.getCanisterBalance128();

            return {
                ok: refund_result.ok === 500_000n
                // intermediary_canister_result === 3_999_999_000_000n &&
                // cycles_canister_result === 4_000_001_000_000n &&
                // intermediary_canister128_result === 3_999_999_000_000n &&
                // cycles_canister128_result === 4_000_001_000_000n
            };
        }
    },
    {
        name: 'send cycles with notify',
        test: async () => {
            const sendCyclesNotifyResult =
                await intermediary_canister.sendCyclesNotify();

            if (!ok(sendCyclesNotifyResult)) {
                return { err: sendCyclesNotifyResult.err };
            }

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediary_canister_result =
            //     await intermediary_canister.getCanisterBalance();
            // const cycles_canister_result =
            //     await cycles_canister.getCanisterBalance();

            // const intermediary_canister128_result =
            //     await intermediary_canister.getCanisterBalance128();
            // const cycles_canister128_result =
            //     await cycles_canister.getCanisterBalance128();

            return {
                ok: sendCyclesNotifyResult.ok === null
                // intermediary_canister_result === 3_999_998_500_000n &&
                // cycles_canister_result === 4_000_001_500_000n &&
                // intermediary_canister128_result === 3_999_998_500_000n &&
                // cycles_canister128_result === 4_000_001_500_000n
            };
        }
    },
    {
        name: 'send cycles128 with notify',
        test: async () => {
            const sendCycles128NotifyResult =
                await intermediary_canister.sendCycles128Notify();

            if (!ok(sendCycles128NotifyResult)) {
                return { err: sendCycles128NotifyResult.err };
            }

            // TODO It would be a bit messy and difficult to try and do this
            // const intermediary_canister_result =
            //     await intermediary_canister.getCanisterBalance();
            // const cycles_canister_result =
            //     await cycles_canister.getCanisterBalance();

            // const intermediary_canister128_result =
            //     await intermediary_canister.getCanisterBalance128();
            // const cycles_canister128_result =
            //     await cycles_canister.getCanisterBalance128();

            return {
                ok: sendCycles128NotifyResult.ok === null
                // intermediary_canister_result === 3_999_998_000_000n &&
                // cycles_canister_result === 4_000_002_000_000n &&
                // intermediary_canister128_result === 3_999_998_000_000n &&
                // cycles_canister128_result === 4_000_002_000_000n
            };
        }
    }
];

run_tests(tests);
