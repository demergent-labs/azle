import { getCanisterId } from 'azle/dfx';
import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join('tests', 'end_to_end', 'candid_rpc', 'functional_api', 'recursion')
    );

    execSync(`dfx canister uninstall-code recursive_canister || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy recursive_canister --argument '("hello")'`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate recursive_canister`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code recursion || true`, {
        stdio: 'inherit'
    });

    execSync(
        `MY_CANISTER_PRINCIPAL=${getCanisterId(
            'recursive_canister'
        )} dfx deploy recursion`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate recursion`, {
        stdio: 'inherit'
    });
}

pretest();
