import { Actor, ActorSubclass } from '@dfinity/agent';
import { existsSync, createReadStream } from 'fs';
import { createAgent, getCanisterId } from '../../../dfx';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

type Src = string;
type Dest = string;

export async function uploadFiles(canisterName: string, paths: [Src, Dest][]) {
    const actor = await createUploadFileChunkActor(getCanisterId(canisterName));

    const chunkSize = 2_000_000; // The current message limit is about 2 MB

    for (const [srcPath, destPath] of paths) {
        // Await each upload so the canister doesn't get overwhelmed by requests
        await upload(srcPath, destPath, chunkSize, actor);
    }
}

async function upload(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: ActorSubclass
) {
    if (!existsSync(srcPath)) {
        throw new Error(`${srcPath} does not exist`);
    }

    const stats = await stat(srcPath);
    if (stats.isDirectory()) {
        // Await each upload so the canister doesn't get overwhelmed by requests
        await uploadDirectory(srcPath, destPath, chunkSize, actor);
    } else {
        // Await each upload so the canister doesn't get overwhelmed by requests
        await uploadFile(srcPath, destPath, chunkSize, actor);
    }
}

async function uploadDirectory(
    srcDir: string,
    destDir: string,
    chunkSize: number,
    actor: ActorSubclass
) {
    try {
        const contents = await readdir(srcDir);
        for (const name of contents) {
            const srcPath = join(srcDir, name);
            const destPath = join(destDir, name);
            // Await each upload so the canister doesn't get overwhelmed by requests
            await upload(srcPath, destPath, chunkSize, actor);
        }
    } catch (error) {
        console.error(`Error reading directory: ${error}`);
    }
}

async function uploadFile(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: ActorSubclass
) {
    console.info(`uploadFile: Uploading ${srcPath} to ${destPath}`);
    const uploadStartTime = process.hrtime.bigint();
    const fileSize = (await stat(srcPath)).size;
    for (let i = 0; i < fileSize; i += chunkSize) {
        const fileStream = createReadStream(srcPath, {
            start: i,
            end: i + chunkSize - 1,
            highWaterMark: chunkSize
        });

        let startIndex = i;
        for await (const data of fileStream) {
            await throttle();
            console.info(
                `uploadFile: ${srcPath} | ${bytesToHumanReadable(
                    i + data.length
                )} of ${bytesToHumanReadable(fileSize)}`
            );
            // Don't await here! Awaiting the agent will result in about a 4x increase in upload time.
            // The above throttling is sufficient to manage the speed of uploads
            actor
                .upload_file_chunk(destPath, uploadStartTime, i, data, fileSize)
                .catch((error) => {
                    console.error(error);
                });
            startIndex += data.length;
        }
    }
    console.info(`uploadFile: finished ${srcPath}`);
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
