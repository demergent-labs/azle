import { generateFileOfSize, toBytes } from '.';

async function main() {
    const { path, sizeInBytes } = parseArgs();

    await generateFileOfSize(path, sizeInBytes);
    console.info(`File '${path}' created with size ${sizeInBytes} bytes.`);
}

main();

function parseArgs(): { path: string; sizeInBytes: number } {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.error('Usage: node file_generator/bin.js <filePath> <size>');
        process.exit(1);
    }

    const path = args[0];
    const sizeString = args[1];
    const sizeInBytes = parseSize(sizeString);

    // Check if size is a valid number
    if (isNaN(sizeInBytes) || sizeInBytes < 0) {
        console.error(
            'Invalid size. Please provide a positive integer for size or use a valid unit (B, KB, MB, GB).'
        );
        process.exit(1);
    }

    return { path, sizeInBytes };
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
