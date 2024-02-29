import { execSync } from 'child_process';
import { existsSync } from 'fs';

async function pretest() {
    // Edge Cases
    generateFileOfSize(0, 'B');
    generateFileOfSize(1, 'B');
    generateFileOfSize(120 * 1024 * 1024 + 1, 'B'); //One more byte than can be processed in a single hash_file_by_parts call
    generateFileOfSize(150 * 1024 * 1024 + 1, 'B'); //One more byte than can be processed in a single write_file_by_parts call
    generateFileOfSize(2_000_001, 'B'); // One more byte that the high water mark of the readstream

    // General Cases
    generateFileOfSize(1, 'KiB');
    generateFileOfSize(10, 'KiB');
    generateFileOfSize(100, 'KiB');
    generateFileOfSize(1, 'MiB');
    generateFileOfSize(10, 'MiB');
    generateFileOfSize(100, 'MiB');
    generateFileOfSize(250, 'MiB');
    // generateFileOfSize(500, 'MiB');
    // generateFileOfSize(1, 'GiB');

    execSync(`dfx canister uninstall-code large_files || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();

type Unit = 'B' | 'KiB' | 'MiB' | 'GiB';

function generateFileOfSize(size: number, unit: Unit) {
    const fileName = `assets/auto/test${size}${unit}`;
    const fileSize = `${size}${getUnitAbbreviation(unit)}`;
    if (!existsSync(fileName)) {
        execSync(
            `ts-node ../../scripts/file_generator.js ${fileName} ${fileSize}`,
            {
                stdio: 'inherit'
            }
        );
    } else {
        console.log(`${fileName} already exists. Skipping`);
    }
}

function getUnitAbbreviation(unit: Unit): string {
    if (unit === 'B') {
        return '';
    } else if (unit === 'KiB') {
        return 'K';
    } else if (unit === 'MiB') {
        return 'M';
    } else if (unit === 'GiB') {
        return 'G';
    }
    return '';
}
