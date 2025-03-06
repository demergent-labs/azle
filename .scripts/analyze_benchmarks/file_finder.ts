import { readdir, stat } from 'fs/promises';
import { join } from 'path';

/**
 * Recursively finds all benchmarks.json files in a directory and its subdirectories
 * @param dir Directory path to search
 * @returns Array of full paths to benchmarks.json files
 */
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

/**
 * Processes a single item in a directory to determine if it's a benchmark file
 * @param dir Parent directory path
 * @param item Name of the item to process
 * @returns Array of paths to benchmark files (empty if item is not a benchmark file)
 */
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
