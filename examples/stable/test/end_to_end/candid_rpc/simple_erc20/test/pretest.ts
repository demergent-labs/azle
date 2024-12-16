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
            'simple_erc20'
        )
    );

    execSync(`dfx canister uninstall-code simple_erc20 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy simple_erc20`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate simple_erc20`, {
        stdio: 'inherit'
    });
}

pretest();
