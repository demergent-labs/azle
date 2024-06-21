import { execSync } from 'child_process';

async function pretest() {
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
