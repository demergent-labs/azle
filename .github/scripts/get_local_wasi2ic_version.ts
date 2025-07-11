#!/usr/bin/env node

import { getCargoVersion } from './get_cargo_version';

/**
 * Script to get the local wasi2ic version using Azle's getLocalWasi2icVersion function.
 * This is used in CI workflows to verify wasi2ic installation.
 */
function main(): void {
    try {
        const version = getCargoVersion('wasi2ic');
        console.log(version);
        process.exit(0);
    } catch (error) {
        console.error('Error getting wasi2ic version:', error);
        process.exit(1);
    }
}

main();
