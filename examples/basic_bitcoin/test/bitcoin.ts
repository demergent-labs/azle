import { Transaction } from 'bitcoinjs-lib';
import { execSync } from 'child_process';

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
