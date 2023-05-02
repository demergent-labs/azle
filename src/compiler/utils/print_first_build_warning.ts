import { existsSync } from 'fs';

import { GLOBAL_AZLE_TARGET_DIR } from './global_paths';
import { yellow } from './colors';

export function printFirstBuildWarning(): void {
    if (isInitialCompile()) {
        console.info(
            yellow(
                "Initial build takes a few minutes. Don't panic. Subsequent builds will be faster.\n"
            )
        );
    }
}

function isInitialCompile(): boolean {
    return !existsSync(GLOBAL_AZLE_TARGET_DIR);
}
