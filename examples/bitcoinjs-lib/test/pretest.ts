import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code bitcoinjs || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`cd ../bitcore-lib && npm install`, { stdio: 'inherit' });
}

pretest();
