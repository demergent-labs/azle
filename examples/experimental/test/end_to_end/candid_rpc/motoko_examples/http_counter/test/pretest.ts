import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code http_counter || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy http_counter`, {
        stdio: 'inherit'
    });
}

pretest();
