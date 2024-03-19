import { Unit, createFileOfSize, toBytes } from 'azle/scripts/file_generator';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { readdir, stat, unlink } from 'fs/promises';
import { join } from 'path';

async function pretest() {
    await clearDir(join('assets', 'auto'));
    // Edge Cases
    // TODO excluded because it will require some reworking to get 0 byte files to work and it doesn't seem urgent
    // generateFileOfSize(0, 'B');
    await generateFileOfSize(1, 'B');
    await generateFileOfSize(60 * 1024 * 1024 + 1, 'B'); //One more byte than can be processed in a single hash_file_by_parts call
    await generateFileOfSize(50 * 1024 * 1024 + 1, 'B'); //One more byte than can be processed in a single write_file_by_parts call
    await generateFileOfSize(2_000_001, 'B'); // One more byte that the high water mark of the readstream

    // Weird Cases TODO These cases may not even be needed after https://github.com/wasm-forge/stable-fs/issues/2
    // TODO excluded because there isn't room on the heap. Bring back after https://github.com/wasm-forge/stable-fs/issues/2 is resolved
    // await generateFileOfSize(2_000_000 * 18, 'B'); //Weird writing bound
    // TODO excluded because there isn't room on the heap. Bring back after https://github.com/wasm-forge/stable-fs/issues/2 is resolved
    // await generateFileOfSize(2_000_000 * 18 + 1, 'B'); //Weird writing bound

    // General Cases
    await generateFileOfSize(1, 'KiB');
    await generateFileOfSize(10, 'KiB');
    await generateFileOfSize(100, 'KiB');
    await generateFileOfSize(1, 'MiB');
    await generateFileOfSize(10, 'MiB');
    await generateFileOfSize(100, 'MiB');
    await generateFileOfSize(250, 'MiB');
    // TODO excluded because there isn't room on the heap. Bring back after https://github.com/wasm-forge/stable-fs/issues/2 is resolved
    // await generateFileOfSize(500, 'MiB');
    await generateFileOfSize(1, 'GiB');
    await generateFileOfSize(150, 'MiB', 'manual');

    execSync(`dfx canister uninstall-code backend || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();

async function generateFileOfSize(
    size: number,
    unit: Unit,
    dir: string = 'auto'
) {
    const autoDir = join('assets', dir);
    const path = join(autoDir, `test${size}${unit}`);
    const fileSize = toBytes(size, unit);
    await createFileOfSize(path, fileSize);
}

async function clearDir(dirPath: string, recursive: boolean = false) {
    if (!existsSync(dirPath)) {
        return; // Dir doesn't exists, no need to clear it
    }
    const contents = await readdir(dirPath);
    for (const name of contents) {
        const filePath = join(dirPath, name);
        const stats = await stat(filePath);
        if (stats.isFile()) {
            await unlink(filePath);
        } else if (stats.isDirectory() && recursive) {
            clearDir(filePath, true);
        }
    }
}
