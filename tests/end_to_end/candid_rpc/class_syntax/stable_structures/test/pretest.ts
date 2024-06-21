import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';
import { join, resolve } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'stable_structures'));

    const azleDir = resolve(
        __dirname,
        join('..', '..', '..', '..', '..', '..')
    );

    execSync(
        `cd ${join(azleDir, 'examples', 'stable_structures')} && npm install`
    );

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(
            `cd ${join(
                azleDir,
                'examples',
                'stable_structures'
            )} && npm link azle`
        );
    }

    execSync(`dfx canister uninstall-code canister1 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code canister2 || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code canister3 || true`, {
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
