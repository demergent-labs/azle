import { execSync } from 'child_process';
import { join, resolve } from 'path';

export function linkAndInstallPatch(pathRelativeToAzle: string): void {
    // TODO remove install and link after https://github.com/demergent-labs/azle/issues/1807 is resolved

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        const azleDir = resolve(__dirname, '..');
        execSync(`cd ${join(azleDir, pathRelativeToAzle)} && npm install`);
        // TODO remove logs once we are satisfied that the link doesn't happen during release candidate tests
        console.log('--------------------------------------------------------');
        console.log("--- We're linking!!! -----------------------------------");
        console.log('--------------------------------------------------------');
        execSync(`cd ${join(azleDir, pathRelativeToAzle)} && npm link azle`);
    }
}
