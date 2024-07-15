import { execSync } from 'child_process';
import { join } from 'path';

import { AZLE_PACKAGE_PATH } from '../src/compiler/utils/global_paths';

// TODO remove install and link after https://github.com/demergent-labs/azle/issues/1807 is resolved
export function linkAndInstallPatch(pathRelativeToAzle: string): void {
    const examplesDir = process.env.GITHUB_WORKSPACE ?? AZLE_PACKAGE_PATH;

    console.log('examplesDir', examplesDir);

    console.log(
        'process.env.AZLE_END_TO_END_TEST_LINK_AZLE',
        process.env.AZLE_END_TO_END_TEST_LINK_AZLE
    );

    console.log('AZLE_PACKAGE_PATH', AZLE_PACKAGE_PATH);

    // TODO do we even need to do this on release?
    execSync(`cd ${join(examplesDir, pathRelativeToAzle)} && npm install`);

    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        // TODO remove logs once we are satisfied that the link doesn't happen during release candidate tests
        console.log('--------------------------------------------------------');
        console.log("--- We're linking!!! -----------------------------------");
        console.log('--------------------------------------------------------');
        execSync(
            `cd ${join(examplesDir, pathRelativeToAzle)} && npm link azle`
        );
    }
}
