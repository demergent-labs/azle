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
            'manual_reply'
        )
    );

    execSync(`dfx canister uninstall-code manual_reply || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy manual_reply`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate manual_reply`, {
        stdio: 'inherit'
    });
}

pretest();
