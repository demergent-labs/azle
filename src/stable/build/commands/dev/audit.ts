import { IOType } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

import { execSyncPretty } from '#utils/exec_sync_pretty';
import { AZLE_ROOT } from '#utils/global_paths';

export async function runCommand(ioType: IOType = 'inherit'): Promise<void> {
    execSyncPretty('npm audit', {
        stdio: ioType
    });
    console.info('✓ npm audit completed successfully');

    // Check if we're in a Rust project directory or need to run from AZLE_ROOT
    const currentDir = process.cwd();
    const cargoLockPath = join(currentDir, 'Cargo.lock');

    // If we're not in a directory with a Cargo.lock, run cargo commands from AZLE_ROOT
    const workingDir =
        existsSync(cargoLockPath) === true ? currentDir : AZLE_ROOT;

    execSyncPretty('cargo audit', {
        stdio: ioType,
        cwd: workingDir
    });
    console.info('✓ cargo audit completed successfully');

    execSyncPretty('cargo audit bin ~/.cargo/bin/cargo-auditable', {
        stdio: ioType
    });
    console.info(
        '✓ cargo audit bin ~/.cargo/bin/cargo-auditable completed successfully'
    );

    execSyncPretty('cargo audit bin ~/.cargo/bin/cargo-audit', {
        stdio: ioType
    });
    console.info(
        '✓ cargo audit bin ~/.cargo/bin/cargo-audit completed successfully'
    );

    execSyncPretty('cargo audit bin ~/.cargo/bin/cargo-deny', {
        stdio: ioType
    });
    console.info(
        '✓ cargo audit bin ~/.cargo/bin/cargo-deny completed successfully'
    );

    execSyncPretty('cargo audit bin ~/.cargo/bin/wasi2ic', {
        stdio: ioType
    });
    console.info(
        '✓ cargo audit bin ~/.cargo/bin/wasi2ic completed successfully'
    );

    execSyncPretty('cargo deny check', {
        stdio: ioType,
        cwd: workingDir
    });
    console.info('✓ cargo deny check completed successfully');

    console.info('\n🎉 All security audit checks completed successfully!');
}
