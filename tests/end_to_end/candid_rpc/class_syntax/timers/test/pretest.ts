import { execSync } from 'child_process';
import { join, resolve } from 'path';

async function pretest() {
    const azleDir = resolve(
        __dirname,
        join('..', '..', '..', '..', '..', '..')
    );

    execSync(`cd ${join(azleDir, 'examples', 'timers')} && npm install`);

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(`cd ${join(azleDir, 'examples', 'timers')} && npm link azle`);
    }

    execSync(`dfx canister uninstall-code timers || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
