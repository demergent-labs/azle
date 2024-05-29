import { execSync } from 'child_process';

async function pretest() {
    execSync(`cp ../../.openvaluesharing.json node_modules/unpipe`, {
        stdio: 'inherit'
    });

    execSync(`cp ../../.openvaluesharing.json node_modules/typescript`, {
        stdio: 'inherit'
    });

    execSync(`cp ../../.openvaluesharing.json node_modules/has-symbols`, {
        stdio: 'inherit'
    });

    execSync(`cp ../../.openvaluesharing.json node_modules/side-channel`, {
        stdio: 'inherit'
    });

    execSync(`cp ../../.openvaluesharing.json node_modules/safer-buffer`, {
        stdio: 'inherit'
    });

    execSync(`cp ../../.openvaluesharing.json node_modules/hasown`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code consumer || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx canister uninstall-code wallet || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();
