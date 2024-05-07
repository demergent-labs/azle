import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code sqlite_benchmarks || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
