import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

import { execSyncPretty } from '../../../../../../src/build/stable/utils/exec_sync_pretty';
import { _SERVICE } from './dfx_generated/multi_deploy/multi_deploy.did';

export function getTests(multiDeployCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('has the same binary between builds', async () => {
            const originalWasmHash = await getFileHash(
                '.azle/multi_deploy/multi_deploy.wasm'
            );
            const originalMainHash = await getFileHash(
                '.azle/multi_deploy/main.js'
            );
            const originalDidHash = await getFileHash(
                '.azle/multi_deploy/multi_deploy.did'
            );

            for (let i = 0; i < 10; i++) {
                execSyncPretty(`dfx build multi_deploy`);

                const updatedWasmHash = await getFileHash(
                    '.azle/multi_deploy/multi_deploy.wasm'
                );
                const updatedMainHash = await getFileHash(
                    '.azle/multi_deploy/main.js'
                );
                const updatedDidHash = await getFileHash(
                    '.azle/multi_deploy/multi_deploy.did'
                );

                expect(originalWasmHash).toBe(updatedWasmHash);
                expect(originalMainHash).toBe(updatedMainHash);
                expect(originalDidHash).toBe(updatedDidHash);
            }
        });

        it("doesn't call post upgrade when deploy is skipped from unchanged binary", async () => {
            const originalFileHash = await getFileHash(
                '.azle/multi_deploy/multi_deploy.wasm'
            );

            expect(await multiDeployCanister.getInitCalled()).toBe(true);
            expect(await multiDeployCanister.getAzleInitCalled()).toBe(true);

            for (let i = 0; i < 2; i++) {
                execSyncPretty(`dfx deploy multi_deploy`);

                const updatedHash = await getFileHash(
                    '.azle/multi_deploy/multi_deploy.wasm'
                );

                expect(originalFileHash).toEqual(updatedHash);
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

        it('does call post upgrade when deploy is forced', async () => {
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
