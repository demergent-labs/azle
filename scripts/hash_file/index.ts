import { createHash } from 'crypto';
import { open, FileReadResult } from 'fs/promises';

export async function hashFile(path: string): Promise<Buffer> {
    return await hashFileByParts(path, 0);
}

async function hashFileByParts(
    path: string,
    position: number,
    previousHash?: Buffer
): Promise<Buffer> {
    const { buffer, bytesRead } = await getBytesToHash(path, position);

    if (bytesRead !== 0) {
        const newHash = hashChunkWith(buffer, previousHash);
        return hashFileByParts(path, position + bytesRead, newHash);
    } else {
        // No more bytes to hash, set as final hash for this file
        if (previousHash !== undefined) {
            return previousHash;
        } else {
            // TODO if we add support for 0 byte files we might need something like this
            // return hashChunkWith(Buffer.from([]));
            throw new Error(`Error: No hash was found for ${path}`);
        }
    }
}

async function getBytesToHash(
    path: string,
    position: number
): Promise<FileReadResult<Buffer>> {
    const file = await open(path, 'r');

    // Read the bytes
    // TODO it would be great to get the size of the chunks from the canister, then we wouldn't have to every update this
    const limit = 120 * 1024 * 1024; // Must be the same as on the canister end or hashes will not match
    const buffer = Buffer.alloc(limit); // Allocate a Buffer for reading

    const fileReadResult = await file.read(buffer, 0, limit, position);
    file.close();
    return fileReadResult;
}

function hashChunkWith(data: Buffer, previousHash?: Buffer): Buffer {
    const h = createHash('sha256');
    h.update(data);
    if (previousHash !== undefined) {
        h.update(previousHash);
    }
    return h.digest();
}
