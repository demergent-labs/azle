import { IOType } from 'child_process';
import { join } from 'path';

import { execSyncPretty } from '#utils/exec_sync_pretty';
import { AZLE_ROOT } from '#utils/global_paths';

export function generateLicenses(ioType: IOType): void {
    const licensesPath = join(
        AZLE_ROOT,
        'dist',
        'canister_templates',
        'licenses.yml'
    );

    const command = `cargo bundle-licenses --format yaml --output ${licensesPath}`;

    execSyncPretty(command, {
        stdio: ioType
    });

    console.info('✓ Licenses generated successfully');
}
