import { appendFile, mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

export type Unit = 'B' | 'KiB' | 'MiB' | 'GiB';

// Function to create a file of a specific size in bytes
export async function generateFileOfSize(path: string, sizeInBytes: number) {
    await ensureDirectoryExists(path);
    await ensureFileEmptyOrCreate(path);
    await fillFileWithRandomBytes(path, sizeInBytes);

    console.info(`File created ${path}: ${sizeInBytes} bytes`);
}

export function toBytes(numBytes: number, unit: Unit): number {
    if (unit === 'B') {
        return numBytes;
    } else if (unit === 'KiB') {
        return numBytes * 1024;
    } else if (unit === 'MiB') {
        return numBytes * 1024 * 1024;
    } else if (unit === 'GiB') {
        return numBytes * 1024 * 1024 * 1024;
    }
    throw new Error('Invalid Unit. Must be B, KiB, MiB, or GiB');
}

async function ensureDirectoryExists(path: string) {
    await mkdir(dirname(path), { recursive: true });
}

async function ensureFileEmptyOrCreate(path: string) {
    await writeFile(path, Buffer.from([]));
}

async function fillFileWithRandomBytes(path: string, sizeInBytes: number) {
    const defaultChunkSize = 1024 * 1024; // 1 MiB. Size can be adjusted. By trial and error this gave good speeds and 1MB should be small enough for most machines running this to handle
    const totalChunks = Math.ceil(sizeInBytes / defaultChunkSize);
    for (let i = 0; i < totalChunks; i++) {
        const remainingBytes = sizeInBytes - i * defaultChunkSize;
        const chunkSize = Math.min(remainingBytes, defaultChunkSize);
        const randomBytes = await createRandomBytes(chunkSize);
        await appendFile(path, randomBytes);
    }
}

function createRandomBytes(size: number): Buffer {
    let buffer = Buffer.alloc(size);
    for (let byte = 0; byte < size; byte++) {
        buffer[byte] = Math.floor(Math.random() * 256); // Generate random byte value (0-255)
    }
    return buffer;
}
