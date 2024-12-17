import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'examples',
            'experimental',
            'test',
            'end_to_end',
            'candid_rpc',
            'complex_types'
        )
    );

    execSync(`dfx canister uninstall-code complex_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy complex_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate complex_types`, {
        stdio: 'inherit'
    });
}

pretest();
