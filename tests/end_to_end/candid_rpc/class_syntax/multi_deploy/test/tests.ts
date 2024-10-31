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

            expect(await multiDeployCanister.getInitCalled()).toBe(true);
            expect(await multiDeployCanister.getAzleInitCalled()).toBe(true);
            expect(await multiDeployCanister.getPostUpgradeCalled()).toBe(
                false
            );
            expect(await multiDeployCanister.getAzlePostUpgradeCalled()).toBe(
                false
            );

            for (let i = 0; i < 2; i++) {
                execSyncPretty(`dfx deploy multi_deploy`);
                await verifyHashesMatch(originalHashes);

                expect(await multiDeployCanister.getInitCalled()).toBe(true);
                expect(await multiDeployCanister.getAzleInitCalled()).toBe(
                    true
                );
                expect(await multiDeployCanister.getPostUpgradeCalled()).toBe(
                    false
                );
                expect(
                    await multiDeployCanister.getAzlePostUpgradeCalled()
                ).toBe(false);
            }
        });

        it('does call post upgrade if additional deploy steps are forced', async () => {
            for (let i = 0; i < 2; i++) {
                execSyncPretty(`dfx deploy multi_deploy --upgrade-unchanged`);

                expect(await multiDeployCanister.getInitCalled()).toBe(false);
                expect(await multiDeployCanister.getAzleInitCalled()).toBe(
                    false
                );
                expect(await multiDeployCanister.getPostUpgradeCalled()).toBe(
                    true
                );
                expect(
                    await multiDeployCanister.getAzlePostUpgradeCalled()
                ).toBe(true);
            }
        });
    };
}

async function getFileHash(path: string): Promise<string> {
    const fileData = await readFile(path);
    let h = createHash('sha256');
    h.update(fileData);
    return h.digest('hex');
}

async function getFileHashes(): Promise<{
    wasmHash: string;
    mainHash: string;
    didHash: string;
}> {
    return {
        wasmHash: await getFileHash('.azle/multi_deploy/multi_deploy.wasm'),
        mainHash: await getFileHash('.azle/multi_deploy/main.js'),
        didHash: await getFileHash('.azle/multi_deploy/multi_deploy.did')
    };
}

async function verifyHashesMatch(
    originalHashes: Awaited<ReturnType<typeof getFileHashes>>
): Promise<void> {
    const updatedHashes = await getFileHashes();

    expect(originalHashes).toEqual(updatedHashes);
}
