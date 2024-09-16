import { pathToFileURL } from 'url';

import { execSyncPretty } from '../exec_sync_pretty';

export function getDfxVersion(): string {
    const dfxOutput = execSyncPretty('dfx --version').toString().trim();

    const match = dfxOutput.match(/dfx (\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Return the version number
    } else {
        throw new Error('Could not parse the dfx version');
    }
}

function main(): void {
    try {
        const version = getDfxVersion();
        console.log(version);
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
