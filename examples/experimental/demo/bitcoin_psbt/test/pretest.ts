import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(join('examples', 'basic_bitcoin'));

    execSync(`dfx canister uninstall-code bitcoin_psbt || true`, {
        stdio: 'inherit'
    });

    execSync(`BITCOIN_NETWORK=regtest dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
