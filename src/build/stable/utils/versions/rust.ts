import { pathToFileURL } from 'url';

import { execSyncPretty } from '../exec_sync_pretty';

export function getRustVersion(): string {
    const rustcOutput = execSyncPretty('rustc --version').toString().trim();
    const match = rustcOutput.match(/^rustc\s+(\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Returns the version number
    } else {
        throw new Error('Could not parse rustc version');
    }
}

function main(): void {
    try {
        const version = getRustVersion();
        console.log(version);
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
