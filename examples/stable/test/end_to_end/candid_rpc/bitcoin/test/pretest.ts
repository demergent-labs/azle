import { linkAndInstallPatch } from 'azle/test/jest_link';
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
            'bitcoin'
        )
    );

    execSync(`rm -rf .bitcoin/data/regtest`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code bitcoin || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy bitcoin`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx ledger fabricate-cycles --canister bitcoin --cycles 1000000000000000000`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
