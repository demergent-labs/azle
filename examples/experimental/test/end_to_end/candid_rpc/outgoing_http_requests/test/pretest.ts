import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code outgoing_http_requests || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
