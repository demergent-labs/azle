import * as dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import { Test, getCanisterId } from 'azle/test';
import { Actor, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { hashFile } from 'azle/scripts/hash_file';

export function getTests(canisterId: string): Test[] {
    const origin = `http://${canisterId}.localhost:8000`;

    return [
        generateTest(
            'photos/people/george-washington.tif',
            'permanent',
            origin
        ),
        generateTest('photos/places/dinosaurNM.jpg', 'permanent', origin),
        generateTest('photos/places/slc.jpg', 'permanent', origin),
        generateTest('photos/things/book.jpg', 'permanent', origin),
        generateTest('photos/things/utah-teapot.jpg', 'permanent', origin),
        generateTest(
            'text/subfolder/deep-sub-folder/deep.txt',
            'permanent',
            origin
        ),
        generateTest(
            'text/subfolder/sibling-deep-sub-folder/deep.txt',
            'permanent',
            origin
        ),
        generateTest('text/subfolder/other-thing.txt', 'permanent', origin),
        generateTest('text/thing.txt', 'permanent', origin),
        generateTest('text/thing.txt', 'permanent', origin),
        generateTest('text/single.txt', '', origin, 'single_asset.txt'),
        { ...generateTest('test0B', 'auto', origin), skip: true }, // TODO we have problems with 0B files on the canister side
        generateTest('test1B', 'auto', origin),
        generateTest(`test${120 * 1024 * 1024 + 1}B`, 'auto', origin),
        generateTest(`test${150 * 1024 * 1024 + 1}B`, 'auto', origin),
        generateTest('test2000001B', 'auto', origin),
        generateTest('test1KiB', 'auto', origin),
        generateTest('test10KiB', 'auto', origin),
        generateTest('test100KiB', 'auto', origin),
        generateTest('test1MiB', 'auto', origin),
        generateTest('test10MiB', 'auto', origin),
        generateTest('test100MiB', 'auto', origin),
        generateTest('test250MiB', 'auto', origin),
        { ...generateTest('test500MiB', 'auto', origin), skip: true }, // We currently run out of memory with this file
        generateTest('test1GiB', 'auto', origin)
    ];
}

function generateTest(
    fileName: string,
    nodeDir: string,
    origin: string,
    nodeName?: string
): Test {
    return {
        name: `upload: ${fileName}`,
        test: async () => {
            const canisterFilePath = `assets/${fileName}`;
            const dir = nodeDir === '' ? '' : `/${nodeDir}`;
            const nodeFileName = nodeName ?? fileName;
            const nodeFilePath = `assets${dir}/${nodeFileName}`;
            const actor = await createGetFileHashActor(
                getCanisterId('large_files'),
                '8000'
            );

            const expectedHash = (await hashFile(nodeFilePath)).toString('hex');

            let response = await fetch(
                `${origin}/exists?path=${canisterFilePath}`
            );
            let exits = await response.json();

            if (exits === false) {
                return {
                    Err: `File ${canisterFilePath} failed to upload`
                };
            }

            // let attempts = 0;
            // while (exits === false) {
            //     await new Promise((resolve) => setTimeout(resolve, 5000));
            //     let response = await fetch(
            //         `${origin}/exists?path=${canisterFilePath}`
            //     );
            //     exits = await response.json();
            //     if (attempts++ > 2) {
            //         return {
            //             Err: `File ${canisterFilePath} failed to upload`
            //         };
            //     }
            // }

            const hash = await actor.get_file_hash(`${canisterFilePath}`);
            return { Ok: hash === expectedHash };
        }
    };
}

async function createGetFileHashActor(
    canisterId: string,
    replicaWebServerPort: string
): Promise<ActorSubclass> {
    const agent = new HttpAgent({
        host: `http://127.0.0.1:${replicaWebServerPort}`
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
