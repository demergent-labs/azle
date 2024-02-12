import { execSync } from 'child_process';

async function pretest() {
    execSync(`rm -rf .bitcoin/regtest`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code bitcoin || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy bitcoin`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
