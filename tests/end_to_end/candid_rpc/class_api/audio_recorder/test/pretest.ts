import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'tests',
            'end_to_end',
            'candid_rpc',
            'functional_api',
            'audio_recorder'
        )
    );

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
