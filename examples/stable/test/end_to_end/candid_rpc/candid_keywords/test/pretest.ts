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
            'candid_keywords'
        )
    );

    execSync(`dfx canister uninstall-code candid_keywords || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy candid_keywords`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate candid_keywords`, {
        stdio: 'inherit'
    });
}

pretest();
