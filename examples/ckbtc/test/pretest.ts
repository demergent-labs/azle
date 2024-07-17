import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join('tests', 'end_to_end', 'candid_rpc', 'functional_syntax', 'ckbtc')
    );

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

function uninstall(...canisterNames: string[]): void {
    canisterNames.forEach((canisterName) => {
        execSync(`dfx canister uninstall-code ${canisterName} || true`, {
            stdio: 'inherit'
        });
    });
}

pretest();
