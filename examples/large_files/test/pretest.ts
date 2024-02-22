import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // execSync(
    //     `curl -o assets/curled/azle-image.tar.gz -L -f https://github.com/demergent-labs/azle/releases/download/0.20.2/azle__image__df63c5d08af24c281b420214a3ad1686e0c3fd526c28acc5fbdc690c9765ebd7.tar.gz`,
    //     {
    //         stdio: 'inherit'
    //     }
    // );

    execSync(`dfx canister uninstall-code large_files || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
