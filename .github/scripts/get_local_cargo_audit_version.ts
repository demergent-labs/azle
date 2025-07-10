#!/usr/bin/env node

import { getLocalCargoAuditVersion } from '#build/utils/versions/cargo_audit';

/**
 * Script to get the local cargo-audit version using Azle's getLocalCargoAuditVersion function.
 * This is used in CI workflows to verify cargo-audit installation.
 */
function main(): void {
    try {
        const version = getLocalCargoAuditVersion();
        console.log(version);
        process.exit(0);
    } catch (error) {
        console.error('Error getting cargo-audit version:', error);
        process.exit(1);
    }
}

main();
