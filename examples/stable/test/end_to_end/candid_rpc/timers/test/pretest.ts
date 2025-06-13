import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code timers || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy timers`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx ledger fabricate-cycles --canister timers --cycles 1000000000000000`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate timers`, {
        stdio: 'inherit'
    });
}

pretest();
