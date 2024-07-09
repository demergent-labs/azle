import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'ckbtc'));

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
