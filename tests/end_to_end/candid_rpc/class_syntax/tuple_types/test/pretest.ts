import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code tuple_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy tuple_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate tuple_types`, {
        stdio: 'inherit'
    });
}

pretest();
