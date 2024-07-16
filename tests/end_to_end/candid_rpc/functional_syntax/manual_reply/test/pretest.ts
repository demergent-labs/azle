import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code manual_reply || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy manual_reply`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate manual_reply`, {
        stdio: 'inherit'
    });
}

pretest();
