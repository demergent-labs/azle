import { afterAll, beforeAll, describe } from '@jest/globals';
import { runTests } from 'azle/test/jest';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { existsSync, rmSync } from 'fs-extra';

import { getTests } from './tests';

type BitcoinDaemon = ChildProcessWithoutNullStreams;

runTests(() => {
    let bitcoinDaemon: BitcoinDaemon;

    beforeAll(async () => {
        bitcoinDaemon = await startBitcoinDaemon();
    }, 60_000);

    afterAll(() => {
        bitcoinDaemon.kill();
    });

    describe('run ckbtc tests while bitcoin daemon is running', getTests());
});

async function startBitcoinDaemon(): Promise<BitcoinDaemon> {
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
