import { execSync } from 'child_process';
import { version } from '../../../package.json';

async function pretest() {
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code hello_world || true`, {
        stdio: 'inherit'
    });

    execSync(`npx azle@${version} new hello_world`, {
        stdio: 'inherit'
    });

    execSync(`cd hello_world && npm install`, {
        stdio: 'inherit'
    });

    execSync(`cd hello_world && npm run canister_deploy_local`, {
        stdio: 'inherit'
    });

    execSync(`cd hello_world && npm run canister_call_set_message`, {
        stdio: 'inherit'
    });
}

pretest();
