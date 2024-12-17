import { linkAndInstallPatch } from 'azle/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'examples',
            'experimental',
            'test',
            'end_to_end',
            'http_server',
            'bitcore_lib'
        )
    );

    execSync(`dfx canister uninstall-code bitcoinjs || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
