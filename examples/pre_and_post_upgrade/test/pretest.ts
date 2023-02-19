import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code pre_and_post_upgrade || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy pre_and_post_upgrade`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate pre_and_post_upgrade`, {
        stdio: 'inherit'
    });
}

pretest();
