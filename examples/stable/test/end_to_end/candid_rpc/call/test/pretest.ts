import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code static_errors || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy static_errors`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx ledger fabricate-cycles --canister static_errors --cycles 100000000000000`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate static_errors`, {
        stdio: 'inherit'
    });
}

pretest();
