import { execSync } from 'node:child_process';

import { execSyncPretty } from '#utils/exec_sync_pretty';

export function runSecurityChecks(): void {
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
        console.warn(
            'cargo-audit is not installed, skipping cargo audit check'
        );
        console.warn(
            'Run "cargo install cargo-audit --version 0.20.0" to install it'
        );
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
        console.warn('cargo-deny is not installed, skipping cargo deny check');
        console.warn(
            'Run "cargo install cargo-deny --version 0.15.0" to install it'
        );
    }
}

function isCommandInstalled(command: string): boolean {
    try {
        execSync(command, { stdio: 'ignore' });
        return true;
    } catch (_error) {
        return false;
    }
}
