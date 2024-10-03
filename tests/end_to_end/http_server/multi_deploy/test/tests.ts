import { expect, it, Test } from 'azle/test';
import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

import { execSyncPretty } from '../../../../../src/build/stable/utils/exec_sync_pretty';

export function getTests(canisterId: string): Test {
    const origin = `http://${canisterId}.localhost:8000`;

    return () => {
        it('has the same binary between builds', async () => {
            const originalFileHash = await getFileHash();

            for (let i = 0; i < 10; i++) {
                execSyncPretty(`dfx build multi_deploy`);

                const updatedHash = await getFileHash();

                expect(originalFileHash).toEqual(updatedHash);
            }
        });

        it("doesn't call post upgrade if there is a redeploy with no change", async () => {
            const originalFileHash = await getFileHash();

            expect(await getBooleanResponse(`${origin}/get-init-called`)).toBe(
                true
            );
            expect(
                await getBooleanResponse(`${origin}/get-azle-init-called`)
            ).toBe(true);

            for (let i = 0; i < 1; i++) {
                execSyncPretty(`dfx deploy multi_deploy`);

                const updatedHash = await getFileHash();

                expect(originalFileHash).toEqual(updatedHash);
                expect(
                    await getBooleanResponse(`${origin}/get-init-called`)
                ).toBe(false);
                expect(
                    await getBooleanResponse(`${origin}/get-azle-init-called`)
                ).toBe(false);
                expect(
                    await getBooleanResponse(
                        `${origin}/get-post-upgrade-called`
                    )
                ).toBe(true);
                expect(
                    await getBooleanResponse(
                        `${origin}/get-azle-post-upgrade-called`
                    )
                ).toBe(true);
            }
        });

        it('does call post upgrade if there is a redeploy with no change', async () => {
            for (let i = 0; i < 1; i++) {
                execSyncPretty(`dfx deploy multi_deploy --upgrade-unchanged`);

                expect(
                    await getBooleanResponse(`${origin}/get-init-called`)
                ).toBe(false);
                expect(
                    await getBooleanResponse(`${origin}/get-azle-init-called`)
                ).toBe(false);
                expect(
                    await getBooleanResponse(
                        `${origin}/get-post-upgrade-called`
                    )
                ).toBe(true);
                expect(
                    await getBooleanResponse(
                        `${origin}/get-azle-post-upgrade-called`
                    )
                ).toBe(true);
            }
        });
    };
}

async function getBooleanResponse(path: string): Promise<boolean> {
    const response = await fetch(`${path}`);
    return Boolean(await response.json());
}

async function getFileHash(): Promise<Buffer> {
    const fileData = await readFile('.azle/multi_deploy/multi_deploy.wasm');
    const h = createHash('sha256');
    h.update(fileData);
    return h.digest();
}
