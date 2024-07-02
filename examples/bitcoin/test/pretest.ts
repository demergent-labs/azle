import { execSync } from 'child_process';

function pretest(): void {
    execSync(`rm -rf .bitcoin/data/regtest`, {
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
