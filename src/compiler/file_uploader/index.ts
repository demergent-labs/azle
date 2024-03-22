import { Actor, ActorSubclass } from '@dfinity/agent';
import { existsSync } from 'fs';
import { createAgent, getCanisterId } from '../../../dfx';
import { readdir, stat, open } from 'fs/promises';
import { join } from 'path';

type Src = string;
type Dest = string;

export async function uploadFiles(canisterName: string, paths: [Src, Dest][]) {
    const canisterId = getCanisterId(canisterName);
    const actor = await createUploadFileChunkActor(canisterId);

    const chunkSize = 2_000_000; // The current message limit is about 2 MB

    const expandedPaths = await expandPaths(paths);

    for (const [srcPath, destPath] of expandedPaths) {
        // Await each upload so the canister doesn't get overwhelmed by requests
        await uploadFile(srcPath, destPath, chunkSize, actor);
    }

    let complete = false;
    let endAttempts = 0;
    process.on('beforeExit', async (code) => {
        endAttempts++;
        if (complete) {
            return;
        }
        complete = await verifyUploadAndHashingComplete(
            canisterId,
            expandedPaths,
            false // TODO end after a number of attempts?
        );
        await new Promise((resolve) => setTimeout(resolve, 5000));
    });
    process.on('exit', async (code) => {
        const incompleteFiles = await getListOfIncompleteFiles(
            paths,
            canisterId
        );
        for (const incompleteFile of incompleteFiles) {
            // TODO I actually thing I want to do the file clean up here, because it's not strictly necessary for the performance of the canister. So we could delete in the background
            console.log(`TODO remove ${incompleteFile}`);
        }
    });
}

async function expandPaths(paths: [Src, Dest][]) {
    return paths.reduce(
        async (accPromise: Promise<[Src, Dest][]>, [srcPath, destPath]) => {
            const acc = await accPromise;
            return [...acc, ...(await expandPath(srcPath, destPath))];
        },
        Promise.resolve([])
    );
}

async function expandPath(
    srcPath: Src,
    destPath: Dest
): Promise<[Src, Dest][]> {
    if (!existsSync(srcPath)) {
        throw new Error(`${srcPath} does not exist`);
    }

    const stats = await stat(srcPath);
    if (stats.isDirectory()) {
        return await expandDirectory(srcPath, destPath);
    } else {
        return [[srcPath, destPath]];
    }
}

async function expandDirectory(
    srcDir: string,
    destDir: string
): Promise<[Src, Dest][]> {
    try {
        const contents = await readdir(srcDir);
        return contents.reduce(
            async (accPromise: Promise<[Src, Dest][]>, name) => {
                const acc = await accPromise;
                const srcPath = join(srcDir, name);
                const destPath = join(destDir, name);
                return [...acc, ...(await expandPath(srcPath, destPath))];
            },
            Promise.resolve([])
        );
    } catch (error) {
        throw new Error(`Error reading directory: ${error}`);
    }
}

async function uploadFile(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: ActorSubclass
) {
    const uploadStartTime = process.hrtime.bigint();
    const fileSize = (await stat(srcPath)).size;
    const file = await open(srcPath, 'r');
    for (let startIndex = 0; startIndex <= fileSize; startIndex += chunkSize) {
        let buffer = Buffer.alloc(chunkSize);
        const { buffer: bytesToUpload, bytesRead } = await file.read(
            buffer,
            0,
            chunkSize,
            startIndex
        );

        await throttle();
        console.info(
            `Uploading chunk: ${srcPath} | ${bytesToHumanReadable(
                startIndex + bytesRead
            )}/${bytesToHumanReadable(fileSize)}`
        );
        // Don't await here! Awaiting the agent will result in about a 4x increase in upload time.
        // The above throttling is sufficient to manage the speed of uploads
        actor
            .upload_file_chunk(
                destPath,
                uploadStartTime,
                startIndex,
                bytesToUpload.subarray(0, bytesRead),
                fileSize
            )
            .catch((error) => {
                console.error(error);
            });
    }
    file.close();
    console.info();
}

function bytesToHumanReadable(sizeInBytes: number): string {
    const suffixes = ['B', 'KiB', 'MiB', 'GiB'];

    const result = suffixes.reduce(
        (acc, suffix) => {
            if (acc.done) {
                return acc;
            }
            if (acc.size < 1024.0) {
                acc.unit = suffix;
                return {
                    ...acc,
                    unit: suffix,
                    done: true
                };
            }
            return {
                ...acc,
                size: acc.size / 1024.0
            };
        },
        { size: sizeInBytes, unit: '', done: false }
    );

    return `${result.size.toFixed(2)} ${result.unit}`;
}

async function throttle() {
    // We can only process about 4Mib per second. So if chunks are about
    // 2 MiB or less then we can only send off two per second.
    if (process.env.DFX_NETWORK === 'ic') {
        await new Promise((resolve) => setTimeout(resolve, 2_000)); // Mainnet requires more throttling. We found 2_000 by trial and error
    } else {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Should be 500 (ie 1 every 1/2 second or 2 every second)
    }
}

async function createUploadFileChunkActor(
    canisterId: string
): Promise<ActorSubclass> {
    const agent = await createAgent();

    return Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                upload_file_chunk: IDL.Func(
                    [
                        IDL.Text,
                        IDL.Nat64,
                        IDL.Nat64,
                        IDL.Vec(IDL.Nat8),
                        IDL.Nat64
                    ],
                    [],
                    []
                )
            });
        },
        {
            agent,
            canisterId
        }
    );
}

async function createGetFileHashActor(
    canisterId: string
): Promise<ActorSubclass> {
    const agent = await createAgent();

    return Actor.createActor(
        ({ IDL }) => {
            return IDL.Service({
                get_file_hash: IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], [])
            });
        },
        {
            agent,
            canisterId
        }
    );
}

async function verifyUploadAndHashingComplete(
    canisterId: string,
    paths: [Src, Dest][],
    finished: boolean
): Promise<boolean> {
    let incompleteFiles = await getListOfIncompleteFiles(paths, canisterId);
    if (incompleteFiles.length === 0 || finished) {
        return true;
    } else {
        console.log(
            `Missing hashes for ${
                incompleteFiles.length
            } files:\n${incompleteFiles.join(
                '\n'
            )}. Waiting 5 seconds and then we'll try again.`
        );
        return false;
    }
}

async function getListOfIncompleteFiles(
    paths: [Src, Dest][],
    canisterId: string
): Promise<[Src, Dest][]> {
    const filters = await Promise.all(
        paths.map(async ([_, destPath]) => {
            try {
                let hashActor = await createGetFileHashActor(canisterId);
                const result = (await hashActor.get_file_hash(destPath)) as
                    | []
                    | [string];
                return result.length === 0;
            } catch {
                return true;
            }
        })
    );
    return paths.filter((_, index) => filters[index]);
}
