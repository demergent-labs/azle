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
            'complex_init'
        )
    );

    execSync(`dfx canister uninstall-code complex_init || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code rec_init || true`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx deploy complex_init --argument 'record {"Oh hello there user"; record { id = "1" }}'`,
        {
            stdio: 'inherit'
        }
    );

    execSync(
        `dfx deploy rec_init --argument 'variant {Branch = variant {Leaf}}'`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate complex_init`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate rec_init`, {
        stdio: 'inherit'
    });
}

pretest();
