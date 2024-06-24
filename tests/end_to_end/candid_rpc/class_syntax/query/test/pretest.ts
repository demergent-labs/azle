import { execSync } from 'child_process';
import { join, resolve } from 'path';

async function pretest() {
    // TODO remove install and link after https://github.com/demergent-labs/azle/issues/1807 is resolved
    const azleDir = resolve(
        __dirname,
        join('..', '..', '..', '..', '..', '..')
    );
    execSync(`cd ${join(azleDir, 'examples', 'query')} && npm install`);

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(`cd ${join(azleDir, 'examples', 'query')} && npm link azle`);
    }

    execSync(`dfx canister uninstall-code query || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy query`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate query`, {
        stdio: 'inherit'
    });
}

pretest();
