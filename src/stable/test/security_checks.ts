import { execSyncPretty } from '#utils/exec_sync_pretty';

export function runSecurityChecks(): void {
    // NPM Audit
    try {
        console.info('Running npm audit...');
        execSyncPretty('npm audit --production', {
            stdio: 'inherit'
        });
        console.info('npm audit check passed.');
    } catch (error) {
        throw new Error(`npm audit check failed: ${error}`);
    }

    // Cargo Audit
    try {
        console.info('Running cargo audit...');
        execSyncPretty('cargo audit', {
            stdio: 'inherit'
        });
        console.info('cargo audit check passed.');
    } catch (error) {
        throw new Error(`cargo audit check failed: ${error}`);
    }

    // Cargo Deny
    try {
        console.info('Running cargo deny...');
        execSyncPretty('cargo deny check licenses', {
            stdio: 'inherit'
        });
        console.info('cargo deny check passed.');
    } catch (error) {
        throw new Error(`cargo deny check failed: ${error}`);
    }
}
