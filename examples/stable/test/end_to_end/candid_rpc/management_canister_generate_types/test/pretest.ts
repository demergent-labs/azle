import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code management_canister || true`, {
        stdio: 'inherit'
    });

    execSync(
        `npm exec --offline azle generate ../../../../../../src/stable/lib/canisters/management/idl/ic.did > src/idl/management.ts`,
        {
            stdio: 'inherit'
        }
    );

    execSync('npx prettier --ignore-path null --write src/idl/management.ts', {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx ledger fabricate-cycles --canister management_canister --cycles 100000000000000`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
