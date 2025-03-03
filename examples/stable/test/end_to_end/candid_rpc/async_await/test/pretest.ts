import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code async_await || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy async_await`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate async_await`, {
        stdio: 'inherit'
    });
}

pretest();
