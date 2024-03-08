import { mkdir, writeFile } from 'fs/promises';
import { dirname } from 'path';

async function main() {
    // Extract filename and size from command line arguments
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.error('Usage: node createFile.js <filename> <size>');
        process.exit(1);
    }

    const filename = args[0];
    const sizeString = args[1];
    const sizeInBytes = parseSize(sizeString);

    // Check if size is a valid number
    if (isNaN(sizeInBytes) || sizeInBytes < 0) {
        console.error(
            'Invalid size. Please provide a positive integer for size or use a valid unit (B, KB, MB, GB).'
        );
        process.exit(1);
    }

    createFileOfSize(filename, sizeInBytes, true);
    console.log(
        "File '" + filename + "' created with size " + sizeInBytes + ' bytes.'
    );
}

if (require.main === module) {
    main();
}

// Function to create a file of a specific size in bytes
export async function createFileOfSize(
    path: string,
    sizeInBytes: number,
    random: boolean = true
) {
    await mkdir(dirname(path), { recursive: true });
    let bytesWritten = 0;
    while (bytesWritten < sizeInBytes) {
        const remainingBytes = sizeInBytes - bytesWritten;
        const chunkSize = Math.min(remainingBytes, 1024); // Adjust the chunk size as needed
        const buffer = Buffer.alloc(chunkSize);
        for (let i = 0; i < chunkSize; i++) {
            if (random === undefined || random === true) {
                buffer[i] = Math.floor(Math.random() * 256); // Generate random byte value (0-255)
            } else {
                buffer[i] = 0;
            }
        }
        await writeFile(path, buffer, { flag: 'a' });
        bytesWritten += chunkSize;
    }
}

// Parse size from string with optional unit suffix (KB, MB, GB)
function parseSize(sizeString: string) {
    const sizeRegex = /^(\d+(?:\.\d+)?)([kmgb]?)$/i;
    const match = sizeString.match(sizeRegex);
    if (!match) {
        throw new Error(
            'Invalid size format. Please use format like 1, 1024B, 1.5K, 3M, 2G. If not units are provided bytes is assumed'
        );
    }

    const size = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    switch (unit) {
        case 'k':
            return toBytes(size, 'KiB');
        case 'm':
            return toBytes(size, 'MiB');
        case 'g':
            return toBytes(size, 'GiB');
    }
    return size;
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
