import { execSync } from 'child_process';
import { version } from '../../../package.json';

async function pretest() {
    execSync(`npx -y azle@${version} new hello_world`, {
        stdio: 'inherit'
    });

    execSync(
        `cd hello_world && dfx canister uninstall-code hello_world || true`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`cd hello_world && npm install`, {
        stdio: 'inherit'
    });

    execSync(`cd hello_world && npm run canister_deploy_local`, {
        stdio: 'inherit'
    });
}

pretest();
