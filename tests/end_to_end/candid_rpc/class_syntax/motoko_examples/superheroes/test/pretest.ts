import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'superheroes'));

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
