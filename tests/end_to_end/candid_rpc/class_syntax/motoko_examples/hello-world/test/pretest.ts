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
            'motoko_examples',
            'hello-world'
        )
    );

    execSync(`dfx canister uninstall-code hello_world || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy hello_world`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate hello_world`, {
        stdio: 'inherit'
    });
}

pretest();
