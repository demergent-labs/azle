import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { Src, Dest } from '.';

export async function expandPaths(paths: [Src, Dest][]) {
    return paths.reduce(
        async (accPromise: Promise<[Src, Dest][]>, [srcPath, destPath]) => {
            const acc = await accPromise;
            return [...acc, ...(await expandPath(srcPath, destPath))];
        },
        Promise.resolve([])
    );
}

async function expandPath(
    srcPath: Src,
    destPath: Dest
): Promise<[Src, Dest][]> {
    const stats = await stat(srcPath);
    if (stats.isDirectory()) {
        return await expandDirectory(srcPath, destPath);
    } else {
        return [[srcPath, destPath]];
    }
}

async function expandDirectory(
    srcDir: string,
    destDir: string
): Promise<[Src, Dest][]> {
    try {
        const contents = await readdir(srcDir);
        return contents.reduce(
            async (accPromise: Promise<[Src, Dest][]>, name) => {
                const acc = await accPromise;
                const srcPath = join(srcDir, name);
                const destPath = join(destDir, name);
                return [...acc, ...(await expandPath(srcPath, destPath))];
            },
            Promise.resolve([])
        );
    } catch (error) {
        throw new Error(`Error reading directory: ${error}`);
    }
}
