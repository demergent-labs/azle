import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code basic_bitcoin || true`, {
        stdio: 'inherit'
    });

    execSync(`BITCOIN_NETWORK=regtest dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
