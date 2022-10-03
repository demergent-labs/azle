import { Test } from 'azle/test';
import { ChildProcessWithoutNullStreams, execSync, spawn } from 'child_process';
import { existsSync, rmSync } from 'fs-extra';

import { bitcoin_cli, TxInput, TxOutputs, Utxo } from './bitcoin_cli';
import { Wallets } from './wallets';
import { State } from './test';

/**
 * Performs preparatory work to get the bitcoin network into a testable state.
 * NOTE: this mutates the provided state object to pass values between tests.
 * @param wallets a list of wallets to use for the setup
 * @param state A mutable datastore for passing state between tests
 * @returns the preparation step to execute
 */
export function impure_setup(wallets: Wallets, state: State): Test[] {
    return [
        {
            name: 'setup bitcoin',
            prep: async () => {
                create_bitcoin_wallet(wallets);
                await mine_101_blocks(wallets);
                const utxo = get_earliest_utxo();
                const raw_tx = create_transaction(utxo, wallets);
                state.signed_tx_hex = sign_transaction(raw_tx);
            }
        }
    ];
}

export function install_bitcoin() {
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
    execSync(`rm ${tarball}`, { stdio: 'inherit' });
}

export async function while_running_bitcoin_daemon(
    callback: () => Promise<void> | void
) {
    install_bitcoin();
    const bitcoin_daemon = await start_bitcoin_daemon();
    await callback();
    bitcoin_daemon.kill();
}

async function start_bitcoin_daemon(): Promise<ChildProcessWithoutNullStreams> {
    if (existsSync(`.bitcoin/regtest`)) {
        rmSync('.bitcoin/regtest', { recursive: true, force: true });
    }
    const bitcoin_daemon = spawn('.bitcoin/bin/bitcoind', [
        `-conf=${process.cwd()}/.bitcoin.conf`,
        `-datadir=${process.cwd()}/.bitcoin`,
        '--port=18444'
    ]);

    process.on('uncaughtException', () => {
        if (!bitcoin_daemon.killed) {
            bitcoin_daemon.kill();
        }
    });

    process.on('exit', () => {
        if (!bitcoin_daemon.killed) {
            bitcoin_daemon.kill();
        }
    });

    console.log(`starting bitcoind...`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return bitcoin_daemon;
}

function create_bitcoin_wallet(wallets: Wallets): void {
    console.log(' - create bitcoin wallet');
    bitcoin_cli.create_wallet();
    Object.entries(wallets).forEach(([name, wallet]) => {
        bitcoin_cli.import_private_key(wallet.wif, name);
    });
}

async function mine_101_blocks(wallets: Wallets): Promise<void> {
    console.log(' - mine blocks');
    await bitcoin_cli.generate_to_address(101, wallets.alice.p2wpkh);
}

function get_earliest_utxo(): Utxo {
    console.log(' - get earliest utxo');
    const utxos = bitcoin_cli.list_unspent();
    if (utxos.length === 0) {
        throw "There aren't any UTXOs after mining 101 blocks. Something went wrong";
    }
    return utxos[utxos.length - 1];
}

function create_transaction(from: Utxo, wallets: Wallets): string {
    console.log(' - get create transaction');
    const input: TxInput = {
        txid: from.txid,
        vout: from.vout
    };
    const outputs: TxOutputs = {
        [wallets.bob.p2wpkh]: 1,
        [wallets.alice.p2wpkh]: 48.9999
    };
    return bitcoin_cli.create_raw_transaction(input, outputs);
}

function sign_transaction(raw_transaction: string) {
    console.log(' - sign transaction');
    return bitcoin_cli.sign_raw_transaction_with_wallet(raw_transaction).hex;
}
