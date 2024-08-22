import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'tests',
            'end_to_end',
            'candid_rpc',
            'functional_api',
            'candid_encoding'
        )
    );

    execSync(`dfx canister uninstall-code candid_encoding || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy candid_encoding`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate candid_encoding`, {
        stdio: 'inherit'
    });
}

pretest();
