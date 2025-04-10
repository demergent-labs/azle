import { execSync } from 'child_process';
import { join } from 'path';

import { AZLE_ROOT } from '#build/utils/global_paths';

// TODO remove linkAndInstallPatch after https://github.com/demergent-labs/azle/issues/1807 is resolved
export function linkAndInstallPatch(pathRelativeToAzle: string): void {
    const azleRoot = process.env.GITHUB_WORKSPACE ?? AZLE_ROOT;

    execSync(`npm install`, { cwd: join(azleRoot, pathRelativeToAzle) });

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(`npm link azle`, {
            cwd: join(azleRoot, pathRelativeToAzle)
        });
    }

    if (process.env.AZLE_END_TO_END_TEST_PACK_AZLE === 'true') {
        const distDir = join(azleRoot, 'dist');

        execSync(`npm install ${join(distDir, 'azle.tgz')} --no-save`, {
            cwd: join(azleRoot, pathRelativeToAzle)
        });
    }
}
