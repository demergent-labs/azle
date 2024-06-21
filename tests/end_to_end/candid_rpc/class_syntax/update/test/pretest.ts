import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';
import { join, resolve } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'update'));

    const azleDir = resolve(
        __dirname,
        join('..', '..', '..', '..', '..', '..')
    );

    execSync(`cd ${join(azleDir, 'examples', 'update')} && npm install`);

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(`cd ${join(azleDir, 'examples', 'update')} && npm link azle`);
    }

    execSync(`dfx canister uninstall-code update || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy update`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate update`, {
        stdio: 'inherit'
    });
}

pretest();
