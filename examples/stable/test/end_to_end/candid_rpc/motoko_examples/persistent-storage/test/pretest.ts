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
            'motoko_examples',
            'persistent-storage'
        )
    );

    execSync(`dfx canister uninstall-code persistent_storage || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy persistent_storage`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate persistent_storage`, {
        stdio: 'inherit'
    });
}

pretest();
