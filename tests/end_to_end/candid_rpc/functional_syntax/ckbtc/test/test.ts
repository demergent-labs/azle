import { ActorSubclass, Identity } from '@dfinity/agent';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { afterAll, beforeAll, describe } from '@jest/globals';
import { getCanisterId } from 'azle/dfx';
import { runTests } from 'azle/test';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { existsSync, rmSync } from 'fs-extra';

// @ts-ignore this path may not exist when these tests are imported into other test projects
import { createActor } from '../wallet/frontend/dfx_generated/wallet_backend';
// @ts-ignore this path may not exist when these tests are imported into other test projects
import { _SERVICE } from '../wallet/frontend/dfx_generated/wallet_backend/wallet_backend.did';
import { getTests } from './tests';

type BitcoinDaemon = ChildProcessWithoutNullStreams;

export type Config = {
    identity: Identity;
    canister: ActorSubclass<_SERVICE>;
    caller: string;
};

const configs = [createConfig(0), createConfig(1)];

const canisterName = 'wallet_backend';

runTests(() => {
    let bitcoinDaemon: BitcoinDaemon;

    beforeAll(async () => {
        bitcoinDaemon = await startBitcoinDaemon();
    }, 60_000);

    afterAll(() => {
        bitcoinDaemon.kill();
    });

    describe(
        'run ckbtc tests while bitcoin daemon is running',
        getTests(configs)
    );
}, canisterName);

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

    console.info(`starting bitcoind...`);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return bitcoinDaemon;
}

function createConfig(id: number): Config {
    const walletBackendCanisterId = getCanisterId(canisterName);
    const identity = createIdentity(id);
    const canister = createActor(walletBackendCanisterId, {
        agentOptions: {
            host: 'http://127.0.0.1:8000',
            identity
        }
    });
    const caller = identity.getPrincipal().toText();
    return { identity, canister, caller };
}

function createIdentity(seed: number): Identity {
    const seed1 = [seed, ...new Array(31).fill(0)];
    return Ed25519KeyIdentity.generate(Uint8Array.from(seed1));
}
