import { Test } from 'azle/test';
import { _SERVICE as CYCLESCANISTERSERVICE } from './dfx_generated/cycles/cycles.did';
import { _SERVICE as INTERMEDIARYCANISTERSERVICE } from './dfx_generated/intermediary/intermediary.did';
import { ActorSubclass } from '@dfinity/agent';

export function getTests(
    cyclesCanister: ActorSubclass<CYCLESCANISTERSERVICE>,
    intermediaryCanister: ActorSubclass<INTERMEDIARYCANISTERSERVICE>
): Test[] {
    return [
        {
            name: 'initial getCanisterBalance',
            test: async () => {
                const intermediaryCallResult =
                    await intermediaryCanister.getCanisterBalance();
                const cyclesCallResult =
                    await cyclesCanister.getCanisterBalance();

                const intermediaryCanister128Result =
                    await intermediaryCanister.getCanisterBalance128();
                const cyclesCanister128Result =
                    await cyclesCanister.getCanisterBalance128();

                return {
                    Ok:
                        intermediaryCallResult > 2_500_000_000_000n &&
                        intermediaryCallResult < 4_000_000_000_000n &&
                        cyclesCallResult > 2_500_000_000_000n &&
                        cyclesCallResult < 4_000_000_000_000n &&
                        intermediaryCanister128Result > 2_500_000_000_000n &&
                        intermediaryCanister128Result < 4_000_000_000_000n &&
                        cyclesCanister128Result > 2_500_000_000_000n &&
                        cyclesCanister128Result < 4_000_000_000_000n
                };
            }
        },
        {
            name: 'msgCyclesAvailable and msgCyclesAccept with 0 cycles sent',
            test: async () => {
                const result = await cyclesCanister.receiveCycles();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'msgCyclesAvailable128 and msgCyclesAccept128 with 0 cycles sent',
            test: async () => {
                const result = await cyclesCanister.receiveCycles128();

                return {
                    Ok: result === 0n
                };
            }
        },
        {
            name: 'msgCyclesRefunded',
            test: async () => {
                const refundResult = await intermediaryCanister.sendCycles();

                // TODO It would be a bit messy and difficult to try and do this
                // const intermediaryCallResult =
                //     await intermediaryCanister.getCanisterBalance();
                // const cyclesCallResult =
                //     await cyclesCanister.getCanisterBalance();

                // const intermediaryCanister128Result =
                //     await intermediaryCanister.getCanisterBalance128();
                // const cyclesCanister128Result =
                //     await cyclesCanister.getCanisterBalance128();

                return {
                    Ok: refundResult === 500_000n
                    // intermediaryCallResult === 3_999_999_500_000n &&
                    // cyclesCallResult === 4_000_000_500_000n &&
                    // intermediaryCanister128Result === 3_999_999_500_000n &&
                    // cyclesCanister128Result === 4_000_000_500_000n
                };
            }
        },
        {
            name: 'msgCyclesRefunded128',
            test: async () => {
                const refundResult = await intermediaryCanister.sendCycles128();

                // TODO It would be a bit messy and difficult to try and do this
                // const intermediaryCallResult =
                //     await intermediaryCanister.getCanisterBalance();
                // const cyclesCallResult =
                //     await cyclesCanister.getCanisterBalance();

                // const intermediaryCanister128Result =
                //     await intermediaryCanister.getCanisterBalance128();
                // const cyclesCanister128Result =
                //     await cyclesCanister.getCanisterBalance128();

                return {
                    Ok: refundResult === 500_000n
                    // intermediaryCallResult === 3_999_999_000_000n &&
                    // cyclesCallResult === 4_000_001_000_000n &&
                    // intermediaryCanister128Result === 3_999_999_000_000n &&
                    // cyclesCanister128Result === 4_000_001_000_000n
                };
            }
        },
        {
            name: 'send cycles with notify',
            test: async () => {
                const sendCyclesNotifyResult =
                    await intermediaryCanister.sendCyclesNotify();

                // TODO It would be a bit messy and difficult to try and do this
                // const intermediaryCallResult =
                //     await intermediaryCanister.getCanisterBalance();
                // const cyclesCallResult =
                //     await cyclesCanister.getCanisterBalance();

                // const intermediaryCanister128Result =
                //     await intermediaryCanister.getCanisterBalance128();
                // const cyclesCanister128Result =
                //     await cyclesCanister.getCanisterBalance128();

                return {
                    Ok: sendCyclesNotifyResult === undefined
                    // intermediaryCallResult === 3_999_998_500_000n &&
                    // cyclesCallResult === 4_000_001_500_000n &&
                    // intermediaryCanister128Result === 3_999_998_500_000n &&
                    // cyclesCanister128Result === 4_000_001_500_000n
                };
            }
        },
        {
            name: 'send cycles128 with notify',
            test: async () => {
                const sendCycles128NotifyResult =
                    await intermediaryCanister.sendCycles128Notify();

                // TODO It would be a bit messy and difficult to try and do this
                // const intermediaryCallResult =
                //     await intermediaryCanister.getCanisterBalance();
                // const cyclesCallResult =
                //     await cyclesCanister.getCanisterBalance();

                // const intermediaryCanister128Result =
                //     await intermediaryCanister.getCanisterBalance128();
                // const cyclesCanister128Result =
                //     await cyclesCanister.getCanisterBalance128();

                return {
                    Ok: sendCycles128NotifyResult === undefined
                    // intermediaryCallResult === 3_999_998_000_000n &&
                    // cyclesCallResult === 4_000_002_000_000n &&
                    // intermediaryCanister128Result === 3_999_998_000_000n &&
                    // cyclesCanister128Result === 4_000_002_000_000n
                };
            }
        }
    ];
}
