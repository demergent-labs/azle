import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

import { execSyncPretty } from '../../../../../../src/build/stable/utils/exec_sync_pretty';
import { _SERVICE } from './dfx_generated/multi_deploy/multi_deploy.did';

export function getTests(multiDeployCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('has the same binary between builds', async () => {
            const originalHashes = await getFileHashes();

            for (let i = 0; i < 10; i++) {
                execSyncPretty(`dfx build multi_deploy`);
                await verifyHashesMatch(originalHashes);
            }
        });

        it("doesn't call post upgrade if additional deploy steps are skipped because the binary is unchanged", async () => {
            const originalHashes = await getFileHashes();
            await verifyCalledFunction(multiDeployCanister, 'init');

            for (let i = 0; i < 5; i++) {
                execSyncPretty(`dfx deploy multi_deploy`);
                await verifyHashesMatch(originalHashes);
                await verifyCalledFunction(multiDeployCanister, 'init');
                await verifyModuleHashesMatch();
            }
        });

        it('does call post upgrade if additional deploy steps are forced', async () => {
            const originalHashes = await getFileHashes();

            for (let i = 0; i < 5; i++) {
                execSyncPretty(`dfx deploy multi_deploy --upgrade-unchanged`);
                await verifyHashesMatch(originalHashes);
                await verifyCalledFunction(multiDeployCanister, 'postUpgrade');
                await verifyModuleHashesMatch();
            }
        });
    };
}

async function getFileHash(path: string): Promise<string> {
    const fileData = await readFile(path);
    return createHash('sha256').update(fileData).digest('hex');
}

async function getFileHashes(): Promise<{
    wasmHash: string;
    mainHash: string;
    didHash: string;
    dfxWasmHash: string;
}> {
    return {
        wasmHash: await getFileHash('.azle/multi_deploy/multi_deploy.wasm'),
        mainHash: await getFileHash('.azle/multi_deploy/main.js'),
        didHash: await getFileHash('.azle/multi_deploy/multi_deploy.did'),
        dfxWasmHash: await getFileHash(
            '.dfx/local/canisters/multi_deploy/multi_deploy.wasm.gz'
        )
    };
}

async function verifyModuleHashesMatch(): Promise<void> {
    const localHash = await getFileHash(
        '.dfx/local/canisters/multi_deploy/multi_deploy.wasm.gz'
    );
    const canisterInfo = execSyncPretty(
        `dfx canister info multi_deploy`
    ).toString();
    const moduleHash = canisterInfo.match(/Module hash: (0x[a-f0-9]+)/)?.[1];

    if (!moduleHash) {
        throw new Error('Could not find module hash in canister info');
    }

    expect(localHash).toBe(moduleHash.slice(2)); // Remove '0x' prefix to match localHash format
}

async function verifyHashesMatch(
    originalHashes: Awaited<ReturnType<typeof getFileHashes>>
): Promise<void> {
    const updatedHashes = await getFileHashes();

    expect(originalHashes).toEqual(updatedHashes);
}

async function verifyCalledFunction(
    canister: ActorSubclass<_SERVICE>,
    expectedCalledFunction: 'init' | 'postUpgrade'
): Promise<void> {
    const expectInit = expectedCalledFunction === 'init';
    const expectPostUpgrade = expectedCalledFunction === 'postUpgrade';

    expect(await canister.getInitCalled()).toBe(expectInit);
    expect(await canister.getAzleInitCalled()).toBe(expectInit);
    expect(await canister.getPostUpgradeCalled()).toBe(expectPostUpgrade);
    expect(await canister.getAzlePostUpgradeCalled()).toBe(expectPostUpgrade);
}
