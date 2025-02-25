import { linkAndInstallPatch } from 'azle/_internal/test/jest_link';
import { execSync } from 'child_process';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'examples',
            'experimental',
            'test',
            'end_to_end',
            'candid_rpc',
            'async_await'
        )
    );

    execSync(`dfx canister uninstall-code async_await || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy async_await`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate async_await`, {
        stdio: 'inherit'
    });
}

pretest();
