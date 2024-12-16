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
            'ethereum_json_rpc'
        )
    );

    execSync(`dfx canister uninstall-code ethereum_json_rpc || true`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx deploy ethereum_json_rpc --argument '("${process.env.ETHEREUM_URL}")'`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
