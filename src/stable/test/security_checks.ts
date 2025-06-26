import { execSyncPretty } from '#utils/exec_sync_pretty';

export function runSecurityChecks(): void {
    execSyncPretty('npm audit', {
        stdio: 'inherit'
    });
}
