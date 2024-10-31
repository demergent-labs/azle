import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

async function getFileHash(path: string): Promise<string> {
    const fileData = await readFile(path);
    return createHash('sha256').update(fileData).digest('hex');
}

getFileHash(process.argv[2]).then(console.info);
