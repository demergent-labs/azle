import { pathToFileURL } from 'url';

import { execSyncPretty } from '../exec_sync_pretty';
import { getVersionFromPackageJson } from './get_version_from_package_json';

export function getDfxVersionLocal(): string {
    const dfxOutput = execSyncPretty('dfx --version').toString().trim();

    const match = dfxOutput.match(/dfx (\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Return the version number
    } else {
        throw new Error('Could not parse the dfx version');
    }
}

export async function getDfxVersionPackageJson(): Promise<string> {
    return await getVersionFromPackageJson('dfx');
}

async function main(): Promise<void> {
    const args = process.argv.slice(2);

    if (args.includes('--local')) {
        process.stdout.write(getDfxVersionLocal());
    } else {
        process.stdout.write(await getDfxVersionPackageJson());
    }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
