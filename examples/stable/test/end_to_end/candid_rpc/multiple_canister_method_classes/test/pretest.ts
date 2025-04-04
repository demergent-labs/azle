import { execSync } from 'child_process';

function pretest(): void {
    execSync(
        `dfx canister uninstall-code multiple_canister_method_classes || true`,
        {
            stdio: 'inherit'
        }
    );

    execSync(`dfx deploy multiple_canister_method_classes`, {
        stdio: 'inherit'
    });

    execSync(`dfx generate multiple_canister_method_classes`, {
        stdio: 'inherit'
    });
}

pretest();
