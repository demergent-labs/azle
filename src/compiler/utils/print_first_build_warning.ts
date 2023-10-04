import { existsSync } from 'fs';

import { GLOBAL_AZLE_TARGET_DIR } from './global_paths';
import { yellow } from './colors';

// TODO I think we should just print something out every 30 seconds saying that it's still going
export function printFirstBuildWarning(): void {
    if (isInitialCompile()) {
        console.info(
            yellow(
                "\nInitial build takes a few minutes. Don't panic. Subsequent builds will be faster."
            )
        );
    }
}

function isInitialCompile(): boolean {
    return !existsSync(GLOBAL_AZLE_TARGET_DIR);
}
