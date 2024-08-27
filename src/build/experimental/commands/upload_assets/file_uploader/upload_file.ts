import { open, stat } from 'fs/promises';

import { hashFile } from '../../../../../../scripts/hash_file';
import { Dest, Src } from '.';
import { bytesToHumanReadable } from './bytes_to_human_readable';
import { UploaderActor } from './uploader_actor';

export async function uploadFile(
    srcPath: Src,
    destPath: Dest,
    chunkSize: number,
    actor: UploaderActor
): Promise<void> {
    if (!(await shouldBeUploaded(srcPath, destPath, actor))) {
        return;
    }
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
        const percentComplete = calculatePercentComplete(
            startIndex + bytesRead,
            fileSize
        );
        console.info(
            `Uploading chunk: ${srcPath} | ${bytesToHumanReadable(
                startIndex + bytesRead
            )}/${bytesToHumanReadable(fileSize)} : ${percentComplete.toFixed(
                2
            )}%`
        );
        // Don't await here! Awaiting the agent will result in about a 4x increase in upload time.
        // The above throttling is sufficient to manage the speed of uploads
        actor
            ._azle_upload_file_chunk(
                destPath,
                uploadStartTime,
                BigInt(startIndex),
                bytesToUpload.subarray(0, bytesRead),
                BigInt(fileSize)
            )
            .catch((error) => {
                console.error(error);
            });
    }
    file.close();
    console.info();
}

async function throttle(): Promise<void> {
    // We can only process about 4Mib per second. So if chunks are about
    // 2 MiB or less then we can only send off two per second.
    if (process.env.DFX_NETWORK === 'ic') {
        await new Promise((resolve) => setTimeout(resolve, 2_000)); // Mainnet requires more throttling. We found 2_000 by trial and error
    } else {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Should be 500 (ie 1 every 1/2 second or 2 every second)
    }
}
function calculatePercentComplete(
    bytesComplete: number,
    fileSize: number
): number {
    if (bytesComplete === 0 && fileSize === 0) {
        return 100;
    }
    return (bytesComplete / Math.max(fileSize, 1)) * 100;
}

async function shouldBeUploaded(
    srcPath: string,
    destPath: string,
    actor: UploaderActor
): Promise<boolean> {
    const localHash = (await hashFile(srcPath)).toString('hex');
    const canisterHashOption = await actor._azle_get_file_hash(destPath);
    if (canisterHashOption.length === 0) {
        return true;
    }
    return localHash !== canisterHashOption[0];
}
