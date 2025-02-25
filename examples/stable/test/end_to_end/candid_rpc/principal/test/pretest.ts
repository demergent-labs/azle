import { linkAndInstallPatch } from 'azle/_internal/test/jest_link';
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
