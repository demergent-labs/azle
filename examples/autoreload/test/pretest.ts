import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { originalServerTs } from './tests';

async function pretest() {
    writeFileSync('./src/server.ts', originalServerTs);

    execSync(`dfx canister uninstall-code autoreload || true`, {
        stdio: 'inherit'
    });

    execSync(`AZLE_AUTORELOAD=true dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
