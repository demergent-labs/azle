import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { jsonStringify } from 'azle';
import { Test } from 'azle/test';

import {
    createWallet,
    generate,
    generateToAddress
} from '../../basic_bitcoin/test/bitcoin';
import {
    compareBalances,
    getBalance,
    getFeeFromTransaction,
    waitForMempool
} from '../../basic_bitcoin/test/tests';

const SINGLE_BLOCK_REWARD = 5_000_000_000n;
const FIRST_MINING_SESSION = 101;
const FIRST_AMOUNT_SENT = SINGLE_BLOCK_REWARD / 2n;
const TO_ADDRESS = 'n4HY51WrdxATGEPqYvoNkEsTteRfuRMxpD'; // TODO test other kinds of addresses not just p2pkh

let lastTxid = '';

// TODO adding HD wallets and showing how to use the Derivation path might be nice

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;
    return [
        {
            name: 'Set up minting wallet',
            prep: async () => {
                createWallet('minty');
            }
        },
        {
            name: 'first mint BTC',
            prep: async () => {
                const address = await getP2wpkhAddress(origin);
                generateToAddress(address, FIRST_MINING_SESSION);
            }
        },
        { name: 'wait for blocks to settle', wait: 30_000 },
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
            name: 'wait for transaction to be added to mempool',
            prep: waitForMempool
        },
        {
            name: 'second mint BTC',
            prep: async () => {
                generate(1);
            }
        },
        { name: 'wait for blocks to settle', wait: 15_000 },
        {
            name: `/get-balance of ${TO_ADDRESS} final`,
            test: async () => {
                const balance = await getBalance(origin, TO_ADDRESS);

                return compareBalances(FIRST_AMOUNT_SENT, balance);
            }
        },
        {
            name: '/get-balance final',
            test: async () => {
                const address = await getP2wpkhAddress(origin);
                const balance = await getBalance(origin, address);

                const fee = getFeeFromTransaction(
                    lastTxid,
                    SINGLE_BLOCK_REWARD
                );

                const blockRewards =
                    SINGLE_BLOCK_REWARD * BigInt(FIRST_MINING_SESSION);

                const expectedBalance = blockRewards - FIRST_AMOUNT_SENT - fee;

                return compareBalances(expectedBalance, balance);
            }
        }
    ];
}

export async function getP2wpkhAddress(origin: string): Promise<string> {
    const response = await fetch(`${origin}/get-p2wpkh-address`, {
        headers: [['X-Ic-Force-Update', 'true']]
    });
    return await response.text();
}
