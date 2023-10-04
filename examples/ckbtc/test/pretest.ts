import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    uninstall(
        'ckbtc',
        'internet_identity',
        'kyt',
        'minter',
        'wallet_backend',
        'wallet_frontend'
    );

    execSync(`npm run deploy`, {
        stdio: 'inherit'
    });
}

function uninstall(...canisterNames: string[]) {
    canisterNames.forEach((canisterName) => {
        execSync(`dfx canister uninstall-code ${canisterName} || true`, {
            stdio: 'inherit'
        });
    });
}

pretest();
