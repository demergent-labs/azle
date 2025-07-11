import { ExecSyncOptionsWithBufferEncoding, IOType } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

import { execSyncPretty } from '#utils/exec_sync_pretty';
import { AZLE_ROOT } from '#utils/global_paths';

export async function runCommand(ioType: IOType = 'inherit'): Promise<void> {
    runAuditCommand('npm audit', {
        stdio: ioType
    });

    // Check if we're in a Rust project directory or need to run from AZLE_ROOT
    const currentDir = process.cwd();
    const cargoLockPath = join(currentDir, 'Cargo.lock');

    // If we're not in a directory with a Cargo.lock, run cargo commands from AZLE_ROOT
    const workingDir =
        existsSync(cargoLockPath) === true ? currentDir : AZLE_ROOT;
    const cargoOpts = {
        stdio: ioType,
        cwd: workingDir
    };

    runAuditCommand('cargo audit', cargoOpts);
    runAuditCommand('cargo audit bin ~/.cargo/bin/cargo-auditable', cargoOpts);
    runAuditCommand('cargo audit bin ~/.cargo/bin/cargo-audit', cargoOpts);
    runAuditCommand('cargo audit bin ~/.cargo/bin/cargo-deny', cargoOpts);
    runAuditCommand('cargo audit bin ~/.cargo/bin/wasi2ic', cargoOpts);
    runAuditCommand('cargo deny check', cargoOpts);

    console.info('\n🎉 All security audit checks completed successfully!');
}
/**
 * Runs an audit command and logs a success message
 * @param command - The command to execute
 * @param options - Options to pass to execSyncPretty
 */
function runAuditCommand(
    command: string,
    options?: ExecSyncOptionsWithBufferEncoding
): void {
    execSyncPretty(command, options);
    console.info(`✓ ${command} completed successfully`);
}
