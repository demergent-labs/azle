import { runTests } from 'azle/test';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { existsSync, rmSync } from 'fs-extra';

import { getTests } from './tests';

export async function whileRunningBitcoinDaemon(
    callback: () => Promise<void> | void
) {
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

whileRunningBitcoinDaemon(() => runTests(getTests()));
