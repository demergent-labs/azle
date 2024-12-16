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
            'factorial'
        )
    );

    execSync(`dfx canister uninstall-code factorial || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy factorial`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate factorial`, {
        stdio: 'inherit'
    });
}

pretest();
