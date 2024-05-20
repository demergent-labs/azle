import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code bitcoin_psbt || true`, {
        stdio: 'inherit'
    });

    execSync(`BITCOIN_NETWORK=regtest dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
