import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(join('examples', 'init'));

    execSync(`dfx canister uninstall-code init || true`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx deploy init --argument '(record { id = "0" }, variant { Fire }, principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate init`, {
        stdio: 'inherit'
    });
}

pretest();
