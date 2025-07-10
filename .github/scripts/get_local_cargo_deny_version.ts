#!/usr/bin/env node

import { getLocalCargoDenyVersion } from '#build/utils/versions/cargo_deny';

/**
 * Script to get the local cargo-deny version using Azle's getLocalCargoDenyVersion function.
 * This is used in CI workflows to verify cargo-deny installation.
 */
function main(): void {
    try {
        const version = getLocalCargoDenyVersion();
        console.log(version);
        process.exit(0);
    } catch (error) {
        console.error('Error getting cargo-deny version:', error);
        process.exit(1);
    }
}

main();
