import { HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { expect, it, please, Test, wait } from 'azle/test';

import { getCanisterId } from '../../../dfx';
import {
    _SERVICE as ConsumerActor,
    Payment,
    PeriodicBatch
} from './consumer_actor';
import { _SERVICE as WalletActor } from './dfx_generated/wallet/wallet.did';

const CONSUMER_CANISTER_ID = getCanisterId('consumer');
const WALLET_CANISTER_ID = getCanisterId('wallet');

let periodicBatch3: PeriodicBatch | undefined;
let periodicBatch4: PeriodicBatch | undefined;

export function getTests(
    consumerActor: ConsumerActor,
    walletActor: WalletActor,
    agent: HttpAgent
): Test {
    return () => {
        please('call agent.fetchRootKey()', async () => {
            await agent.fetchRootKey();
        });

        it('consumer ovs logs should have initial 0 batch', async () => {
            const lastPeriodicBatchOpt =
                await consumerActor._azle_open_value_sharing_last_periodic_batch();
            const lastPeriodicBatch = lastPeriodicBatchOpt[0];

            const periodicBatches =
                await consumerActor._azle_open_value_sharing_all_periodic_batches();

            const expectedResult = {
                total_amount: 0n,
                payments: []
            };

            expect(lastPeriodicBatch).not.toBeUndefined();

            if (lastPeriodicBatch !== undefined) {
                expect(lastPeriodicBatch).toEqual(
                    expect.objectContaining(expectedResult)
                );
                expect(lastPeriodicBatch.time_end).toBeGreaterThanOrEqual(
                    lastPeriodicBatch.time_start
                );
                expect(periodicBatches).toHaveLength(1);
            }
        });

        it('wallet ovs logs should be empty', async () => {
            const results = await walletActor.get_all_payments();

            expect(results).toHaveLength(0);
        });

        it('wallet whitelist should be empty', async () => {
            const results = await walletActor.get_whitelist();

            expect(results).toHaveLength(0);
        });

        wait('for period of 1 minute to elapse', 65_000);

        it('consumer ovs logs should have two batches', async () => {
            const lastPeriodicBatchOpt =
                await consumerActor._azle_open_value_sharing_last_periodic_batch();
            const lastPeriodicBatch = lastPeriodicBatchOpt[0];

            const periodicBatches =
                await consumerActor._azle_open_value_sharing_all_periodic_batches();

            const periodicBatch1 = periodicBatches[0];
            const periodicBatch2 = periodicBatches[1];

            const expectedPeriodicBatch = {
                total_amount: 0n,
                payments: []
            };

            expect(periodicBatch1).toEqual(
                expect.objectContaining(expectedPeriodicBatch)
            );
            expect(periodicBatch2).toEqual(
                expect.objectContaining(expectedPeriodicBatch)
            );
            expect(periodicBatch1.time_end).toBeGreaterThanOrEqual(
                periodicBatch1.time_start
            );
            expect(periodicBatch2.time_end).toBeGreaterThanOrEqual(
                periodicBatch2.time_start
            );
            expect(periodicBatch2).toEqual(lastPeriodicBatch);
        });

        it('wallet ovs logs should still be empty', async () => {
            const results = await walletActor.get_all_payments();

            expect(results).toHaveLength(0);
        });

        please('add consumer to wallet whitelist', async () => {
            await walletActor.add_to_whitelist(
                Principal.fromText(CONSUMER_CANISTER_ID)
            );
        });

        wait('for period of 1 minute to elapse', 65_000);

        it('consumer ovs logs should have three batches', async () => {
            const lastPeriodicBatchOpt =
                await consumerActor._azle_open_value_sharing_last_periodic_batch();
            const lastPeriodicBatch = lastPeriodicBatchOpt[0];

            const periodicBatches =
                await consumerActor._azle_open_value_sharing_all_periodic_batches();

            expect(periodicBatches).toHaveLength(3);
            const periodicBatch1 = periodicBatches[0];
            const periodicBatch2 = periodicBatches[1];
            periodicBatch3 = periodicBatches[2];

            expect(periodicBatch1.total_amount).toBe(0n);
            expect(periodicBatch1.time_end).toBeGreaterThanOrEqual(
                periodicBatch1.time_start
            );
            expect(periodicBatch1.payments.length).toBe(0);

            expect(periodicBatch2.total_amount).toBe(0n);
            expect(periodicBatch2.time_end).toBeGreaterThanOrEqual(
                periodicBatch2.time_start
            );
            expect(periodicBatch2.payments.length).toBe(0);

            periodicBatchIsCorrect(periodicBatch3);
            expect(periodicBatch3).not.toBeUndefined();
            expect(periodicBatch3).toStrictEqual(lastPeriodicBatch);
        });

        it('wallet ovs logs should have 6 payments', async () => {
            const results = await walletActor.get_all_payments();

            const walletPayment0 = results[0];
            const walletPayment1 = results[1];
            const walletPayment2 = results[2];
            const walletPayment3 = results[3];
            const walletPayment4 = results[4];
            const walletPayment5 = results[5];

            expect(periodicBatch3).not.toBeUndefined();

            if (periodicBatch3 !== undefined) {
                const payment0 = periodicBatch3.payments[0];
                const payment1 = periodicBatch3.payments[1];
                const payment2 = periodicBatch3.payments[2];
                const payment3 = periodicBatch3.payments[3];
                const payment4 = periodicBatch3.payments[4];
                const payment5 = periodicBatch3.payments[5];

                expect(results).toHaveLength(6);
                walletPaymentEqualsPayment(walletPayment0, payment0);
                walletPaymentEqualsPayment(walletPayment1, payment1);
                walletPaymentEqualsPayment(walletPayment2, payment2);
                walletPaymentEqualsPayment(walletPayment3, payment3);
                walletPaymentEqualsPayment(walletPayment4, payment4);
                walletPaymentEqualsPayment(walletPayment5, payment5);
            }
        });

        wait('for period of 1 minute to elapse', 65_000);

        it('consumer ovs logs should have four batches', async () => {
            const lastPeriodicBatchOpt =
                await consumerActor._azle_open_value_sharing_last_periodic_batch();
            const lastPeriodicBatch = lastPeriodicBatchOpt[0];

            const periodicBatches =
                await consumerActor._azle_open_value_sharing_all_periodic_batches();

            expect(periodicBatches).toHaveLength(4);
            const periodicBatch1 = periodicBatches[0];
            const periodicBatch2 = periodicBatches[1];
            const periodicBatch3 = periodicBatches[2];
            periodicBatch4 = periodicBatches[3];

            expect(periodicBatch1.total_amount).toBe(0n);
            expect(periodicBatch1.time_end).toBeGreaterThanOrEqual(
                periodicBatch1.time_start
            );
            expect(periodicBatch1.payments.length).toBe(0);

            expect(periodicBatch2.total_amount).toBe(0n);
            expect(periodicBatch2.time_end).toBeGreaterThanOrEqual(
                periodicBatch2.time_start
            );
            expect(periodicBatch2.payments.length).toBe(0);

            expect(periodicBatch4).not.toBeUndefined();
            expect(periodicBatch4).toStrictEqual(lastPeriodicBatch);
            periodicBatchIsCorrect(periodicBatch3);
            periodicBatchIsCorrect(periodicBatch4);
        });

        it('wallet ovs logs should have 12 payments', async () => {
            const results = await walletActor.get_all_payments();

            const walletPayment6 = results[6];
            const walletPayment7 = results[7];
            const walletPayment8 = results[8];
            const walletPayment9 = results[9];
            const walletPayment10 = results[10];
            const walletPayment11 = results[11];

            expect(periodicBatch4).not.toBeUndefined();

            if (periodicBatch4 !== undefined) {
                const payment0 = periodicBatch4.payments[0];
                const payment1 = periodicBatch4.payments[1];
                const payment2 = periodicBatch4.payments[2];
                const payment3 = periodicBatch4.payments[3];
                const payment4 = periodicBatch4.payments[4];
                const payment5 = periodicBatch4.payments[5];

                expect(results).toHaveLength(12);
                walletPaymentEqualsPayment(walletPayment6, payment0);
                walletPaymentEqualsPayment(walletPayment7, payment1);
                walletPaymentEqualsPayment(walletPayment8, payment2);
                walletPaymentEqualsPayment(walletPayment9, payment3);
                walletPaymentEqualsPayment(walletPayment10, payment4);
                walletPaymentEqualsPayment(walletPayment11, payment5);
            }
        });
    };
}

function periodicBatchIsCorrect(periodicBatch: PeriodicBatch): void {
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
    const payment1CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        2n,
        3n
    );
    const payment2CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        1n,
        3n
    );
    const payment3CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        3n,
        6n
    );
    const payment4CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        2n,
        6n
    );
    const payment5CalculatedAmount = calculatePaymentAmount(
        periodicBatch.total_amount,
        2n,
        1n,
        6n
    );

    expect(payment0).toStrictEqual(
        expect.objectContaining({
            name: 'azle',
            payment_mechanism: 'wallet_receive',
            amount: payment0CalculatedAmount,
            success: { Ok: null }
        })
    );
    expect(payment1).toStrictEqual(
        expect.objectContaining({
            name: 'typescript',
            payment_mechanism: 'wallet_receive',
            amount: payment1CalculatedAmount,
            success: { Ok: null }
        })
    );
    expect(payment2).toStrictEqual(
        expect.objectContaining({
            name: 'unpipe',
            payment_mechanism: 'wallet_receive',
            amount: payment2CalculatedAmount,
            success: { Ok: null }
        })
    );
    expect(payment3).toStrictEqual(
        expect.objectContaining({
            name: 'hasown',
            payment_mechanism: 'wallet_receive',
            amount: payment3CalculatedAmount,
            success: { Ok: null }
        })
    );
    expect(payment4).toStrictEqual(
        expect.objectContaining({
            name: 'safer-buffer',
            payment_mechanism: 'wallet_receive',
            amount: payment4CalculatedAmount,
            success: { Ok: null }
        })
    );
    expect(payment5).toStrictEqual(
        expect.objectContaining({
            name: 'side-channel',
            payment_mechanism: 'wallet_receive',
            amount: payment5CalculatedAmount,
            success: { Ok: null }
        })
    );
    expect(periodicBatch.time_end).toBeGreaterThanOrEqual(
        periodicBatch.time_start
    );
    expect(periodicBatch.total_amount).toBeGreaterThan(0n);
    expect(periodicBatch.payments).toHaveLength(6);
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
): void {
    expect(walletPayment.amount).toBe(payment.amount);
    expect(walletPayment.principal.toText()).toBe(CONSUMER_CANISTER_ID);
    expect(payment.principal.toText()).toBe(WALLET_CANISTER_ID);
}
