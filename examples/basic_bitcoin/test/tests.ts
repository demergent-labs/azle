import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

// import * as ecc from 'tiny-secp256k1/lib/'; // TODO we should switch to this import as soon as we have wasm support
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import { jsonParse, jsonStringify } from 'azle';
import { GetUtxosResult, Outpoint, Satoshi } from 'azle/canisters/management';
import { Test } from 'azle/test';
import { networks, payments } from 'bitcoinjs-lib';
import { ECPairFactory } from 'ecpair';

import {
    generateToAddress,
    getTotalOutput,
    getTransaction,
    getUtxoHashes
} from './bitcoin';

const SINGLE_BLOCK_REWARD = 5_000_000_000n;
const FIRST_MINING_SESSION = 101;
const SECOND_MINING_SESSION = 10;

const ECPair = ECPairFactory(ecc);

let lastTx = '';

// TODO adding HD wallets and showing how to use the Derivation path might be nice

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;
    const canisterAddressForm = 'mhVmPSYFraAYnA4ZP6KUx41P3dKgAg27Cm'; // p2pkh-address on the regtest will generally be of this form, starting with m or n and this many characters.
    return [
        {
            name: '/get-current-fee-percentiles',
            test: async () => {
                const response = await fetch(
                    `${origin}/get-current-fee-percentiles`,
                    { method: 'POST' }
                );

                const feePercentiles = jsonParse(await response.text());

                return { Ok: feePercentiles.length === 0 };
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

                return { Ok: balance === 0n };
            }
        },
        {
            name: 'mint BTC',
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

                return {
                    Ok:
                        balance ===
                        SINGLE_BLOCK_REWARD * BigInt(FIRST_MINING_SESSION)
                };
            }
        },
        {
            name: '/get-utxos',
            test: async () => {
                const address = await getP2pkhAddress(origin);

                const response = await fetch(
                    `${origin}/get-utxos?address=${address}`,
                    { method: 'POST' }
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
                    { method: 'POST' }
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

                return { Ok: balance === 0n };
            }
        },
        {
            name: '/send from canister to L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv',
            prep: async () => {
                const toAddress = getToAddress();
                const body = jsonStringify(getUtxoHashes());
                const response = await fetch(
                    `${origin}/send?amountInSatoshi=${
                        SINGLE_BLOCK_REWARD / 2n
                    }&destinationAddress=${toAddress}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body
                    }
                );
                lastTx = await response.text();
                console.log(lastTx);
            }
        },
        {
            name: 'mint BTC',
            prep: async () => {
                const address = getToAddress();
                generateToAddress(address, SECOND_MINING_SESSION);
            }
        },
        { name: 'wait for blocks to settle', wait: 60_000 },
        {
            name: '/get-balance of L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv final',
            test: async () => {
                const address = getToAddress();
                const balance = await getBalance(origin, address);

                const previousTransaction = getTransaction(lastTx);

                const outputValue = BigInt(getTotalOutput(previousTransaction));

                const inputValue = SINGLE_BLOCK_REWARD;

                const fee = inputValue - outputValue;
                const blockRewards =
                    SINGLE_BLOCK_REWARD * BigInt(SECOND_MINING_SESSION) + fee;
                const expectedBalance = SINGLE_BLOCK_REWARD / 2n + blockRewards;

                return {
                    Ok: balance === expectedBalance
                };
            }
        },
        {
            name: '/get-balance final',
            test: async () => {
                const address = await getP2pkhAddress(origin);
                const balance = await getBalance(origin, address);

                const previousTransaction = getTransaction(lastTx);
                const outputValue = BigInt(getTotalOutput(previousTransaction));
                const amountSent = SINGLE_BLOCK_REWARD / 2n;
                const inputValue = SINGLE_BLOCK_REWARD;
                const fee = inputValue - outputValue;
                const blockRewards =
                    SINGLE_BLOCK_REWARD * BigInt(FIRST_MINING_SESSION);
                const expectedBalance = blockRewards - (amountSent + fee);

                return { Ok: balance === expectedBalance };
            }
        },
        {
            name: '/get-current-fee-percentiles',
            test: async () => {
                const response = await fetch(
                    `${origin}/get-current-fee-percentiles`,
                    { method: 'POST' }
                );

                const feePercentiles = jsonParse(await response.text());

                return { Ok: feePercentiles.length === 0 }; // TODO is that what we are expecting it to be?
            }
        }
    ];
}

async function getP2pkhAddress(origin: string): Promise<string> {
    const response = await fetch(`${origin}/get-p2pkh-address`, {
        method: 'POST'
    });
    return await response.text();
}

function getToAddress(): string {
    const keyPair = ECPair.fromWIF(
        'L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv'
    );
    const { address: address } = payments.p2pkh({
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
        method: 'POST'
    });
    return jsonParse(await response.text());
}

type Utxo = { height: number; outpoint: Outpoint; value: Satoshi };

function checkUtxos(utxso: Utxo[]): boolean {
    return utxso.every(
        (utxo) => utxo.value === SINGLE_BLOCK_REWARD && utxo.outpoint.vout === 0
    );
}
