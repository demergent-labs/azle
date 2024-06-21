import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'async_await'));

    execSync(`dfx canister uninstall-code async_await || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy async_await`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate async_await`, {
        stdio: 'inherit'
    });
}

pretest();
