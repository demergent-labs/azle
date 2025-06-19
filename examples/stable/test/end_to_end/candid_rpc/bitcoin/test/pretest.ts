import { execSync } from 'child_process';

function pretest(): void {
    // Install Bitcoin binaries if they don't exist
    execSync(`./scripts/install.sh`, {
        stdio: 'inherit'
    });

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
