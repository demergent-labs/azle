import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';
import { join, resolve } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'simple_erc20'));

    const azleDir = resolve(
        __dirname,
        join('..', '..', '..', '..', '..', '..')
    );

    execSync(`cd ${join(azleDir, 'examples', 'simple_erc20')} && npm install`);

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(
            `cd ${join(azleDir, 'examples', 'simple_erc20')} && npm link azle`
        );
    }
    execSync(`dfx canister uninstall-code simple_erc20 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy simple_erc20`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate simple_erc20`, {
        stdio: 'inherit'
    });
}

pretest();
