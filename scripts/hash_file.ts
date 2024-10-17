import { createHash } from 'crypto';
import { readFile } from 'fs/promises';

async function getFileHash(path: string): Promise<string> {
    const fileData = await readFile(path);
    let h = createHash('sha256');
    h.update(fileData);
    const result = h.digest('hex');
    console.log(result);
    return result;
}

getFileHash(process.argv[2]);
