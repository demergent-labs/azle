import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code multi_deploy || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy multi_deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate multi_deploy`, {
        stdio: 'inherit'
    });
}

pretest();
