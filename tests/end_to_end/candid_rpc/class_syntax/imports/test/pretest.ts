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
            'imports'
        )
    );

    execSync(`dfx canister uninstall-code imports || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy imports`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate imports`, {
        stdio: 'inherit'
    });
}

pretest();
