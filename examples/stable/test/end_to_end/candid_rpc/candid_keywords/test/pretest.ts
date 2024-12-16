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
