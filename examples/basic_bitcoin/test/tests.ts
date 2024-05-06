import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import { jsonParse, jsonStringify } from 'azle';
import { GetUtxosResult, Outpoint, Satoshi } from 'azle/canisters/management';
import { Test } from 'azle/test';
import { networks, payments, Transaction } from 'bitcoinjs-lib';
import { execSync } from 'child_process';
import { ECPairFactory } from 'ecpair';

const SINGLE_BLOCK_REWARD = 5_000_000_000n;

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
                const address = await getAddress(origin);

                return { Ok: canisterAddressForm.length === address.length };
            }
        },
        {
            name: '/get-balance',
            test: async () => {
                const address = await getAddress(origin);
                const balance = await getBalance(origin, address);

                return { Ok: balance === 0n };
            }
        },
        {
            name: 'mint BTC',
            prep: async () => {
                const address = await getAddress(origin);

                for (let i = 0; i < 101; i++) {
                    execSync(`npm run mint --address=${address}`);
                }
            }
        },
        { name: 'wait for blocks to settle', wait: 60_000 },
        {
            name: '/get-balance',
            test: async () => {
                const address = await getAddress(origin);
                const balance = await getBalance(origin, address);

                return { Ok: balance === SINGLE_BLOCK_REWARD * 101n };
            }
        },
        {
            name: '/get-utxos',
            test: async () => {
                const address = await getAddress(origin);

                const response = await fetch(
                    `${origin}/get-utxos?address=${address}`,
                    { method: 'POST' }
                );
                const utxosResult: GetUtxosResult = await jsonParse(
                    await response.text()
                );

                return {
                    Ok:
                        utxosResult.tip_height === 101 &&
                        utxosResult.utxos.length === 101 &&
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
            name: '/create-transaction',
            test: async () => {
                const address = getToAddress();
                const body = jsonStringify(getUtxoHashes());
                const response = await fetch(
                    `${origin}/create-transaction?amountInSatoshi=${SINGLE_BLOCK_REWARD}&destinationAddress=${address}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body
                    }
                );
                const transactionHex = await response.text();
                console.log(transactionHex);
                return { Ok: true };
            }
        },
        {
            name: '/send from canister to L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv',
            test: async () => {
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

                // TODO is there anyway to deteremine if this actually worked or just by getting the balance bellow?
                // TODO if that is the case then we should probably get rid of the create-transaction end point and call get balance as part of this one
                return { Ok: true };
            }
        },
        {
            name: 'mint BTC',
            prep: async () => {
                const address = await getToAddress();
                generateToAddress(address, 3);
            }
        },
        { name: 'wait for blocks to settle', wait: 60_000 },
        {
            name: '/get-balance of L3BybjkmnMdXE6iNEaeZTjVMTHA4TvpYbQozc264Lto9yVDis2nv',
            test: async () => {
                const address = getToAddress();
                const balance = await getBalance(origin, address);

                const previousTransaction = Transaction.fromHex(
                    getTxHex(lastTx)
                );

                const outputValue = BigInt(getTotalOutput(previousTransaction));

                const inputValue = SINGLE_BLOCK_REWARD;

                const fee = inputValue - outputValue;
                const blockRewards = SINGLE_BLOCK_REWARD * 3n + fee;
                const expectedBalance = SINGLE_BLOCK_REWARD / 2n + blockRewards;

                return {
                    Ok: balance === expectedBalance
                };
            }
        },
        {
            name: '/get-balance',
            test: async () => {
                const address = await getAddress(origin);
                const balance = await getBalance(origin, address);

                const previousTransaction = Transaction.fromHex(
                    getTxHex(lastTx)
                );
                const outputValue = BigInt(getTotalOutput(previousTransaction));
                const amountSent = SINGLE_BLOCK_REWARD / 2n;
                const inputValue = SINGLE_BLOCK_REWARD;
                const fee = inputValue - outputValue;
                const blockRewards = SINGLE_BLOCK_REWARD * 101n;
                const expectedBalance = blockRewards - (amountSent + fee);

                return { Ok: balance === expectedBalance };
            }
        }
    ];
}

function getTotalOutput(tx: Transaction): number {
    return tx.outs.reduce((total, output) => {
        return total + output.value;
    }, 0);
}

async function getAddress(origin: string): Promise<string> {
    const response = await fetch(`${origin}/get-p2pkh-address`, {
        method: 'POST'
    });
    return await response.text();
}

function generateToAddress(address: string, blocks: number) {
    for (let i = 0; i < blocks; i++) {
        execSync(`npm run mint --address=${address}`);
    }
}

function getUtxoHashes(): TransactionHashes {
    // TODO would range() be better here?
    return Array.from<number>({ length: 102 }).reduce((acc, _, blockHeight) => {
        const blockHash = getblockhash(blockHeight);
        const block = getBlock(blockHash);
        const result = getTransactionHashAndIdFromBlock(block);
        return { ...acc, ...result };
    }, {} as TransactionHashes);
}

function getTxHex(txid: string): string {
    return execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf getrawtransaction ${txid}`
    )
        .toString()
        .trim();
}

function getblockhash(blockIndex: number): string {
    return execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf getblockhash ${blockIndex}`
    )
        .toString()
        .trim();
}

type Block = {
    hash: string;
    confirmations: number;
    height: number;
    version: number;
    versionHex: string;
    merkleroot: string;
    time: number;
    mediantime: number;
    nonce: number;
    bits: string;
    difficulty: number;
    chainwork: string;
    nTx: number;
    previousblockhash: string;
    nextblockhash: string;
    strippedsize: number;
    size: number;
    weight: number;
    tx: Tx[];
};

type Tx = {
    txid: string;
    hash: string;
    version: number;
    size: number;
    vsize: number;
    weight: number;
    locktime: number;
    vin: [
        {
            coinbase: string;
            txinwitness: string[];
            sequence: number;
        }
    ];
    vout: Vout[];
    hex: string;
};

type Vout = {
    value: number;
    n: number;
    scriptPubKey: {
        asm: string;
        desc: string;
        hex: string;
        address: string;
        type: string;
    };
};

function getBlock(hash: string): Block {
    const getBlockResult = execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf getblock ${hash} 2`
    )
        .toString()
        .trim();

    return jsonParse(getBlockResult);
}

type TransactionHashes = {
    [txid: string]: string;
};

function getTransactionHashAndIdFromBlock(block: Block): TransactionHashes {
    return { [block.tx[0].txid]: block.tx[0].hex };
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
