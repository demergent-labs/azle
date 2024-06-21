import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';
import { join, resolve } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'simple_user_accounts'));

    const azleDir = resolve(
        __dirname,
        join('..', '..', '..', '..', '..', '..')
    );

    execSync(
        `cd ${join(azleDir, 'examples', 'simple_user_accounts')} && npm install`
    );

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(
            `cd ${join(
                azleDir,
                'examples',
                'simple_user_accounts'
            )} && npm link azle`
        );
    }

    execSync(`dfx canister uninstall-code simple_user_accounts || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy simple_user_accounts`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate simple_user_accounts`, {
        stdio: 'inherit'
    });
}

pretest();
