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
