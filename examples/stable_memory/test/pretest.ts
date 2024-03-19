import { execSync } from 'child_process';

async function pretest() {
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
