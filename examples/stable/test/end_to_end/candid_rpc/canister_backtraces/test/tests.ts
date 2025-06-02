import { expect, it, Test } from 'azle/_internal/test';
import { execSync } from 'child_process';

export function getTests(): Test {
    return () => {
        it('should show canister backtraces when AZLE_CANISTER_BACKTRACES=true', async () => {
            deployWithBacktraces(true);

            const result = callTestTrapAndCapture(
                'Test trap message with backtraces'
            );

            expect(result).toContain('Test trap message with backtraces');
            expect(result).toContain('Canister Backtrace:');
        });

        it('should not show canister backtraces when AZLE_CANISTER_BACKTRACES is unset', async () => {
            deployWithBacktraces();

            const result = callTestTrapAndCapture(
                'Test trap message without backtraces unset'
            );

            expect(result).toContain(
                'Test trap message without backtraces unset'
            );
            expect(result).not.toContain('Canister Backtrace:');
        });

        it('should not show canister backtraces when AZLE_CANISTER_BACKTRACES=false', async () => {
            deployWithBacktraces(false);

            const result = callTestTrapAndCapture(
                'Test trap message with backtraces false'
            );

            expect(result).toContain('Test trap message with backtraces false');
            expect(result).not.toContain('Canister Backtrace:');
        });

        it('should not show canister backtraces when AZLE_CANISTER_BACKTRACES=invalid', async () => {
            deployWithBacktraces('invalid');

            const result = callTestTrapAndCapture(
                'Test trap message with invalid value'
            );

            expect(result).toContain('Test trap message with invalid value');
            expect(result).not.toContain('Canister Backtrace:');
        });
    };
}

function deployWithBacktraces(enableBacktraces?: boolean | string): void {
    execSync(`dfx canister uninstall-code canister_backtraces || true`, {
        stdio: 'inherit'
    });

    if (enableBacktraces === true) {
        execSync(
            `AZLE_CANISTER_BACKTRACES=true dfx deploy canister_backtraces`,
            {
                stdio: 'inherit'
            }
        );
    }

    if (enableBacktraces === false) {
        execSync(
            `AZLE_CANISTER_BACKTRACES=false dfx deploy canister_backtraces`,
            {
                stdio: 'inherit'
            }
        );
    }

    if (typeof enableBacktraces === 'string' && enableBacktraces !== 'false') {
        execSync(
            `AZLE_CANISTER_BACKTRACES=${enableBacktraces} dfx deploy canister_backtraces`,
            {
                stdio: 'inherit'
            }
        );
    }

    if (enableBacktraces === undefined) {
        execSync(`dfx deploy canister_backtraces`, {
            stdio: 'inherit'
        });
    }
}

function callTestTrapAndCapture(message: string): string {
    try {
        execSync(
            `dfx canister call canister_backtraces testTrap '("${message}")'`,
            {
                stdio: 'pipe'
            }
        );
        throw new Error('Expected trap to fail');
    } catch (error: any) {
        return (
            error.stderr?.toString() ??
            error.stdout?.toString() ??
            error.message
        );
    }
}
