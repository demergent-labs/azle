import { createHash } from 'crypto';
import { open } from 'fs/promises';

async function main() {
    const args = process.argv.slice(2);
    const filePath = args[0];
    const fileHash = await hashFile(filePath);
    console.log(fileHash.toString('hex'));
}

if (require.main === module) {
    main();
}

export async function hashFile(path: string): Promise<Buffer> {
    return await hashFileByParts(path, 0);
}

async function hashFileByParts(
    path: string,
    position: number,
    previousHash?: Buffer
): Promise<Buffer> {
    const file = await open(path, 'r'); // Open in read-only mode

    // Read the bytes
    // TODO Before having the stable file storage hooked up 120 worked. For right now 60 seems to be working. I think we could do more but I want to get everything in place before spending a lot of time fine tuning it
    const limit = 60 * 1024 * 1024; // Must be the same as on the canister end or hashes will not match
    const buffer = Buffer.alloc(limit); // Allocate a Buffer for reading

    const fileReadResult = await file.read(buffer, 0, limit, position);
    file.close();
    let bytesRead = fileReadResult.bytesRead;

    if (bytesRead != 0) {
        let newHash = hashChunkWith(fileReadResult.buffer, previousHash);
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

function hashChunkWith(data: Buffer, previous_hash?: Buffer): Buffer {
    const h = createHash('sha256');
    h.update(data);
    if (previous_hash !== undefined) {
        h.update(previous_hash);
    }
    return h.digest();
}
