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
            'inspect_message'
        )
    );

    execSync(`dfx canister uninstall-code inspect_message || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy inspect_message`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate inspect_message`, {
        stdio: 'inherit'
    });
}

pretest();
