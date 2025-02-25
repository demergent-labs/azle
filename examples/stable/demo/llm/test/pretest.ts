import { execSync } from 'child_process';

function pretest(): void {
    execSync(`dfx canister uninstall-code llm || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code agent || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy llm`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy agent`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate agent`, {
        stdio: 'inherit'
    });
}

pretest();
