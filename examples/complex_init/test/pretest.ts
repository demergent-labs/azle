import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code complex_init || true`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx deploy complex_init --argument 'record {"Oh hello there user"; record { id = "1" }}'`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate complex_init`, {
        stdio: 'inherit'
    });
}

pretest();
