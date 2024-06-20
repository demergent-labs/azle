import { execSync } from 'child_process';

async function pretest() {
    execSync(`dfx canister uninstall-code backend || true`, {
        stdio: 'inherit'
    });

    // Since a lot of this test revolves around the upload process and the post
    // install scripts the call to dfx deploy is inside the tests. Canister
    // create is called here to make sure we have the right canister id for the
    // origin
    execSync(`dfx canister create backend`);
}

pretest();
