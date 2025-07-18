#!/usr/bin/env node

import { getCargoVersion } from './get_cargo_version';

/**
 * Script to get the local cargo-auditable version using Azle's getLocalCargoAuditableVersion function.
 * This is used in CI workflows to verify cargo-auditable installation.
 */
function main(): void {
    try {
        const version = getCargoVersion('cargo-auditable');
        console.log(version);
        process.exit(0);
    } catch (error) {
        console.error('Error getting cargo-auditable version:', error);
        process.exit(1);
    }
}

main();
