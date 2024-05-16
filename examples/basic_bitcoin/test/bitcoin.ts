import { Transaction } from 'bitcoinjs-lib';
import { execSync } from 'child_process';

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

export function getMempoolCount(): number {
    const mempool = execSync(
        `.bitcoin/bin/bitcoin-cli -conf=$(pwd)/.bitcoin.conf getrawmempool true`
    )
        .toString()
        .trim();

    const mempoolObj = JSON.parse(mempool);

    const transactionCount = Object.keys(mempoolObj).length;

    return transactionCount;
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
