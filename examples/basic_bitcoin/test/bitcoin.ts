import { jsonParse } from 'azle';
import { Transaction } from 'bitcoinjs-lib';
import { execSync } from 'child_process';

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

type TransactionHashes = {
    [txid: string]: string;
};

export function getTotalOutput(tx: Transaction): number {
    return tx.outs.reduce((total, output) => {
        return total + output.value;
    }, 0);
}

export function generateToAddress(address: string, blocks: number) {
    execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf generatetoaddress ${blocks} ${address}`
    );
}

export function generate(blocks: number) {
    execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf -generate ${blocks}`
    );
}

export function createWallet(name: string) {
    execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf createwallet ${name}`
    );
}

export function getUtxoHashes(): TransactionHashes {
    return Array.from<number>({ length: 102 }).reduce((acc, _, blockHeight) => {
        const blockHash = getblockhash(blockHeight);
        const block = getBlock(blockHash);
        const result = getTransactionHashAndIdFromBlock(block);
        return { ...acc, ...result };
    }, {} as TransactionHashes);
}

function getBlock(hash: string): Block {
    const getBlockResult = execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf getblock ${hash} 2`
    )
        .toString()
        .trim();

    return jsonParse(getBlockResult);
}

export function getTransaction(txid: string): Transaction {
    return Transaction.fromHex(getTxHex(txid));
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

function getTransactionHashAndIdFromBlock(block: Block): TransactionHashes {
    return { [block.tx[0].txid]: block.tx[0].hex };
}
