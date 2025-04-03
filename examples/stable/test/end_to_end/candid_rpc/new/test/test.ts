import { execSync } from 'child_process';

import { version } from '../../../../../../../package.json';

function pretest(): void {
    execSync(`npx -y azle@${version} new hello_world`, {
        stdio: 'inherit'
    });

    execSync(`npm install`, {
        cwd: 'hello_world',
        stdio: 'inherit'
    });

    execSync(`npm test`, {
        cwd: 'hello_world',
        stdio: 'inherit'
    });
}

pretest();
