import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function findBenchmarkFiles(dir: string): Promise<string[]> {
    if (dir.includes('node_modules')) {
        return [];
    }
    const items = await readdir(dir);
    const itemResults = await Promise.all(
        items.map((item) => processDirectoryItem(dir, item))
    );
    return itemResults.flat();
}

async function processDirectoryItem(
    dir: string,
    item: string
): Promise<string[]> {
    const fullPath = join(dir, item);

    const statInfo = await stat(fullPath);
    if (statInfo.isDirectory()) {
        return findBenchmarkFiles(fullPath);
    }
    return item === 'benchmarks.json' ? [fullPath] : [];
}
