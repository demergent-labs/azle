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
            'minimal-counter-dapp'
        )
    );

    execSync(`dfx canister uninstall-code minimal_dapp || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy minimal_dapp`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate minimal_dapp`, {
        stdio: 'inherit'
    });
}

pretest();
