import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code simple_user_accounts || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy simple_user_accounts`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate simple_user_accounts`, {
        stdio: 'inherit'
    });
}

pretest();
