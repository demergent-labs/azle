import { Test } from 'azle/test';
import { ChildProcessWithoutNullStreams, execSync, spawn } from 'child_process';
import { existsSync, rmSync } from 'fs-extra';

import { bitcoinCli, TxInput, TxOutputs, Utxo } from './bitcoin_cli';
import { Wallets } from './wallets';
import { State } from './test';

/**
 * Performs preparatory work to get the bitcoin network into a testable state.
 * NOTE: this mutates the provided state object to pass values between tests.
 * @param wallets a list of wallets to use for the setup
 * @param state A mutable datastore for passing state between tests
 * @returns the preparation step to execute
 */
export function impureSetup(wallets: Wallets, state: State): Test[] {
    return [
        {
            name: 'setup bitcoin',
            prep: async () => {
                createBitcoinWallet(wallets);
                await mine101Blocks(wallets);
                const utxo = getEarliestUtxo();
                const rawTx = createTransaction(utxo, wallets);
                state.signedTxHex = signTransaction(rawTx);
            }
        }
    ];
}

export function installBitcoin() {
    const tarball = 'bitcoin.tar.gz';
    if (existsSync(`./${tarball}`)) {
        return;
    }
    console.log('install bitcoin\n');
    execSync(
        `curl https://bitcoincore.org/bin/bitcoin-core-23.0/bitcoin-23.0-x86_64-linux-gnu.tar.gz -o ${tarball}`,
        { stdio: 'inherit' }
    );
    execSync(
        `tar xzf ${tarball} --overwrite  --strip-components=1 --directory=.bitcoin/ bitcoin-23.0/bin/`,
        { stdio: 'inherit' }
    );
}

export async function whileRunningBitcoinDaemon(
    callback: () => Promise<void> | void
) {
    installBitcoin();
    const bitcoinDaemon = await startBitcoinDaemon();
    await callback();
    bitcoinDaemon.kill();
}

async function startBitcoinDaemon(): Promise<ChildProcessWithoutNullStreams> {
    if (existsSync(`.bitcoin/regtest`)) {
        rmSync('.bitcoin/regtest', { recursive: true, force: true });
    }
    const bitcoinDaemon = spawn('.bitcoin/bin/bitcoind', [
        `-conf=${process.cwd()}/.bitcoin.conf`,
        `-datadir=${process.cwd()}/.bitcoin`,
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

    console.log(`starting bitcoind...`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return bitcoinDaemon;
}

function createBitcoinWallet(wallets: Wallets): void {
    console.log(' - create bitcoin wallet');
    bitcoinCli.createWallet();
    Object.entries(wallets).forEach(([name, wallet]) => {
        bitcoinCli.importPrivateKey(wallet.wif, name);
    });
}

async function mine101Blocks(wallets: Wallets): Promise<void> {
    console.log(' - mine blocks');
    await bitcoinCli.generateToAddress(101, wallets.alice.p2wpkh);
}

function getEarliestUtxo(): Utxo {
    console.log(' - get earliest utxo');
    const utxos = bitcoinCli.listUnspent();
    if (utxos.length === 0) {
        throw "There aren't any UTXOs after mining 101 blocks. Something went wrong";
    }
    return utxos[utxos.length - 1];
}

function createTransaction(from: Utxo, wallets: Wallets): string {
    console.log(' - get create transaction');
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

function signTransaction(rawTransaction: string) {
    console.log(' - sign transaction');
    return bitcoinCli.signRawTransactionWithWallet(rawTransaction).hex;
}
