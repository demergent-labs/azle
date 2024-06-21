import { execSync } from 'child_process';
import { join, resolve } from 'path';

export function linkAndInstallPatch(pathRelativeToAzle: string) {
    // TODO remove install and link after https://github.com/demergent-labs/azle/issues/1807 is resolved
    const azleDir = resolve(__dirname, '..');

    execSync(`cd ${join(azleDir, pathRelativeToAzle)} && npm install`);

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(`cd ${join(azleDir, pathRelativeToAzle)} && npm link azle`);
    }
}
