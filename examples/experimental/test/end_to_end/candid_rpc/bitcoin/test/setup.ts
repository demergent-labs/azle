import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { existsSync, rmSync } from 'fs-extra';

import { bitcoinCli, TxInput, TxOutputs, Utxo } from './bitcoin_cli';
import { Wallets } from './wallets';

export type BitcoinDaemon = ChildProcessWithoutNullStreams;

export async function startBitcoinDaemon(): Promise<BitcoinDaemon> {
    if (existsSync(`.bitcoin/regtest`)) {
        rmSync('.bitcoin/regtest', { recursive: true, force: true });
    }
    const bitcoinDaemon = spawn('.bitcoin/bin/bitcoind', [
        `-conf=${process.cwd()}/.bitcoin.conf`,
        `-datadir=${process.cwd()}/.bitcoin/data`,
        '--port=18444'
    ]);

    process.on('uncaughtException', () => {
        if (!bitcoinDaemon.killed) {
            bitcoinDaemon.kill();
        }
    });

    process.on('exit', () => {
        if (!bitcoinDaemon.killed) {
            bitcoinDaemon.kill();
        }
    });

    console.info(`starting bitcoind...`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return bitcoinDaemon;
}

export function createBitcoinWallet(wallets: Wallets): void {
    console.info(' - create bitcoin wallet');
    bitcoinCli.createWallet();
    Object.entries(wallets).forEach(([name, wallet]) => {
        bitcoinCli.importPrivateKey(wallet.wif, name);
    });
}

export async function mine101Blocks(wallets: Wallets): Promise<void> {
    console.info(' - mine blocks');
    await bitcoinCli.generateToAddress(101, wallets.alice.p2wpkh);
}

export function getEarliestUtxo(): Utxo {
    console.info(' - get earliest utxo');
    const utxos = bitcoinCli.listUnspent();
    if (utxos.length === 0) {
        throw "There aren't any UTXOs after mining 101 blocks. Something went wrong";
    }
    return utxos[utxos.length - 1];
}

export function createTransaction(from: Utxo, wallets: Wallets): string {
    console.info(' - get create transaction');
    const input: TxInput = {
        txid: from.txid,
        vout: from.vout
    };
    const outputs: TxOutputs = {
        [wallets.bob.p2wpkh]: 1,
        [wallets.alice.p2wpkh]: 48.9999
    };
    return bitcoinCli.createRawTransaction(input, outputs);
}

export function signTransaction(rawTransaction: string): string {
    console.info(' - sign transaction');
    return bitcoinCli.signRawTransactionWithWallet(rawTransaction).hex;
}
