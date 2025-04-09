import { execSync } from 'child_process';

import { getDfxRoot } from '#utils/global_paths';

export function getCanisterId(canisterName: string): string {
    return execSync(
        `dfx canister --network ${process.env.DFX_NETWORK ?? 'local'} id ${canisterName}`,
        { cwd: getDfxRoot(), encoding: 'utf-8' }
    ).trim();
}
