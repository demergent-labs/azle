import { execSync } from 'child_process';

import { version } from '../../../../../package.json';

function pretest(): void {
    execSync(
        `npx -y azle@${version} new hello_world --http-server --experimental`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`cd hello_world && npm install`, {
        stdio: 'inherit'
    });

    execSync(`cd hello_world && npm test`, {
        stdio: 'inherit'
    });
}

pretest();
