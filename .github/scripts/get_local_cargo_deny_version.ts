#!/usr/bin/env node

import { getCargoVersion } from './get_cargo_version';

/**
 * Script to get the local cargo-deny version using Azle's getLocalCargoDenyVersion function.
 * This is used in CI workflows to verify cargo-deny installation.
 */
function main(): void {
    try {
        const version = getCargoVersion('cargo-deny');
        console.log(version);
        process.exit(0);
    } catch (error) {
        console.error('Error getting cargo-deny version:', error);
        process.exit(1);
    }
}

main();
