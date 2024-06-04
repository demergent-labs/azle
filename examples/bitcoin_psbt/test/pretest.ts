import { execSync } from 'child_process';

async function pretest() {
    // TODO remove basic_bitcoin install and link after https://github.com/demergent-labs/azle/issues/1807 is resolved
    execSync(`cd ../basic_bitcoin && npm install`);

    if (process.env.AZLE_INTEGRATION_TEST_LINK_AZLE === 'true') {
        execSync(`cd ../basic_bitcoin && npm link azle`);
    }

    execSync(`dfx canister uninstall-code bitcoin_psbt || true`, {
        stdio: 'inherit'
    });

    execSync(`BITCOIN_NETWORK=regtest dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
