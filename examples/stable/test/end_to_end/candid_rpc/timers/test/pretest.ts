import { linkAndInstallPatch } from 'azle/_internal/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'examples',
            'experimental',
            'test',
            'end_to_end',
            'candid_rpc',
            'timers'
        )
    );

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
