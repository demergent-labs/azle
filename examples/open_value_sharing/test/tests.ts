import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Test } from 'azle/test';

import {
    _SERVICE as ActorConsumer,
    IndividualPayout,
    PeriodicPayout
} from './actor_consumer';
import { _SERVICE as ActorWallet } from './dfx_generated/wallet/wallet.did';

let periodicPayout3: PeriodicPayout | undefined;
let periodicPayout4: PeriodicPayout | undefined;

export function getTests(
    actorConsumer: ActorConsumer,
    actorWallet: ActorWallet,
    agent: HttpAgent
): Test[] {
    return [
        {
            name: 'call agent.fetchRootKey()',
            prep: async () => {
                await agent.fetchRootKey();
            }
        },
        {
            name: 'consumer ovs logs should have initial 0 payment',
            test: async () => {
                const lastPeriodicPayoutOpt =
                    await actorConsumer._azle_open_value_sharing_last_periodic_payout();
                const lastPeriodicPayout = lastPeriodicPayoutOpt[0];

                const periodicPayouts =
                    await actorConsumer._azle_open_value_sharing_all_periodic_payouts();

                return {
                    Ok:
                        lastPeriodicPayout !== undefined &&
                        lastPeriodicPayout.total_amount === 0n &&
                        lastPeriodicPayout.time_completed >=
                            lastPeriodicPayout.time_started &&
                        lastPeriodicPayout.individual_payouts.length === 0 &&
                        periodicPayouts.length === 1
                };
            }
        },
        {
            name: 'wallet ovs logs should be empty',
            test: async () => {
                const results = await actorWallet.get_all_payments();

                return {
                    Ok: results.length === 0
                };
            }
        },
        {
            name: 'wallet whitelist should be empty',
            test: async () => {
                const results = await actorWallet.get_whitelist();

                return {
                    Ok: results.length === 0
                };
            }
        },
        {
            name: 'wait for period of 1 minute to elapse',
            wait: 65_000
        },
        {
            name: 'consumer ovs logs should have two payments',
            test: async () => {
                const lastPeriodicPayoutOpt =
                    await actorConsumer._azle_open_value_sharing_last_periodic_payout();
                const lastPeriodicPayout = lastPeriodicPayoutOpt[0];

                const periodicPayouts =
                    await actorConsumer._azle_open_value_sharing_all_periodic_payouts();

                const periodicPayout1 = periodicPayouts[0];
                const periodicPayout2 = periodicPayouts[1];

                return {
                    Ok:
                        periodicPayouts.length === 2 &&
                        periodicPayout1.total_amount === 0n &&
                        periodicPayout1.time_completed >=
                            periodicPayout1.time_started &&
                        periodicPayout1.individual_payouts.length === 0 &&
                        periodicPayout2.total_amount === 0n &&
                        periodicPayout2.time_completed >=
                            periodicPayout2.time_started &&
                        periodicPayout2.individual_payouts.length === 0 &&
                        lastPeriodicPayout !== undefined &&
                        lastPeriodicPayout.total_amount ===
                            periodicPayout2.total_amount &&
                        lastPeriodicPayout.time_started ===
                            periodicPayout2.time_started &&
                        lastPeriodicPayout.time_completed ===
                            periodicPayout2.time_completed &&
                        lastPeriodicPayout.individual_payouts.length ===
                            periodicPayout2.individual_payouts.length
                };
            }
        },
        {
            name: 'wallet ovs logs should still be empty',
            test: async () => {
                const results = await actorWallet.get_all_payments();

                return {
                    Ok: results.length === 0
                };
            }
        },
        {
            name: 'add consumer to wallet whitelist',
            prep: async () => {
                await actorWallet.add_to_whitelist(
                    Principal.fromText('br5f7-7uaaa-aaaaa-qaaca-cai')
                );
            }
        },
        {
            name: 'wait for period of 1 minute to elapse',
            wait: 65_000
        },
        {
            name: 'consumer ovs logs should have three payments',
            test: async () => {
                const lastPeriodicPayoutOpt =
                    await actorConsumer._azle_open_value_sharing_last_periodic_payout();
                const lastPeriodicPayout = lastPeriodicPayoutOpt[0];

                const periodicPayouts =
                    await actorConsumer._azle_open_value_sharing_all_periodic_payouts();

                const periodicPayout1 = periodicPayouts[0];
                const periodicPayout2 = periodicPayouts[1];
                periodicPayout3 = periodicPayouts[2];

                return {
                    Ok:
                        periodicPayouts.length === 3 &&
                        periodicPayout1.total_amount === 0n &&
                        periodicPayout1.time_completed >=
                            periodicPayout1.time_started &&
                        periodicPayout1.individual_payouts.length === 0 &&
                        periodicPayout2.total_amount === 0n &&
                        periodicPayout2.time_completed >=
                            periodicPayout2.time_started &&
                        periodicPayout2.individual_payouts.length === 0 &&
                        periodicPayout3 !== undefined &&
                        periodicPayoutIsCorrect(periodicPayout3) &&
                        lastPeriodicPayout !== undefined &&
                        lastPeriodicPayout.total_amount ===
                            periodicPayout3.total_amount &&
                        lastPeriodicPayout.time_started ===
                            periodicPayout3.time_started &&
                        lastPeriodicPayout.time_completed ===
                            periodicPayout3.time_completed &&
                        lastPeriodicPayout.individual_payouts.length ===
                            periodicPayout3.individual_payouts.length
                };
            }
        },
        {
            name: 'wallet ovs logs should have 6 payments',
            test: async () => {
                const results = await actorWallet.get_all_payments();

                const walletPayment0 = results[0];
                const walletPayment1 = results[1];
                const walletPayment2 = results[2];
                const walletPayment3 = results[3];
                const walletPayment4 = results[4];
                const walletPayment5 = results[5];

                if (periodicPayout3 === undefined) {
                    return {
                        Err: 'periodicPayout3 is not defined'
                    };
                }

                const individualPayout0 = periodicPayout3.individual_payouts[0];
                const individualPayout1 = periodicPayout3.individual_payouts[1];
                const individualPayout2 = periodicPayout3.individual_payouts[2];
                const individualPayout3 = periodicPayout3.individual_payouts[3];
                const individualPayout4 = periodicPayout3.individual_payouts[4];
                const individualPayout5 = periodicPayout3.individual_payouts[5];

                return {
                    Ok:
                        results.length === 6 &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment0,
                            individualPayout0
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment1,
                            individualPayout1
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment2,
                            individualPayout2
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment3,
                            individualPayout3
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment4,
                            individualPayout4
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment5,
                            individualPayout5
                        )
                };
            }
        },
        {
            name: 'wait for period of 1 minute to elapse',
            wait: 65_000
        },
        {
            name: 'consumer ovs logs should have four payments',
            test: async () => {
                const lastPeriodicPayoutOpt =
                    await actorConsumer._azle_open_value_sharing_last_periodic_payout();
                const lastPeriodicPayout = lastPeriodicPayoutOpt[0];

                const periodicPayouts =
                    await actorConsumer._azle_open_value_sharing_all_periodic_payouts();

                const periodicPayout1 = periodicPayouts[0];
                const periodicPayout2 = periodicPayouts[1];
                const periodicPayout3 = periodicPayouts[2];
                periodicPayout4 = periodicPayouts[3];

                return {
                    Ok:
                        periodicPayouts.length === 4 &&
                        periodicPayout1.total_amount === 0n &&
                        periodicPayout1.time_completed >=
                            periodicPayout1.time_started &&
                        periodicPayout1.individual_payouts.length === 0 &&
                        periodicPayout2.total_amount === 0n &&
                        periodicPayout2.time_completed >=
                            periodicPayout2.time_started &&
                        periodicPayout2.individual_payouts.length === 0 &&
                        periodicPayoutIsCorrect(periodicPayout3) &&
                        periodicPayout4 !== undefined &&
                        periodicPayoutIsCorrect(periodicPayout4) &&
                        lastPeriodicPayout !== undefined &&
                        lastPeriodicPayout.total_amount ===
                            periodicPayout4.total_amount &&
                        lastPeriodicPayout.time_started ===
                            periodicPayout4.time_started &&
                        lastPeriodicPayout.time_completed ===
                            periodicPayout4.time_completed &&
                        lastPeriodicPayout.individual_payouts.length ===
                            periodicPayout4.individual_payouts.length
                };
            }
        },
        {
            name: 'wallet ovs logs should have 12 payments',
            test: async () => {
                const results = await actorWallet.get_all_payments();

                const walletPayment6 = results[6];
                const walletPayment7 = results[7];
                const walletPayment8 = results[8];
                const walletPayment9 = results[9];
                const walletPayment10 = results[10];
                const walletPayment11 = results[11];

                if (periodicPayout4 === undefined) {
                    return {
                        Err: 'periodicPayout4 is not defined'
                    };
                }

                const individualPayout0 = periodicPayout4.individual_payouts[0];
                const individualPayout1 = periodicPayout4.individual_payouts[1];
                const individualPayout2 = periodicPayout4.individual_payouts[2];
                const individualPayout3 = periodicPayout4.individual_payouts[3];
                const individualPayout4 = periodicPayout4.individual_payouts[4];
                const individualPayout5 = periodicPayout4.individual_payouts[5];

                return {
                    Ok:
                        results.length === 12 &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment6,
                            individualPayout0
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment7,
                            individualPayout1
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment8,
                            individualPayout2
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment9,
                            individualPayout3
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment10,
                            individualPayout4
                        ) &&
                        walletPaymentEqualsIndividualPayment(
                            walletPayment11,
                            individualPayout5
                        )
                };
            }
        }
    ];
}

