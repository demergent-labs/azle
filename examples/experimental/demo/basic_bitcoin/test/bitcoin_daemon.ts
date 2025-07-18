import { ChildProcess, spawn } from 'child_process';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';

export type BitcoinDaemon = ChildProcess;

export async function startBitcoinDaemon(): Promise<BitcoinDaemon> {
    if (existsSync(`.bitcoin/data/regtest`)) {
        await rm('.bitcoin/data/regtest', { recursive: true, force: true });
    }

    const bitcoinDaemon = spawn(
        '.bitcoin/bin/bitcoind',
        [
            `-conf=${process.cwd()}/.bitcoin.conf`,
            `-datadir=${process.cwd()}/.bitcoin/data`,
            '--port=18444'
        ],
        {
            stdio: ['ignore', 'ignore', 'ignore']
        }
    );

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
    // This await is necessary to ensure the daemon is running
    await new Promise((resolve) => setTimeout(resolve, 5_000));
    return bitcoinDaemon;
}
