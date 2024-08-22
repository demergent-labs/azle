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
            'outgoing_http_requests'
        )
    );

    execSync(`dfx canister uninstall-code outgoing_http_requests || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
