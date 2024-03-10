import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { Unit, createFileOfSize, toBytes } from 'azle/scripts/file_generator';

async function pretest() {
    // Edge Cases
    // generateFileOfSize(0, 'B');
    generateFileOfSize(1, 'B');
    generateFileOfSize(120 * 1024 * 1024 + 1, 'B'); //One more byte than can be processed in a single hash_file_by_parts call
    generateFileOfSize(150 * 1024 * 1024 + 1, 'B'); //One more byte than can be processed in a single write_file_by_parts call
    generateFileOfSize(2_000_001, 'B'); // One more byte that the high water mark of the readstream

    // Weird Cases
    // generateFileOfSize(2_000_000 * 18, 'B'); //Weird writing bound
    // generateFileOfSize(2_000_000 * 18 + 1, 'B'); //Weird writing bound

    // General Cases
    // generateFileOfSize(1, 'KiB');
    // generateFileOfSize(10, 'KiB');
    // generateFileOfSize(100, 'KiB');
    // generateFileOfSize(1, 'MiB');
    // generateFileOfSize(10, 'MiB');
    // generateFileOfSize(100, 'MiB');
    // generateFileOfSize(250, 'MiB');
    // generateFileOfSize(500, 'MiB');
    // generateFileOfSize(1, 'GiB');

    execSync(`dfx canister uninstall-code backend || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();

function generateFileOfSize(size: number, unit: Unit) {
    const path = `assets/auto/test${size}${unit}`;
    const fileSize = toBytes(size, unit);
    if (!existsSync(path)) {
        createFileOfSize(path, fileSize);
    } else {
        console.log(`${path} already exists. Skipping`);
    }
}
