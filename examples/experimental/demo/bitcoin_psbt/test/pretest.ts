import { execSync } from 'child_process';

function pretest(): void {
    // Install Bitcoin binaries if they don't exist
    execSync(`./scripts/install.sh`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code bitcoin_psbt || true`, {
        stdio: 'inherit'
    });

    execSync(`BITCOIN_NETWORK=regtest dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
