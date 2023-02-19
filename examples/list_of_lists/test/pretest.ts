import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code list_of_lists || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy list_of_lists`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate list_of_lists`, {
        stdio: 'inherit'
    });
}

pretest();
