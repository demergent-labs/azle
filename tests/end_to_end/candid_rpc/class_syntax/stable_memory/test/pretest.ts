import { execSync } from 'child_process';
import { join, resolve } from 'path';

async function pretest() {
    const azleDir = resolve(
        __dirname,
        join('..', '..', '..', '..', '..', '..')
    );

    execSync(`cd ${join(azleDir, 'examples', 'stable_memory')} && npm install`);

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(
            `cd ${join(azleDir, 'examples', 'stable_memory')} && npm link azle`
        );
    }

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
