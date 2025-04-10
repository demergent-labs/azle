import { execSync } from 'child_process';
import { existsSync } from 'fs';
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

        if (!existsSync(distDir)) {
            throw new Error(
                `Dist directory does not exist: ${distDir}. Please run 'npm run build' in the root directory to create the dist directory.`
            );
        }

        if (!existsSync(join(distDir, 'azle.tgz'))) {
            throw new Error(
                `Packed file does not exist: ${join(distDir, 'azle.tgz')}. Please run 'npm run build' in the root directory to create the packed file.`
            );
        }

        execSync(`npm install ${join(distDir, 'azle.tgz')} --no-save`, {
            cwd: join(azleRoot, pathRelativeToAzle)
        });
    }
}
