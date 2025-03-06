import { linkAndInstallPatch } from 'azle/_internal/test/jest_link';
import { execSync } from 'child_process';
import { lstatSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function pretest(): void {
    linkAndInstallPatch(
        join(
            'examples',
            'experimental',
            'test',
            'end_to_end',
            'candid_rpc',
            'management_canister'
        )
    );

    execSync(`dfx canister uninstall-code management_canister || true`, {
        stdio: 'inherit'
    });

    // We generate this file without the workaroundForMultipleIDLPathsProblem so that we can do an exact comparison with the azle/canisters/management/idl/index.ts file
    execSync(
        `npm exec --offline azle generate-types ../../../../../../src/stable/lib/canisters/management/idl/ic.did > src/idl/management_no_workaround.ts`,
        {
            stdio: 'inherit'
        }
    );

    execSync(
        'npx prettier --ignore-path null --write src/idl/management_no_workaround.ts',
        {
            stdio: 'inherit'
        }
    );

    execSync(
        `npm exec --offline azle generate-types ../../../../../../src/stable/lib/canisters/management/idl/ic.did > src/idl/management.ts`,
        {
            stdio: 'inherit'
        }
    );

    workaroundForMultipleIDLPathsProblem();

    execSync('npx prettier --ignore-path null --write src/idl/management.ts', {
        stdio: 'inherit'
    });

    execSync(`dfx deploy`, {
        stdio: 'inherit'
    });

    execSync(
        `dfx ledger fabricate-cycles --canister management_canister --cycles 100000000000000`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx generate`, {
        stdio: 'inherit'
    });
}

pretest();

// TODO remove once this issue is resolved: https://github.com/dfinity/agent-js/issues/977
// Basically what we do here is to replace import { IDL } from '@dfinity/candid' with import { IDL } from 'azle'
// but only when azle is a symlink (accomplished usually in our dev environment through npm link azle)
// The multiple IDL paths problem only occurs at least in the context of this test, in our local symlink
// testing environment. Users shouldn't run into this issue because they will not have symlinked azle
// The GitHub Actions tests on a release will run this test against azle as an npm package
function workaroundForMultipleIDLPathsProblem(): void {
    if (lstatSync('node_modules/azle').isSymbolicLink() === false) {
        return;
    }

    const generatedTypesPath = 'src/idl/management.ts';

    writeFileSync(
        generatedTypesPath,
        readFileSync(generatedTypesPath, 'utf-8').replace(
            /import\s*{\s*IDL\s*}\s*from\s*['"]@dfinity\/candid['"]/g,
            "import { IDL } from 'azle'"
        )
    );
}
