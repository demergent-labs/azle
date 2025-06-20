import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code benchmarks || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy benchmarks`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate benchmarks`, {
        stdio: 'inherit'
    });
}

pretest();
