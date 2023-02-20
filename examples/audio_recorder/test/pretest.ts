import { execSync } from 'child_process';

async function pretest() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    execSync(`dfx canister uninstall-code audio_recorder || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy audio_recorder`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate audio_recorder`, {
        stdio: 'inherit'
    });
}

pretest();
