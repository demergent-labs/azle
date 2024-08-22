import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code imports || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy imports`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate imports`, {
        stdio: 'inherit'
    });
}

pretest();
