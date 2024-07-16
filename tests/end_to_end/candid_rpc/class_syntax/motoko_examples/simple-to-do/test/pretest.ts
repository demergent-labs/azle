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
            'simple-to-do'
        )
    );

    execSync(`dfx canister uninstall-code simple_to_do || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy simple_to_do`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate simple_to_do`, {
        stdio: 'inherit'
    });
}

pretest();
