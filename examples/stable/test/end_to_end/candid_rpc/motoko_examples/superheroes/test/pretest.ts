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
            'superheroes'
        )
    );

    execSync(`dfx canister uninstall-code superheroes || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy superheroes`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate superheroes`, {
        stdio: 'inherit'
    });
}

pretest();
