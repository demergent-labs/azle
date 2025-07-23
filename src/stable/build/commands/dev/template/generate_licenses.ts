import { IOType } from 'child_process';
import { join } from 'path';

import { execSyncPretty } from '#utils/exec_sync_pretty';
import { AZLE_ROOT } from '#utils/global_paths';

/**
 * Generates a best-effort YAML file containing the license texts of all dependencies (including transitive dependencies)
 * of Azle's Cargo workspace. These license texts are required to comply with the distribution of
 * Azle's canister template Wasm binaries and the npx azle generate command's Wasm binary.
 */
export function generateLicenses(ioType: IOType): void {
    const licensesPath = join(
        AZLE_ROOT,
        'dist',
        'canister_templates',
        'licenses.yml'
    );

    const command = `cargo bundle-licenses --format yaml --output ${licensesPath}`;

    execSyncPretty(command, {
        cwd: AZLE_ROOT,
        stdio: ioType
    });

    console.info('✓ Licenses generated successfully');
}
