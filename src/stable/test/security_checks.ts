import { execSyncPretty } from '#utils/exec_sync_pretty';

export function runSecurityChecks(): void {
    try {
        console.info('Running npm audit...');
        execSyncPretty('npm audit', {
            stdio: 'inherit'
        });
        console.info('npm audit check passed.');
    } catch (error) {
        console.error(`npm audit check failed: ${error}`);
        console.error('This may be due to network connectivity issues.');
        console.error(
            'You should run npm audit manually when network access is available.'
        );
        throw new Error(`npm audit check failed: ${error}`);
    }
}
