import { linkAndInstallPatch } from 'azle/_internal/test/jest_link';
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
            'hello'
        )
    );

    execSync(`dfx canister uninstall-code hello || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy hello`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate hello`, {
        stdio: 'inherit'
    });
}

pretest();
