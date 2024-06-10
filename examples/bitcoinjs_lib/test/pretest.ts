import { execSync } from 'child_process';

async function pretest() {
    // TODO remove bitcore_lib install and link after https://github.com/demergent-labs/azle/issues/1807 is resolved
    execSync(`cd ../bitcore_lib && npm install`);

    if (process.env.AZLE_INTEGRATION_TEST_LINK_AZLE === 'true') {
        execSync(`cd ../bitcore_lib && npm link azle`);
    }

    execSync(`dfx canister uninstall-code bitcoinjs || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
