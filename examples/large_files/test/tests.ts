import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test, getAgentHost, getCanisterId } from 'azle/test';
import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { hashFile } from 'azle/scripts/hash_file';
import { join } from 'path';
import { uploadAssets } from 'azle/src/compiler/asset_uploader';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        { name: 'wait for things to finish uploading', wait: 1 * 1000 },
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
        { ...generateTest(origin, 'test0B', 'auto'), skip: true }, // TODO we have problems with 0B files on the canister side
        generateTest(origin, 'test1B', 'auto'),
        generateTest(origin, `test${60 * 1024 * 1024 + 1}B`, 'auto'),
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
        // TODO excluded because there isn't room on the heap. Bring back after https://github.com/wasm-forge/stable-fs/issues/2 is resolved
        { ...generateTest(origin, 'test500MiB', 'auto'), skip: true }, // We currently run out of memory with this file
        {
            ...generateTest(origin, `test${2_000_000 * 18}B`, 'auto'),
            skip: true
        },
        {
            ...generateTest(origin, `test${2_000_000 * 18 + 1}B`, 'auto'),
            skip: true
        },
        {
            name: 'test manual upload',
            test: async () => {
                await uploadAssets('backend', [
                    ['assets/manual/test150MiB', 'assets/test150MiB']
                ]);

                await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

                const response = await fetch(
                    `${origin}/exists?path=assets/test150MiB`
                );

                return { Ok: (await response.json()) === true };
            }
        },
        generateTest(origin, 'test150MiB', 'manual')
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

            const actor = await createGetFileHashActor(
                getCanisterId('backend')
            );

            const expectedHash = (await hashFile(localFilePath)).toString(
                'hex'
            );

            const response = await fetch(
                `${origin}/exists?path=${canisterFilePath}`
            );
            const exits = await response.json();

            if (exits === false) {
                return {
                    Err: `File ${canisterFilePath} failed to upload`
                };
            }

            const hash = await actor.get_file_hash(`${canisterFilePath}`);
            return { Ok: hash === expectedHash };
        }
    };
}

async function createGetFileHashActor(
    canisterId: string
): Promise<ActorSubclass> {
    const agent = new HttpAgent({
        host: getAgentHost()
    });

    if (process.env.DFX_NETWORK !== 'ic') {
        await agent.fetchRootKey();
    }

    return Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                get_file_hash: IDL.Func([IDL.Text], [IDL.Text], [])
            });
        },
        {
            agent,
            canisterId
        }
    );
}
