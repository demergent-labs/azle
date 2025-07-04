import { ActorSubclass, Identity } from '@dfinity/agent';
import { Ed25519KeyIdentity } from '@dfinity/identity';
import { afterAll, beforeAll } from '@jest/globals';
import { getCanisterId } from 'azle/_internal/dfx';
import { runTests } from 'azle/_internal/test';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';

import { createActor } from '../wallet/frontend/dfx_generated/wallet_backend';
import { _SERVICE } from '../wallet/frontend/dfx_generated/wallet_backend/wallet_backend.did';
import { getTests } from './tests';

export type Config = {
    identity: Identity;
    canister: ActorSubclass<_SERVICE>;
    caller: string;
};

const canisterName = 'wallet_backend';
const configs = [createConfig(0), createConfig(1)];

type BitcoinDaemon = ChildProcessWithoutNullStreams;

runTests(() => {
    let bitcoinDaemon: BitcoinDaemon;

    beforeAll(async () => {
        bitcoinDaemon = await startBitcoinDaemon();
    }, 60_000);

    afterAll(() => {
        bitcoinDaemon.kill();
    });

    getTests(configs)();
});

async function startBitcoinDaemon(): Promise<BitcoinDaemon> {
    if (existsSync(`.bitcoin/regtest`)) {
        await rm('.bitcoin/regtest', { recursive: true, force: true });
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
            host: 'http://127.0.0.1:4943',
            shouldFetchRootKey: true,

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
