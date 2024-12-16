import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'tests',
            'end_to_end',
            'candid_rpc',
            'functional_syntax',
            'principal'
        )
    );

    execSync(`dfx canister uninstall-code principal || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy principal`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate principal`, {
        stdio: 'inherit'
    });
}

pretest();
