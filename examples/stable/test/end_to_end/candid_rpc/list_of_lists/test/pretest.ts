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
            'list_of_lists'
        )
    );

    execSync(`dfx canister uninstall-code list_of_lists || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy list_of_lists`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate list_of_lists`, {
        stdio: 'inherit'
    });
}

pretest();
