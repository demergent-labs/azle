import { execSync } from 'child_process';
import { join, resolve } from 'path';

// TODO remove linkAndInstallPatch after https://github.com/demergent-labs/azle/issues/1807 is resolved
export function linkAndInstallPatch(pathRelativeToAzle: string): void {
    const examplesDir =
        process.env.GITHUB_WORKSPACE ?? resolve(__dirname, '..');

    execSync(`cd ${join(examplesDir, pathRelativeToAzle)} && npm install`);

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(
            `cd ${join(examplesDir, pathRelativeToAzle)} && npm link azle`
        );
    }
}
