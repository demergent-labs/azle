import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { existsSync, rmSync } from 'fs-extra';

export async function whileRunningBitcoinDaemon(
    callback: () => Promise<boolean> | void
) {
    const bitcoinDaemon = await startBitcoinDaemon();
    await callback();
    bitcoinDaemon.kill();
}

async function startBitcoinDaemon(): Promise<ChildProcessWithoutNullStreams> {
    if (existsSync(`.bitcoin/data/regtest`)) {
        rmSync('.bitcoin/data/regtest', { recursive: true, force: true });
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
    // This await is necessary to ensure the daemon is running
    await new Promise((resolve) => setTimeout(resolve, 5_000));
    return bitcoinDaemon;
}
