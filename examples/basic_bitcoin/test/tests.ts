import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { jsonParse, jsonStringify } from 'azle';
import { GetUtxosResult, Utxo } from 'azle/canisters/management';
import { AzleResult, Test } from 'azle/test';
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

let lastTxid = '';
let toAddressPreviousBalance = 0n;
let canisterPreviousBalance = 0n;

export type AddressFunc = (origin: string) => Promise<string>;

export function getTests(
    canisterId: string,
    getAddress: AddressFunc,
    addressForm: string
): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;
    return [
        {
            name: 'Set up minting wallet',
            prep: async () => {
                createWallet('minty');
            }
        },
        {
            name: '/get-address',
            test: async () => {
                const address = await getAddress(origin);

                return { Ok: addressForm.length === address.length };
            }
        },
        {
            name: '/get-balance',
            test: async () => {
                const address = await getAddress(origin);
                const balance = await getBalance(origin, address);

                return compareBalances(0n, balance);
            }
        },
        {
            name: 'first mint BTC',
            prep: async () => {
                const address = await getAddress(origin);
                generateToAddress(address, FIRST_MINING_SESSION);
            }
        },
        { name: 'wait for blocks to settle', wait: 30_000 },
        {
            name: '/get-balance',
            test: async () => {
                const address = await getAddress(origin);
                const balance = await getBalance(origin, address);

                return compareBalances(
                    SINGLE_BLOCK_REWARD * BigInt(FIRST_MINING_SESSION),
                    balance
                );
            }
        },
        {
            name: '/get-utxos',
            test: async () => {
                const address = await getAddress(origin);

                const response = await fetch(
                    `${origin}/get-utxos?address=${address}`,
                    { headers: [['X-Ic-Force-Update', 'true']] }
                );
                const utxosResult: GetUtxosResult = await jsonParse(
                    await response.text()
                );

                return {
                    Ok:
                        utxosResult.tip_height === FIRST_MINING_SESSION &&
                        utxosResult.utxos.length === FIRST_MINING_SESSION &&
                        checkUtxos(utxosResult.utxos)
                };
            }
        },
        {
            name: '/get-current-fee-percentiles',
            test: async () => {
                const response = await fetch(
                    `${origin}/get-current-fee-percentiles`,
                    { headers: [['X-Ic-Force-Update', 'true']] }
                );

                const feePercentiles = jsonParse(await response.text());

                // Though blocks are mined no transactions have happened yet so the list should still be empty
                return { Ok: feePercentiles.length === 0 };
            }
        },
        {
            name: `/get-balance of ${TO_ADDRESS}`,
            test: async () => {
                const balance = await getBalance(origin, TO_ADDRESS);

                return compareBalances(0n, balance);
            }
        },
        {
            name: `/send from canister to ${TO_ADDRESS}`,
            prep: async () => {
                const body = jsonStringify({
                    amountInSatoshi: FIRST_AMOUNT_SENT,
                    destinationAddress: TO_ADDRESS
                });
                const response = await fetch(`${origin}/send`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body
                });
                lastTxid = await response.text();
                console.info(lastTxid);
            }
        },
        {
            name: 'wait for transaction to appear in mempool',
            prep: waitForMempool
        },
        {
            name: 'mine a block with the latest transaction',
            prep: async () => {
                generate(1);
            }
        },
        { name: 'wait for blocks to settle', wait: 15_000 },
        {
            name: `/get-balance of ${TO_ADDRESS} final`,
            test: async () => {
                const balance = await getBalance(origin, TO_ADDRESS);
                toAddressPreviousBalance = balance;

                return compareBalances(FIRST_AMOUNT_SENT, balance);
            }
        },
        {
            name: '/get-balance final',
            test: async () => {
                const address = await getAddress(origin);
                const balance = await getBalance(origin, address);
                canisterPreviousBalance = balance;

                // At the time this transaction was made, the canister only had utxos from block rewards.
                // The amount sent and the fee was less than the reward from minting a single block so there will be only one input and it will have the value of that reward.
                const fee = getFeeFromTransaction(
                    lastTxid,
                    SINGLE_BLOCK_REWARD
                );

                const blockRewards =
                    SINGLE_BLOCK_REWARD * BigInt(FIRST_MINING_SESSION);

                const expectedBalance = blockRewards - FIRST_AMOUNT_SENT - fee;

                return compareBalances(expectedBalance, balance);
            }
        },
        {
            name: '/get-current-fee-percentiles',
            test: async () => {
                const response = await fetch(
                    `${origin}/get-current-fee-percentiles`,
                    { headers: [['X-Ic-Force-Update', 'true']] }
                );

                const feePercentiles = jsonParse(await response.text());

                return {
                    Ok: feePercentiles.length === 101
                };
            }
        },
        {
            name: "Generate blocks to ensure that enough of the canister's block rewards are available to spend",
            prep: async () => {
                generate(10);
            }
        },
        {
            name: `/send big from canister to ${TO_ADDRESS}`,
            prep: async () => {
                const body = jsonStringify({
                    amountInSatoshi: SECOND_AMOUNT_SENT,
                    destinationAddress: TO_ADDRESS
                });
                const response = await fetch(`${origin}/send`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body
                });
                lastTxid = await response.text();
                console.info(lastTxid);
            }
        },
        {
            name: 'wait for transaction to appear in mempool',
            prep: waitForMempool
        },
        {
            name: 'mine a block for the latest transaction',
            prep: async () => {
                generate(1);
            }
        },
        { name: 'wait for blocks to settle', wait: 15_000 },
        {
            name: `/get-balance of ${TO_ADDRESS} big`,
            test: async () => {
                const balance = await getBalance(origin, TO_ADDRESS);
                const expectedBalance =
                    toAddressPreviousBalance + SECOND_AMOUNT_SENT;

                return compareBalances(expectedBalance, balance);
            }
        },
        {
            name: '/get-balance big',
            test: async () => {
                const address = await getAddress(origin);
                const balance = await getBalance(origin, address);

                // At the time this transaction was made, the next utxos to use will be from block rewards.
                // The amount sent and the fee were more than the reward from minting two blocks so there will be three inputs and it will have the value of those rewards.
                const fee = getFeeFromTransaction(
                    lastTxid,
                    SINGLE_BLOCK_REWARD * 3n
                );

                const expectedBalance =
                    canisterPreviousBalance - SECOND_AMOUNT_SENT - fee;

                return compareBalances(expectedBalance, balance);
            }
        },
        {
            name: '/get-current-fee-percentiles',
            test: async () => {
                const response = await fetch(
                    `${origin}/get-current-fee-percentiles`,
                    { headers: [['X-Ic-Force-Update', 'true']] }
                );

                const feePercentiles = jsonParse(await response.text());

                return {
                    Ok: feePercentiles.length === 101
                };
            }
        },
        {
            name: 'mine a block to see if it resets the fee percentiles',
            prep: async () => {
                generate(1);
            }
        },
        { name: 'wait for blocks to settle', wait: 15_000 },
        {
            name: '/get-current-fee-percentiles',
            test: async () => {
                const response = await fetch(
                    `${origin}/get-current-fee-percentiles`,
                    { headers: [['X-Ic-Force-Update', 'true']] }
                );

                const feePercentiles = jsonParse(await response.text());

                return {
                    Ok: feePercentiles.length === 101
                };
            }
        }
    ];
}

