import { ExecSyncOptionsWithBufferEncoding, IOType } from 'child_process';

import { execSyncPretty } from '#utils/exec_sync_pretty';
import { AZLE_ROOT } from '#utils/global_paths';

export async function runCommand(ioType: IOType = 'inherit'): Promise<void> {
    const options = {
        cwd: AZLE_ROOT,
        stdio: ioType
    };

    runAuditCommand('npm audit', options);
    runAuditCommand('npm run license-check', options);

    // TODO let's get the bin paths from the top-level package.json
    // TODO otherwise we'll have to remember to update these paths each time we add a new dependency
    runAuditCommand('cargo audit', options);
    runAuditCommand('cargo audit bin ~/.cargo/bin/cargo-auditable', options);
    runAuditCommand('cargo audit bin ~/.cargo/bin/cargo-audit', options);
    runAuditCommand(
        'cargo audit bin ~/.cargo/bin/cargo-bundle-licenses',
        options
    );
    runAuditCommand('cargo audit bin ~/.cargo/bin/cargo-deny', options);
    runAuditCommand('cargo audit bin ~/.cargo/bin/wasi2ic', options);
    runAuditCommand('cargo deny check', options);

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
