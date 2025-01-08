import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code pre_cool || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy pre_cool`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate pre_cool`, {
        stdio: 'inherit'
    });
}

pretest();