function periodicPayoutIsCorrect(periodicPayout: PeriodicPayout): boolean {
    const individualPayout0 = periodicPayout.individual_payouts[0];
    const individualPayout1 = periodicPayout.individual_payouts[1];
    const individualPayout2 = periodicPayout.individual_payouts[2];
    const individualPayout3 = periodicPayout.individual_payouts[3];
    const individualPayout4 = periodicPayout.individual_payouts[4];
    const individualPayout5 = periodicPayout.individual_payouts[5];

    const individualPayout0CalculatedAmount =
        calculateDependencyPeriodicPaymentAmount(
            periodicPayout.total_amount,
            1n,
            1n,
            1n
        );
    const individualPayout0IsCorrect =
        individualPayout0.name === 'azle' &&
        individualPayout0.amount === individualPayout0CalculatedAmount &&
        'Ok' in individualPayout0.success;

    const individualPayout1CalculatedAmount =
        calculateDependencyPeriodicPaymentAmount(
            periodicPayout.total_amount,
            2n,
            2n,
            3n
        );
    const individualPayout1IsCorrect =
        individualPayout1.name === 'typescript' &&
        individualPayout1.amount === individualPayout1CalculatedAmount &&
        'Ok' in individualPayout1.success;

    const individualPayout2CalculatedAmount =
        calculateDependencyPeriodicPaymentAmount(
            periodicPayout.total_amount,
            2n,
            1n,
            3n
        );
    const individualPayout2IsCorrect =
        individualPayout2.name === 'unpipe' &&
        individualPayout2.amount === individualPayout2CalculatedAmount &&
        'Ok' in individualPayout2.success;

    const individualPayout3CalculatedAmount =
        calculateDependencyPeriodicPaymentAmount(
            periodicPayout.total_amount,
            2n,
            3n,
            6n
        );
    const individualPayout3IsCorrect =
        individualPayout3.name === 'hasown' &&
        individualPayout3.amount === individualPayout3CalculatedAmount &&
        'Ok' in individualPayout3.success;

    const individualPayout4CalculatedAmount =
        calculateDependencyPeriodicPaymentAmount(
            periodicPayout.total_amount,
            2n,
            2n,
            6n
        );
    const individualPayout4IsCorrect =
        individualPayout4.name === 'safer-buffer' &&
        individualPayout4.amount === individualPayout4CalculatedAmount &&
        'Ok' in individualPayout4.success;

    const individualPayout5CalculatedAmount =
        calculateDependencyPeriodicPaymentAmount(
            periodicPayout.total_amount,
            2n,
            1n,
            6n
        );
    const individualPayout5IsCorrect =
        individualPayout5.name === 'side-channel' &&
        individualPayout5.amount === individualPayout5CalculatedAmount &&
        'Ok' in individualPayout5.success;

    return (
        periodicPayout.time_completed >= periodicPayout.time_started &&
        periodicPayout.total_amount > 0n &&
        periodicPayout.individual_payouts.length === 6 &&
        individualPayout0IsCorrect &&
        individualPayout1IsCorrect &&
        individualPayout2IsCorrect &&
        individualPayout3IsCorrect &&
        individualPayout4IsCorrect &&
        individualPayout5IsCorrect
    );
}

function calculateDependencyPeriodicPaymentAmount(
    totalAmount: bigint,
    depth: bigint,
    weight: bigint,
    totalLevelWeight: bigint
): bigint {
    const dependencyLevelPeriodicPaymentAmount = totalAmount / 2n ** depth;
    const dependencyRatio = (weight * totalAmount) / totalLevelWeight;

    return (
        (dependencyLevelPeriodicPaymentAmount * dependencyRatio) / totalAmount
    );
}

type WalletPayment = {
    time: bigint;
    amount: bigint;
    principal: Principal;
};

function walletPaymentEqualsIndividualPayment(
    walletPayment: WalletPayment,
    individualPayment: IndividualPayout
): boolean {
    return (
        walletPayment.amount === individualPayment.amount &&
        walletPayment.principal.toText() === 'br5f7-7uaaa-aaaaa-qaaca-cai' &&
        individualPayment.principal.toText() === 'bw4dl-smaaa-aaaaa-qaacq-cai'
    );
}
