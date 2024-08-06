globalThis._azleExperimental = true;

import { beforeAll } from '@jest/globals';
import { jsonParse, jsonStringify } from 'azle/experimental';
import { GetUtxosResult, Utxo } from 'azle/experimental/canisters/management';
import { expect, it, please, Test, wait } from 'azle/test';
import { Transaction } from 'bitcoinjs-lib';

import {
    createWallet,
    generate,
    generateToAddress,
    getMempoolCount,
    getTransaction
} from './bitcoin';

export const P2PKH_ADDRESS_FORM = 'mhVmPSYFraAYnA4ZP6KUx41P3dKgAg27Cm'; // p2pkh-address on the regtest will generally be of this form, starting with m or n and this many characters.
const SINGLE_BLOCK_REWARD = 5_000_000_000n;
const FIRST_MINING_SESSION = 101;
const FIRST_AMOUNT_SENT = SINGLE_BLOCK_REWARD / 2n;
const SECOND_AMOUNT_SENT = SINGLE_BLOCK_REWARD * 2n;
const TO_ADDRESS = 'n4HY51WrdxATGEPqYvoNkEsTteRfuRMxpD';
const FULL_FEE_PERCENTILE_LENGTH = 101;

type BasicBitcoinContext = {
    lastTxid: string;
    toAddressPreviousBalance: bigint;
    canisterPreviousBalance: bigint;
};

let context: BasicBitcoinContext;

export type AddressFunc = (origin: string) => Promise<string>;

