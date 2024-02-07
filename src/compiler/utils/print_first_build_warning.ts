import { execSync, IOType } from 'child_process';

import { yellow } from './colors';

// TODO I think we should just print something out every 30 seconds saying that it's still going
export function printFirstBuildWarning(
    azleVersion: string,
    stdio: IOType
): void {
    if (isInitialCompile(azleVersion, stdio)) {
        console.info(
            yellow(
                "\nInitial build takes a few minutes. Don't panic. Subsequent builds will be faster."
            )
        );
    }
}

function isInitialCompile(azleVersion: string, stdio: IOType): boolean {
    try {
        execSync(`docker image inspect azle_${azleVersion}`, {
            stdio
        });

        return false;
    } catch (error: any) {
        const errorMessage = error.stderr.toString();

        if (errorMessage.includes('No such image')) {
            return true;
        }

        throw error;
    }
}
