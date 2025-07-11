#!/usr/bin/env node

import { getCargoVersion } from './get_cargo_version';

/**
 * Script to get the local cargo-audit version using Azle's getLocalCargoAuditVersion function.
 * This is used in CI workflows to verify cargo-audit installation.
 */
function main(): void {
    try {
        const version = getCargoVersion('cargo-audit');
        console.log(version);
        process.exit(0);
    } catch (error) {
        console.error('Error getting cargo-audit version:', error);
        process.exit(1);
    }
}

main();
