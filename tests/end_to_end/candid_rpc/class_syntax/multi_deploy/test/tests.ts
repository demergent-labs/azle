import { ActorSubclass } from '@dfinity/agent';
import { expect, it, Test } from 'azle/test';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

import { execSyncPretty } from '../../../../../../src/build/stable/utils/exec_sync_pretty';
import { _SERVICE } from './dfx_generated/canister/canister.did';

export function getTests(canister: ActorSubclass<_SERVICE>): Test {
    return () => {
        it('has the same binary between builds', async () => {
            const originalWasmHash = await getFileHash(
                '.azle/canister/canister.wasm'
            );
            const originalMainHash = await getFileHash(
                '.azle/canister/main.js'
            );
            const originalDidHash = await getFileHash(
                '.azle/canister/canister.did'
            );
            for (let i = 0; i < 10; i++) {
                execSyncPretty(`dfx build canister`);
                const updatedWasmHash = await getFileHash(
                    '.azle/canister/canister.wasm'
                );
                const updatedMainHash = await getFileHash(
                    '.azle/canister/main.js'
                );
                const updatedDidHash = await getFileHash(
                    '.azle/canister/canister.did'
                );

                expect(originalWasmHash).toBe(updatedWasmHash);
                expect(originalMainHash).toBe(updatedMainHash);
                expect(originalDidHash).toBe(updatedDidHash);
            }
        });

        it("doesn't call post upgrade when deploy is skipped from unchanged binary", async () => {
            const originalFileHash = await getFileHash(
                '.azle/canister/canister.wasm'
            );
            expect(await canister.getInitCalled()).toBe(true);
            expect(await canister.getAzleInitCalled()).toBe(true);
            for (let i = 0; i < 2; i++) {
                execSyncPretty(`dfx deploy canister`);
                const updatedHash = await getFileHash(
                    '.azle/canister/canister.wasm'
                );
                expect(originalFileHash).toEqual(updatedHash);

                expect(await canister.getInitCalled()).toBe(true);
                expect(await canister.getAzleInitCalled()).toBe(true);
                expect(await canister.getPostUpgradeCalled()).toBe(false);
                expect(await canister.getAzlePostUpgradeCalled()).toBe(false);
            }
        });

        it('does call post upgrade when deploy is forced', async () => {
            for (let i = 0; i < 2; i++) {
                execSyncPretty(`dfx deploy canister --upgrade-unchanged`);

                expect(await canister.getInitCalled()).toBe(false);
                expect(await canister.getAzleInitCalled()).toBe(false);
                expect(await canister.getPostUpgradeCalled()).toBe(true);
                expect(await canister.getAzlePostUpgradeCalled()).toBe(true);
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
