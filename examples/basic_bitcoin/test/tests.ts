import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

// import * as ecc from 'tiny-secp256k1/lib/'; // TODO we should switch to this import as soon as we have wasm support
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import { jsonParse, jsonStringify } from 'azle';
import { GetUtxosResult, Utxo } from 'azle/canisters/management';
import { AzleResult, Test } from 'azle/test';
import { networks, payments } from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';

import {
    createWallet,
    generate,
    generateToAddress,
    getTotalOutput,
    getTransaction
} from './bitcoin';

const SINGLE_BLOCK_REWARD = 5_000_000_000n;
const FIRST_MINING_SESSION = 101;
const FIRST_AMOUNT_SENT = SINGLE_BLOCK_REWARD / 2n;
const SECOND_AMOUNT_SENT = SINGLE_BLOCK_REWARD * 2n;

const ECPair = ECPairFactory(ecc);

let lastTx = '';
let toAddressPreviousBalance = 0n;
let canisterPreviousBalance = 0n;

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;
    const canisterAddressForm = 'mhVmPSYFraAYnA4ZP6KUx41P3dKgAg27Cm'; // p2pkh-address on the regtest will generally be of this form, starting with m or n and this many characters.
    return [
        {
            name: 'Set up minting wallet',
            prep: async () => {
                createWallet('minty');
            }
        },
        {
            name: '/get-p2pkh-address',
            test: async () => {
                const address = await getP2pkhAddress(origin);

                return { Ok: canisterAddressForm.length === address.length };
            }
        },
        {
            name: '/get-balance',
            test: async () => {
                const address = await getP2pkhAddress(origin);
                const balance = await getBalance(origin, address);

                return compareBalances(0n, balance);
            }
        },
        {
            name: 'first mint BTC',
            prep: async () => {
                const address = await getP2pkhAddress(origin);
                generateToAddress(address, FIRST_MINING_SESSION);
            }
        },
        { name: 'wait for blocks to settle', wait: 60_000 },
        {
            name: '/get-balance',
            test: async () => {
                const address = await getP2pkhAddress(origin);
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
                const address = await getP2pkhAddress(origin);

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

                // Though blocks are mined no transaction have happened yet so the list should still be empty
                return { Ok: feePercentiles.length === 0 };
            }
        },
        {
            name: 'toAddress sanity check',
            test: async () => {
                const address = getToAddress();
                return { Ok: address === 'n4HY51WrdxATGEPqYvoNkEsTteRfuRMxpD' };
            }
        },
        {
            name: '/get-balance of L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv',
            test: async () => {
                const address = getToAddress();
                const balance = await getBalance(origin, address);

                return compareBalances(0n, balance);
            }
        },
        {
            name: '/send from canister to L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv',
            prep: async () => {
                const toAddress = getToAddress();
                const body = jsonStringify({
                    amountInSatoshi: FIRST_AMOUNT_SENT,
                    destinationAddress: toAddress
                });
                const response = await fetch(`${origin}/send`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body
                });
                lastTx = await response.text();
                console.info(lastTx);
            }
        },
        // TODO it might be nice to look at the mempool and wait for a transaction to show up before generating any blocks
        { name: 'wait for transaction to appear in mempool', wait: 15_000 },
        {
            name: '',
            prep: async () => {
                generate(1);
            }
        },
        { name: 'wait for blocks to settle', wait: 15_000 },
        {
            name: '/get-balance of L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv final',
            test: async () => {
                const address = getToAddress();
                const balance = await getBalance(origin, address);
                toAddressPreviousBalance = balance;

                return compareBalances(FIRST_AMOUNT_SENT, balance);
            }
        },
        {
            name: '/get-balance final',
            test: async () => {
                const address = await getP2pkhAddress(origin);
                const balance = await getBalance(origin, address);
                canisterPreviousBalance = balance;

                // The expected balance of the canister's wallet is:
                // all of it's total block mining rewards - the amount sent in the first transaction - the fee

                // At the time this transaction was made, the canister only had utxos from block rewards.
                // The amount sent and the fee was less than the reward from minting a single block so there will be only one input and it will have the value of that reward.
                const fee = getFeeFromTransaction(lastTx, SINGLE_BLOCK_REWARD);

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
            name: 'mine a block for the latest transaction',
            prep: async () => {
                // Generate blocks to ensure that enough of the canisters block rewards are available to spend
                generate(10);
            }
        },
        {
            name: '/send big from canister to L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv',
            prep: async () => {
                const toAddress = getToAddress();
                const body = jsonStringify({
                    amountInSatoshi: SECOND_AMOUNT_SENT,
                    destinationAddress: toAddress
                });
                const response = await fetch(`${origin}/send`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body
                });
                lastTx = await response.text();
                console.info(lastTx);
            }
        },
        { name: 'wait for transaction to appear in mempool', wait: 15_000 },
        {
            name: 'mine a block for the latest transaction',
            prep: async () => {
                generate(1);
            }
        },
        { name: 'wait for blocks to settle', wait: 15_000 },
        {
            name: '/get-balance of L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv big',
            test: async () => {
                const address = getToAddress();
                const balance = await getBalance(origin, address);
                const expectedBalance =
                    toAddressPreviousBalance + SECOND_AMOUNT_SENT;

                return compareBalances(expectedBalance, balance);
            }
        },
        {
            name: '/get-balance big',
            test: async () => {
                const address = await getP2pkhAddress(origin);
                const balance = await getBalance(origin, address);

                const fee = getFeeFromTransaction(
                    lastTx,
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
            name: 'mine a block to see if resets the fee percentiles',
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
                    Ok: feePercentiles.length === 0
                };
            }
        }
    ];
}

function compareBalances(
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
 * The value of the outputs is easily found by looking the transaction with the provided txid
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

async function getP2pkhAddress(origin: string): Promise<string> {
    const response = await fetch(`${origin}/get-p2pkh-address`, {
        headers: [['X-Ic-Force-Update', 'true']]
    });
    return await response.text();
}

function getToAddress(): string {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    const { address } = payments.p2pkh({
        pubkey: keyPair.publicKey,
        network: networks.regtest
    });
    if (address === undefined) {
        throw new Error('To Address is undefined');
    }
    return address;
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
