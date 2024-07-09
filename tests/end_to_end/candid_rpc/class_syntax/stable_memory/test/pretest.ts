import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'stable_memory'));

    execSync(`dfx canister uninstall-code stable_memory || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy stable_memory`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx ledger fabricate-cycles --canister stable_memory --cycles 100000000000000`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate stable_memory`, {
        stdio: 'inherit'
    });
}

pretest();
