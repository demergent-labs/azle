import { execSync } from 'child_process';

async function pretest() {
    // TODO replace with standard solution once class based is merged in
    execSync(`cd ../sqlite && npm install`);
    if (process.env.AZLE_END_TO_END_TEST_LINK_AZLE !== 'false') {
        execSync(`cd ../sqlite && npm link azle`);
    }
    execSync(`dfx canister uninstall-code sqlite_typeorm || true`, {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });
}

pretest();
