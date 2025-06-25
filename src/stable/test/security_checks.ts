import { execSync } from 'node:child_process';

import { execSyncPretty } from '#utils/exec_sync_pretty';

export function runSecurityChecks(): void {
    // Check if security checks should be skipped due to connectivity issues
    if (process.env.AZLE_SKIP_SECURITY_AUDIT === 'true') {
        console.warn(
            'Skipping security checks due to AZLE_SKIP_SECURITY_AUDIT=true'
        );
        return;
    }

    // Check for installed tools
    const toolsInstalled = {
        cargoAudit: isCommandInstalled('cargo audit --version'),
        cargoDeny: isCommandInstalled('cargo deny --version')
    };

    // NPM Audit
    try {
        console.info('Running npm audit...');
        execSyncPretty('npm audit --production', {
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

    // Cargo Audit
    if (toolsInstalled.cargoAudit) {
        try {
            console.info('Running cargo audit...');
            execSyncPretty('cargo audit', {
                stdio: 'inherit'
            });
            console.info('cargo audit check passed.');
        } catch (error) {
            throw new Error(`cargo audit check failed: ${error}`);
        }
    } else {
        console.error(
            'cargo-audit is not installed, security check incomplete'
        );
        console.error(
            'Run "cargo install cargo-audit --version 0.20.0" to install it'
        );
        throw new Error('cargo-audit is not installed');
    }

    // Cargo Deny
    if (toolsInstalled.cargoDeny) {
        try {
            console.info('Running cargo deny...');
            execSyncPretty('cargo deny check licenses', {
                stdio: 'inherit'
            });
            console.info('cargo deny check passed.');
        } catch (error) {
            throw new Error(`cargo deny check failed: ${error}`);
        }
    } else {
        console.error('cargo-deny is not installed, security check incomplete');
        console.error(
            'Run "cargo install cargo-deny --version 0.15.0" to install it'
        );
        throw new Error('cargo-deny is not installed');
    }
}

function isCommandInstalled(command: string): boolean {
    try {
        execSync(command, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}
