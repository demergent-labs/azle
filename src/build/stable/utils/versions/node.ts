import { pathToFileURL } from 'url';

import { execSyncPretty } from '../exec_sync_pretty';

export function getNodeVersion(): string {
    const nodeOutput = execSyncPretty('node --version').toString().trim();
    const match = nodeOutput.match(/^v(\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Returns the version number (e.g., "16.13.0")
    } else {
        throw new Error('Could not parse node version');
    }
}

function main(): void {
    try {
        const version = getNodeVersion();
        console.log(version);
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
