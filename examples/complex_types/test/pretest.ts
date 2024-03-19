import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code complex_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy complex_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate complex_types`, {
        stdio: 'inherit'
    });
}

pretest();
