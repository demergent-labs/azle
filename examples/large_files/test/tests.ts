import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test } from 'azle/test';
import { generateIdentity, getCanisterId } from 'azle/dfx';
import { execSync } from 'child_process';
import { hashFile } from 'azle/scripts/hash_file';
import { join } from 'path';
import { rm } from 'fs/promises';
import { generateTestFileOfSize } from './generateTestFiles';
import { createActor } from 'azle/src/compiler/file_uploader/uploader_actor';
import { v4 } from 'uuid';
import { AZLE_UPLOADER_IDENTITY_NAME } from '../../../src/compiler/file_uploader/uploader_identity';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;
    const unauthorizedUser = `test_azle_unauthorized_${v4()}`;

    return [
        {
            name: 'Set up unauthorized user',
            prep: async () => {
                generateIdentity(unauthorizedUser);
            }
        },
        {
            name: 'Unauthorized Upload from actor',
            test: async () => {
                const destPath = 'assets/unauthorizedAddition';
                const actor = await createActor(
                    getCanisterId('backend'),
                    unauthorizedUser
                );
                try {
                    await actor.upload_file_chunk(
                        destPath,
                        0n,
                        0n,
                        Uint8Array.from([1, 2, 3, 4]),
                        4n
                    );
                } catch (err: any) {
                    return {
                        Ok: err.message.includes(
                            'Not Authorized: must be a controller to call this method'
                        )
                    };
                }
                return { Ok: false };
            }
        },
        {
            name: 'Unauthorized get hash status from actor',
            test: async () => {
                const actor = await createActor(
                    getCanisterId('backend'),
                    unauthorizedUser
                );
                try {
                    await actor.get_hash_status('assets/test0B');
                } catch (err: any) {
                    return {
                        Ok: err.message.includes(
                            'Not Authorized: must be a controller to call this method'
                        )
                    };
                }
                return { Ok: false };
            }
        },
        {
            name: 'Unauthorized get hash from actor',
            test: async () => {
                const actor = await createActor(
                    getCanisterId('backend'),
                    unauthorizedUser
                );
                try {
                    await actor.get_file_hash('assets/test0B');
                } catch (err: any) {
                    return {
                        Ok: err.message.includes(
                            'Not Authorized: must be a controller to call this method'
                        )
                    };
                }
                return { Ok: false };
            }
        },
        {
            name: 'Unauthorized clear file and info from actor',
            test: async () => {
                const actor = await createActor(
                    getCanisterId('backend'),
                    unauthorizedUser
                );
                try {
                    await actor.clear_file_and_info('assets/test0B');
                } catch (err: any) {
                    return {
                        Ok: err.message.includes(
                            'Not Authorized: must be a controller to call this method'
                        )
                    };
                }
                return { Ok: false };
            }
        },
        // Permanent Assets
        generateTest(
            origin,
            'photos/people/george-washington.tif',
            'permanent'
        ),
        generateTest(origin, 'photos/places/dinosaurNM.jpg', 'permanent'),
        generateTest(origin, 'photos/places/slc.jpg', 'permanent'),
        generateTest(origin, 'photos/things/book.jpg', 'permanent'),
        generateTest(origin, 'photos/things/utah-teapot.jpg', 'permanent'),
        generateTest(
            origin,
            'text/subfolder/deep-sub-folder/deep.txt',
            'permanent'
        ),
        generateTest(
            origin,
            'text/subfolder/sibling-deep-sub-folder/deep.txt',
            'permanent'
        ),
        generateTest(origin, 'text/subfolder/other-thing.txt', 'permanent'),
        generateTest(origin, 'text/thing.txt', 'permanent'),
        generateTest(origin, 'text/thing.txt', 'permanent'),
        generateTest(origin, 'text/single.txt', undefined, 'single_asset.txt'),

        // Auto Generated Assets
        //      Edge Cases
        generateTest(origin, 'test0B', 'auto'),
        generateTest(origin, 'test1B', 'auto'),
        generateTest(origin, `test${120 * 1024 * 1024 + 1}B`, 'auto'),
        generateTest(origin, 'test2000001B', 'auto'),
        //      General Cases
        generateTest(origin, 'test1KiB', 'auto'),
        generateTest(origin, 'test10KiB', 'auto'),
        generateTest(origin, 'test100KiB', 'auto'),
        generateTest(origin, 'test1MiB', 'auto'),
        generateTest(origin, 'test10MiB', 'auto'),
        generateTest(origin, 'test100MiB', 'auto'),
        generateTest(origin, 'test250MiB', 'auto'),
        generateTest(origin, 'test1GiB', 'auto'),
        // Manual Upload
        {
            name: 'test manual upload',
            test: async () => {
                execSync(
                    `npx azle upload-assets backend assets/manual/test150MiB assets/test150MiB`,
                    {
                        stdio: 'inherit'
                    }
                );

                const response = await fetch(
                    `${origin}/exists?path=assets/test150MiB`
                );

                return { Ok: (await response.json()) === true };
            }
        },
        generateTest(origin, 'test150MiB', 'manual'),
        // TODO CI CD isn't working with the 2GiB tests so we're just going to have this one for local tests.
        {
            name: 'deploy',
            prep: async () => {
                await rm(join('assets', 'auto'), {
                    recursive: true,
                    force: true
                });
                await generateTestFileOfSize(2, 'GiB');
                execSync(`dfx deploy --upgrade-unchanged`, {
                    stdio: 'inherit'
                });
            },
            skip: true
        },
        { ...generateTest(origin, 'test2GiB', 'auto'), skip: true }
    ];
}

/**
 * Generate a test for file uploading. Hashes the local file and compares it to
 * the hash of the uploaded file. Assumes that all of the files both on the
 * canister and local side are in a directory called "assets". The parameter
 * localDir allows for difference between the canisterPath and localPath and
 * will be inserted between "assets" and the rest of the file path to the local
 * asset. If localPath is defined it will be used for the localPath. Otherwise
 * it will be assumed that the canisterPath is the same as the localPath.
 * @param origin
 * @param canisterPath
 * @param localDir
 * @param localPath
 * @returns
 */
function generateTest(
    origin: string,
    canisterPath: string,
    localDir?: string,
    localPath?: string
): Test {
    return {
        name: `upload: ${canisterPath}`,
        test: async () => {
            const canisterFilePath = join('assets', canisterPath);
            const localFilePath = join(
                'assets',
                localDir ?? '',
                localPath ?? canisterPath
            );

            const expectedHash = (await hashFile(localFilePath)).toString(
                'hex'
            );

            const response = await fetch(
                `${origin}/exists?path=${canisterFilePath}`
            );
            const exists = await response.json();

            if (exists === false) {
                return {
                    Err: `File ${canisterFilePath} failed to upload`
                };
            }

            const actor = await createActor(
                getCanisterId('backend'),
                AZLE_UPLOADER_IDENTITY_NAME
            );
            const hash = await actor.get_file_hash(canisterFilePath);

            if (hash.length === 1) {
                return { Ok: hash[0] === expectedHash };
            }
            return { Err: `File not found on canister` };
        }
    };
}
