import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

async function pretest() {
    linkAndInstallPatch(join('examples', 'audio_recorder'));

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
