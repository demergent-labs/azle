import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code factorial || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy factorial`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate factorial`, {
        stdio: 'inherit'
    });
}

pretest();
