import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code simple_erc20 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy simple_erc20`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate simple_erc20`, {
        stdio: 'inherit'
    });
}

pretest();
