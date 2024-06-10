import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Test } from 'azle/test';

import { getCanisterId } from '../../../dfx';
import {
    _SERVICE as ActorConsumer,
    Payment,
    PeriodicBatch
} from './actor_consumer';
import { _SERVICE as ActorWallet } from './dfx_generated/wallet/wallet.did';

const CONSUMER_CANISTER_ID = getCanisterId('consumer');
const WALLET_CANISTER_ID = getCanisterId('wallet');

let periodicBatch3: PeriodicBatch | undefined;
let periodicBatch4: PeriodicBatch | undefined;

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
                const lastPeriodicBatchOpt =
                    await actorConsumer._azle_open_value_sharing_last_periodic_batch();
                const lastPeriodicBatch = lastPeriodicBatchOpt[0];

                const periodicBatches =
                    await actorConsumer._azle_open_value_sharing_all_periodic_batches();

                return {
                    Ok:
                        lastPeriodicBatch !== undefined &&
                        lastPeriodicBatch.total_amount === 0n &&
                        lastPeriodicBatch.time_end >=
                            lastPeriodicBatch.time_start &&
                        lastPeriodicBatch.payments.length === 0 &&
                        periodicBatches.length === 1
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
                const lastPeriodicBatchOpt =
                    await actorConsumer._azle_open_value_sharing_last_periodic_batch();
                const lastPeriodicBatch = lastPeriodicBatchOpt[0];

                const periodicBatches =
                    await actorConsumer._azle_open_value_sharing_all_periodic_batches();

                const periodicBatch1 = periodicBatches[0];
                const periodicBatch2 = periodicBatches[1];

                return {
                    Ok:
                        periodicBatches.length === 2 &&
                        periodicBatch1.total_amount === 0n &&
                        periodicBatch1.time_end >= periodicBatch1.time_start &&
                        periodicBatch1.payments.length === 0 &&
                        periodicBatch2.total_amount === 0n &&
                        periodicBatch2.time_end >= periodicBatch2.time_start &&
                        periodicBatch2.payments.length === 0 &&
                        lastPeriodicBatch !== undefined &&
                        lastPeriodicBatch.total_amount ===
                            periodicBatch2.total_amount &&
                        lastPeriodicBatch.time_start ===
                            periodicBatch2.time_start &&
                        lastPeriodicBatch.time_end ===
                            periodicBatch2.time_end &&
                        lastPeriodicBatch.payments.length ===
                            periodicBatch2.payments.length
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
                    Principal.fromText(CONSUMER_CANISTER_ID)
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
                const lastPeriodicBatchOpt =
                    await actorConsumer._azle_open_value_sharing_last_periodic_batch();
                const lastPeriodicBatch = lastPeriodicBatchOpt[0];

                const periodicBatches =
                    await actorConsumer._azle_open_value_sharing_all_periodic_batches();

                const periodicBatch1 = periodicBatches[0];
                const periodicBatch2 = periodicBatches[1];
                periodicBatch3 = periodicBatches[2];

                return {
                    Ok:
                        periodicBatches.length === 3 &&
                        periodicBatch1.total_amount === 0n &&
                        periodicBatch1.time_end >= periodicBatch1.time_start &&
                        periodicBatch1.payments.length === 0 &&
                        periodicBatch2.total_amount === 0n &&
                        periodicBatch2.time_end >= periodicBatch2.time_start &&
                        periodicBatch2.payments.length === 0 &&
                        periodicBatch3 !== undefined &&
                        periodicBatchIsCorrect(periodicBatch3) &&
                        lastPeriodicBatch !== undefined &&
                        lastPeriodicBatch.total_amount ===
                            periodicBatch3.total_amount &&
                        lastPeriodicBatch.time_start ===
                            periodicBatch3.time_start &&
                        lastPeriodicBatch.time_end ===
                            periodicBatch3.time_end &&
                        lastPeriodicBatch.payments.length ===
                            periodicBatch3.payments.length
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

                if (periodicBatch3 === undefined) {
                    return {
                        Err: 'periodicBatch3 is not defined'
                    };
                }

                const payment0 = periodicBatch3.payments[0];
                const payment1 = periodicBatch3.payments[1];
                const payment2 = periodicBatch3.payments[2];
                const payment3 = periodicBatch3.payments[3];
                const payment4 = periodicBatch3.payments[4];
                const payment5 = periodicBatch3.payments[5];

                return {
                    Ok:
                        results.length === 6 &&
                        walletPaymentEqualsPayment(walletPayment0, payment0) &&
                        walletPaymentEqualsPayment(walletPayment1, payment1) &&
                        walletPaymentEqualsPayment(walletPayment2, payment2) &&
                        walletPaymentEqualsPayment(walletPayment3, payment3) &&
                        walletPaymentEqualsPayment(walletPayment4, payment4) &&
                        walletPaymentEqualsPayment(walletPayment5, payment5)
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
                const lastPeriodicBatchOpt =
                    await actorConsumer._azle_open_value_sharing_last_periodic_batch();
                const lastPeriodicBatch = lastPeriodicBatchOpt[0];

                const periodicBatches =
                    await actorConsumer._azle_open_value_sharing_all_periodic_batches();

                const periodicBatch1 = periodicBatches[0];
                const periodicBatch2 = periodicBatches[1];
                const periodicBatch3 = periodicBatches[2];
                periodicBatch4 = periodicBatches[3];

                return {
                    Ok:
                        periodicBatches.length === 4 &&
                        periodicBatch1.total_amount === 0n &&
                        periodicBatch1.time_end >= periodicBatch1.time_start &&
                        periodicBatch1.payments.length === 0 &&
                        periodicBatch2.total_amount === 0n &&
                        periodicBatch2.time_end >= periodicBatch2.time_start &&
                        periodicBatch2.payments.length === 0 &&
                        periodicBatchIsCorrect(periodicBatch3) &&
                        periodicBatch4 !== undefined &&
                        periodicBatchIsCorrect(periodicBatch4) &&
                        lastPeriodicBatch !== undefined &&
                        lastPeriodicBatch.total_amount ===
                            periodicBatch4.total_amount &&
                        lastPeriodicBatch.time_start ===
                            periodicBatch4.time_start &&
                        lastPeriodicBatch.time_end ===
                            periodicBatch4.time_end &&
                        lastPeriodicBatch.payments.length ===
                            periodicBatch4.payments.length
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

                if (periodicBatch4 === undefined) {
                    return {
                        Err: 'periodicBatch4 is not defined'
                    };
                }

                const payment0 = periodicBatch4.payments[0];
                const payment1 = periodicBatch4.payments[1];
                const payment2 = periodicBatch4.payments[2];
                const payment3 = periodicBatch4.payments[3];
                const payment4 = periodicBatch4.payments[4];
                const payment5 = periodicBatch4.payments[5];

                return {
                    Ok:
                        results.length === 12 &&
                        walletPaymentEqualsPayment(walletPayment6, payment0) &&
                        walletPaymentEqualsPayment(walletPayment7, payment1) &&
                        walletPaymentEqualsPayment(walletPayment8, payment2) &&
                        walletPaymentEqualsPayment(walletPayment9, payment3) &&
                        walletPaymentEqualsPayment(walletPayment10, payment4) &&
                        walletPaymentEqualsPayment(walletPayment11, payment5)
                };
            }
        }
    ];
}

function periodicBatchIsCorrect(periodicBatch: PeriodicBatch): boolean {
    const payment0 = periodicBatch.payments[0];
    const payment1 = periodicBatch.payments[1];
    const payment2 = periodicBatch.payments[2];
    const payment3 = periodicBatch.payments[3];
    const payment4 = periodicBatch.payments[4];
    const payment5 = periodicBatch.payments[5];

    const payment0CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        1n,
        1n,
        1n
    );
    const payment0IsCorrect =
        payment0.name === 'azle' &&
        payment0.amount === payment0CalculatedAmount &&
        'Ok' in payment0.success;

    const payment1CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        2n,
        3n
    );
    const payment1IsCorrect =
        payment1.name === 'typescript' &&
        payment1.amount === payment1CalculatedAmount &&
        'Ok' in payment1.success;

    const payment2CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        1n,
        3n
    );
    const payment2IsCorrect =
        payment2.name === 'unpipe' &&
        payment2.amount === payment2CalculatedAmount &&
        'Ok' in payment2.success;

    const payment3CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        3n,
        6n
    );
    const payment3IsCorrect =
        payment3.name === 'hasown' &&
        payment3.amount === payment3CalculatedAmount &&
        'Ok' in payment3.success;

    const payment4CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        2n,
        6n
    );
    const payment4IsCorrect =
        payment4.name === 'safer-buffer' &&
        payment4.amount === payment4CalculatedAmount &&
        'Ok' in payment4.success;

    const payment5CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        1n,
        6n
    );
    const payment5IsCorrect =
        payment5.name === 'side-channel' &&
        payment5.amount === payment5CalculatedAmount &&
        'Ok' in payment5.success;

    return (
        periodicBatch.time_end >= periodicBatch.time_start &&
        periodicBatch.total_amount > 0n &&
        periodicBatch.payments.length === 6 &&
        payment0IsCorrect &&
        payment1IsCorrect &&
        payment2IsCorrect &&
        payment3IsCorrect &&
        payment4IsCorrect &&
        payment5IsCorrect
    );
}

function calculatePaymentAmount(
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

function walletPaymentEqualsPayment(
    walletPayment: WalletPayment,
    payment: Payment
): boolean {
    return (
        walletPayment.amount === payment.amount &&
        walletPayment.principal.toText() === CONSUMER_CANISTER_ID &&
        payment.principal.toText() === WALLET_CANISTER_ID
    );
}
