import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code optional_types || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy optional_types`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate optional_types`, {
        stdio: 'inherit'
    });
}

pretest();
