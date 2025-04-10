import { execSync } from 'child_process';
import { join } from 'path';

import { AZLE_ROOT } from '#build/utils/global_paths';

// TODO remove linkAndInstallPatch after https://github.com/demergent-labs/azle/issues/1807 is resolved
export function linkAndInstallPatch(pathRelativeToAzle: string): void {
    const azleRoot = process.env.GITHUB_WORKSPACE ?? AZLE_ROOT;
    const examplePath = join(azleRoot, pathRelativeToAzle);
    const isPackMode = process.env.AZLE_END_TO_END_TEST_PACK_AZLE === 'true';
    const isLinkMode =
        process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false' && !isPackMode;

    if (isPackMode) {
        const distDir = join(azleRoot, 'dist');
        const packPath = join(distDir, 'azle.tgz');

        execSync(`npm install ${packPath} --no-save`, { cwd: examplePath });
    } else {
        execSync(`npm install`, { cwd: examplePath });

        if (isLinkMode) {
            execSync(`npm link azle`, { cwd: examplePath });
        }
    }
}
