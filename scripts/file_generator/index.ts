import { writeFile } from 'fs-extra';
import { mkdir, appendFile } from 'fs/promises';
import { dirname } from 'path';

// Function to create a file of a specific size in bytes
export async function createFileOfSize(path: string, sizeInBytes: number) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, Buffer.from([])); // Clear file if it already exists
    const defaultChunkSize = 1024 * 1024; // Size can be adjusted. By trial and error this gave good speeds and 1MB should be small enough for most machines running this to handle
    const buffer = Buffer.alloc(defaultChunkSize);
    const totalChunks = Math.ceil(sizeInBytes / defaultChunkSize);
    for (let i = 0; i < totalChunks; i++) {
        const remainingBytes = sizeInBytes - i * defaultChunkSize;
        const chunkSize = Math.min(remainingBytes, defaultChunkSize);
        for (let byte = 0; byte < chunkSize; byte++) {
            buffer[byte] = Math.floor(Math.random() * 256); // Generate random byte value (0-255)
        }
        await appendFile(path, buffer.subarray(0, chunkSize));
    }
    console.info(`File created ${path}: ${sizeInBytes} bytes`);
}

export type Unit = 'B' | 'KiB' | 'MiB' | 'GiB';

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
