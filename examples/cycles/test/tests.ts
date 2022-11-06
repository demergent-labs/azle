import { ok, Test } from 'azle/test';
import { _SERVICE as CYCLES_CANISTER_SERVICE } from './dfx_generated/cycles/cycles.did';
import { _SERVICE as INTERMEDIARY_CANISTER_SERVICE } from './dfx_generated/intermediary/intermediary.did';
import { ActorSubclass } from '@dfinity/agent';

export function get_tests(
    cycles_canister: ActorSubclass<CYCLES_CANISTER_SERVICE>,
    intermediary_canister: ActorSubclass<INTERMEDIARY_CANISTER_SERVICE>
): Test[] {
    return [
        {
            name: 'initial get_canister_balance',
            test: async () => {
                const intermediary_canister_result =
                    await intermediary_canister.get_canister_balance();
                const cycles_canister_result =
                    await cycles_canister.get_canister_balance();

                const intermediary_canister128_result =
                    await intermediary_canister.get_canister_balance128();
                const cycles_canister128_result =
                    await cycles_canister.get_canister_balance128();

                return {
                    ok:
                        intermediary_canister_result > 2_500_000_000_000n &&
                        intermediary_canister_result < 4_000_000_000_000n &&
                        cycles_canister_result > 2_500_000_000_000n &&
                        cycles_canister_result < 4_000_000_000_000n &&
                        intermediary_canister128_result > 2_500_000_000_000n &&
                        intermediary_canister128_result < 4_000_000_000_000n &&
                        cycles_canister128_result > 2_500_000_000_000n &&
                        cycles_canister128_result < 4_000_000_000_000n
                };
            }
        },
        {
            name: 'msg_cycles_available and msg_cycles_accept with 0 cycles sent',
            test: async () => {
                const result = await cycles_canister.receive_cycles();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'msg_cycles_available128 and msg_cycles_accept128 with 0 cycles sent',
            test: async () => {
                const result = await cycles_canister.receive_cycles128();

                return {
                    ok: result === 0n
                };
            }
        },
        {
            name: 'msg_cycles_refunded',
            test: async () => {
                const refund_result = await intermediary_canister.send_cycles();

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
                const refund_result =
                    await intermediary_canister.send_cycles128();

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
                const send_cycles_notify_result =
                    await intermediary_canister.send_cycles_notify();

                if ('err' in send_cycles_notify_result) {
                    return {
                        err: JSON.stringify(send_cycles_notify_result.err)
                    };
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
                    ok: send_cycles_notify_result.ok === null
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
                const send_cycles128_notify_result =
                    await intermediary_canister.send_cycles128_notify();

                if ('err' in send_cycles128_notify_result) {
                    return {
                        err: JSON.stringify(send_cycles128_notify_result.err)
                    };
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
                    ok: send_cycles128_notify_result.ok === null
                    // intermediary_canister_result === 3_999_998_000_000n &&
                    // cycles_canister_result === 4_000_002_000_000n &&
                    // intermediary_canister128_result === 3_999_998_000_000n &&
                    // cycles_canister128_result === 4_000_002_000_000n
                };
            }
        }
    ];
}