export function getTests(
    canisterId: string,
    getAddress: AddressFunc,
    addressForm: string
): Test {
    const origin = `http://${canisterId}.localhost:8000`;
    return () => {
        beforeAll(async () => {
            context = {
                lastTxid: '',
                toAddressPreviousBalance: 0n,
                canisterPreviousBalance: 0n
            };
        });

        please('set up a minting wallet', () => {
            createWallet('minty');
        });

        it('gets the canister address from /get-address', async () => {
            const address = await getAddress(origin);

            expect(address.length).toBe(addressForm.length);
        });

        it('gets the canister balance from /get-balance before any transactions or rewards', async () => {
            const address = await getAddress(origin);
            const balance = await getBalance(origin, address);

            expect(balance).toBe(0n);
        }, 10_000);

        please(`mine ${FIRST_MINING_SESSION} blocks`, async () => {
            const address = await getAddress(origin);
            generateToAddress(address, FIRST_MINING_SESSION);
        });

        wait('for blocks to settle', 30_000);

        it('gets the canister balance from /get-balance after mining rewards have been received', async () => {
            const address = await getAddress(origin);
            const balance = await getBalance(origin, address);

            expect(balance).toBe(
                SINGLE_BLOCK_REWARD * BigInt(FIRST_MINING_SESSION)
            );
        }, 10_000);

        it('gets the canister utxos from /get-utxos after mining rewards have been received', async () => {
            const address = await getAddress(origin);

            const response = await fetch(
                `${origin}/get-utxos?address=${address}`,
                { headers: [['X-Ic-Force-Update', 'true']] }
            );
            const utxosResult: GetUtxosResult = await jsonParse(
                await response.text()
            );

            expect(utxosResult.tip_height).toBe(FIRST_MINING_SESSION);
            expect(utxosResult.utxos.length).toBe(FIRST_MINING_SESSION);
            expect(checkUtxos(utxosResult.utxos)).toBe(true);
        }, 10_000);

        it('gets an empty array from /get-current-fee-percentiles since no transactions have happened yet', async () => {
            const response = await fetch(
                `${origin}/get-current-fee-percentiles`,
                { headers: [['X-Ic-Force-Update', 'true']] }
            );

            const feePercentiles = jsonParse(await response.text());

            expect(feePercentiles.length).toBe(0);
        });

        it(`gets the balance of ${TO_ADDRESS} with /get-balance before ${TO_ADDRESS} receives any transactions`, async () => {
            const balance = await getBalance(origin, TO_ADDRESS);

            expect(balance).toBe(0n);
        }, 10_000);

        it(`sends ${FIRST_AMOUNT_SENT} from canister to ${TO_ADDRESS} with /send`, async () => {
            const body = jsonStringify({
                amountInSatoshi: FIRST_AMOUNT_SENT,
                destinationAddress: TO_ADDRESS
            });
            const response = await fetch(`${origin}/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            });
            const lastTxid = await response.text();
            context = { ...context, lastTxid };

            expect(lastTxid).toHaveLength(64);
        }, 30_000);

        please('wait for transaction to appear in mempool', waitForMempool);

        please('mine a block with the latest transaction', () => generate(1));

        wait('for blocks to settle', 15_000);

        it(`gets balance of ${TO_ADDRESS} after receiving ${FIRST_AMOUNT_SENT}`, async () => {
            const balance = await getBalance(origin, TO_ADDRESS);
            const toAddressPreviousBalance = balance;

            context = { ...context, toAddressPreviousBalance };
            expect(balance).toBe(FIRST_AMOUNT_SENT);
        }, 10_000);

        it(`gets balance of canister after sending ${FIRST_AMOUNT_SENT}`, async () => {
            const address = await getAddress(origin);
            const balance = await getBalance(origin, address);
            const canisterPreviousBalance = balance;

            // At the time this transaction was made, the canister only had utxos from block rewards.
            // The amount sent and the fee was less than the reward from minting a single block so there will be only one input and it will have the value of that reward.
            const fee = getFeeFromTransaction(
                context.lastTxid,
                SINGLE_BLOCK_REWARD
            );

            const blockRewards =
                SINGLE_BLOCK_REWARD * BigInt(FIRST_MINING_SESSION);

            const expectedBalance = blockRewards - FIRST_AMOUNT_SENT - fee;

            context = { ...context, canisterPreviousBalance };
            expect(balance).toBe(expectedBalance);
        }, 10_000);

        it(`gets an array of length ${FULL_FEE_PERCENTILE_LENGTH} from /get-current-fee-percentiles since transaction data now exists`, async () => {
            const response = await fetch(
                `${origin}/get-current-fee-percentiles`,
                { headers: [['X-Ic-Force-Update', 'true']] }
            );

            const feePercentiles = jsonParse(await response.text());

            expect(feePercentiles.length).toBe(FULL_FEE_PERCENTILE_LENGTH);
        });

        const blocksToMine = 10;
        please(
            `generate ${blocksToMine} blocks to ensure that enough of the canister's block rewards are available to spend`,
            async () => {
                generate(blocksToMine);
            }
        );

        it(`sends ${SECOND_AMOUNT_SENT} from canister to ${TO_ADDRESS}`, async () => {
            const body = jsonStringify({
                amountInSatoshi: SECOND_AMOUNT_SENT,
                destinationAddress: TO_ADDRESS
            });
            const response = await fetch(`${origin}/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            });
            const lastTxid = await response.text();
            context = { ...context, lastTxid };

            expect(lastTxid).toHaveLength(64);
        }, 30_000);

        please('wait for transaction to appear in mempool', waitForMempool);

        please('mine a block with the latest transaction', () => generate(1));

        wait('for blocks to settle', 15_000);

        it(`gets balance of ${TO_ADDRESS} after receiving an additional ${SECOND_AMOUNT_SENT}`, async () => {
            const balance = await getBalance(origin, TO_ADDRESS);
            const expectedBalance =
                context.toAddressPreviousBalance + SECOND_AMOUNT_SENT;

            expect(balance).toBe(expectedBalance);
        }, 10_000);

        it(`gets balance of canister after sending an additional ${SECOND_AMOUNT_SENT}`, async () => {
            const address = await getAddress(origin);
            const balance = await getBalance(origin, address);

            // At the time this transaction was made, the next utxos to use will be from block rewards.
            // The amount sent and the fee were more than the reward from minting two blocks so there will be three inputs and it will have the value of those rewards.
            const fee = getFeeFromTransaction(
                context.lastTxid,
                SINGLE_BLOCK_REWARD * 3n
            );

            const expectedBalance =
                context.canisterPreviousBalance - SECOND_AMOUNT_SENT - fee;

            expect(balance).toBe(expectedBalance);
        }, 10_000);

        it(`gets an array of length ${FULL_FEE_PERCENTILE_LENGTH} from /get-current-fee-percentiles since transaction data still exists`, async () => {
            const response = await fetch(
                `${origin}/get-current-fee-percentiles`,
                { headers: [['X-Ic-Force-Update', 'true']] }
            );

            const feePercentiles = jsonParse(await response.text());

            expect(feePercentiles.length).toBe(FULL_FEE_PERCENTILE_LENGTH);
        });

        please(
            'mine a block to see if it resets the fee percentiles',
            async () => {
                generate(1);
            }
        );

        wait('for blocks to settle', 15_000);

        it(`gets an array of length ${FULL_FEE_PERCENTILE_LENGTH} from /get-current-fee-percentiles even after a block with no transactions`, async () => {
            const response = await fetch(
                `${origin}/get-current-fee-percentiles`,
                { headers: [['X-Ic-Force-Update', 'true']] }
            );

            const feePercentiles = jsonParse(await response.text());

            expect(feePercentiles.length).toBe(FULL_FEE_PERCENTILE_LENGTH);
        });
    };
}

/**
 * The fee is determined by finding the difference between the total value of the inputs minus the total value of the outputs
 * The value of the outputs is easily found by looking at the transaction with the provided txid
 * The value of the inputs is not easily calculated automatically and must be provided
 * @param txid
 * @param totalInputValue
 * @returns
 */
function getFeeFromTransaction(txid: string, totalInputValue: bigint): bigint {
    const previousTransaction = getTransaction(txid);
    const outputValue = BigInt(getTotalOutput(previousTransaction));
    return totalInputValue - outputValue;
}

function getTotalOutput(tx: Transaction): number {
    return tx.outs.reduce((total, output) => {
        return total + output.value;
    }, 0);
}

export async function getP2pkhAddress(origin: string): Promise<string> {
    const response = await fetch(`${origin}/get-p2pkh-address`, {
        headers: [['X-Ic-Force-Update', 'true']]
    });
    return await response.text();
}

async function getBalance(origin: string, address: string): Promise<bigint> {
    const response = await fetch(`${origin}/get-balance?address=${address}`, {
        headers: [['X-Ic-Force-Update', 'true']]
    });
    return jsonParse(await response.text());
}

function checkUtxos(utxos: Utxo[]): boolean {
    return utxos.every(
        (utxo) => utxo.value === SINGLE_BLOCK_REWARD && utxo.outpoint.vout === 0
    );
}

async function waitForMempool(): Promise<void> {
    for (let i = 0; i < 60; i++) {
        if (getMempoolCount() > 0) {
            console.info('done waiting');
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1_000));
    }
    throw new Error('Timeout: Transaction was not added to the mempool');
}
