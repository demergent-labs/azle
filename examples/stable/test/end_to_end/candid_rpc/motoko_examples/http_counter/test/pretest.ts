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
            'http_counter'
        )
    );

    execSync(`dfx canister uninstall-code http_counter || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy http_counter`, {
        stdio: 'inherit'
    });
}

pretest();
