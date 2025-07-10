#!/usr/bin/env node

import { getLocalCargoAuditableVersion } from '#build/utils/versions/cargo_auditable';

/**
 * Script to get the local cargo-auditable version using Azle's getLocalCargoAuditableVersion function.
 * This is used in CI workflows to verify cargo-auditable installation.
 */
function main(): void {
    try {
        const version = getLocalCargoAuditableVersion();
        console.log(version);
        process.exit(0);
    } catch (error) {
        console.error('Error getting cargo-auditable version:', error);
        process.exit(1);
    }
}

main();
