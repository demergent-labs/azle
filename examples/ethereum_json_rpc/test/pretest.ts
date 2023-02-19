import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code ethereum_json_rpc || true`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx deploy ethereum_json_rpc --argument '("${process.env.ETHEREUM_URL}")'`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
