#!/usr/bin/env node

import { getLocalWasi2icVersion } from '#build/utils/versions/wasi2ic';

/**
 * Script to get the local wasi2ic version using Azle's getLocalWasi2icVersion function.
 * This is used in CI workflows to verify wasi2ic installation.
 */
function main(): void {
    try {
        const version = getLocalWasi2icVersion();
        console.log(version);
        process.exit(0);
    } catch (error) {
        console.error('Error getting wasi2ic version:', error);
        process.exit(1);
    }
}

main();
