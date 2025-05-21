import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code call_errors || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy call_errors`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx ledger fabricate-cycles --canister call_errors --cycles 100000000000000`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate call_errors`, {
        stdio: 'inherit'
    });
}

pretest();