export function compareBalances(
    expected: bigint,
    actual: bigint
): AzleResult<boolean, string> {
    if (expected === actual) {
        return { Ok: true };
    } else {
        return { Err: `Expected: ${expected}, Received: ${actual}` };
    }
}

/**
 * The fee is determined by finding the difference between the total value of the inputs minus the total value of the outputs
 * The value of the outputs is easily found by looking at the transaction with the provided txid
 * The value of the inputs is not easily calculated automatically and must be provided
 * @param txid
 * @param totalInputValue
 * @returns
 */
export function getFeeFromTransaction(
    txid: string,
    totalInputValue: bigint
): bigint {
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

export async function getBalance(
    origin: string,
    address: string
): Promise<bigint> {
    const response = await fetch(`${origin}/get-balance?address=${address}`, {
        headers: [['X-Ic-Force-Update', 'true']]
    });
    return jsonParse(await response.text());
}

export function checkUtxos(utxos: Utxo[]): boolean {
    return utxos.every(
        (utxo) => utxo.value === SINGLE_BLOCK_REWARD && utxo.outpoint.vout === 0
    );
}

export async function waitForMempool() {
    for (let i = 0; i < 60; i++) {
        if (getMempoolCount() > 0) {
            console.info('done waiting');
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 1_000));
    }
    throw new Error('Timeout: Transaction was not added to the mempool');
}
