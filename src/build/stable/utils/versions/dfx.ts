import { execSyncPretty } from '../exec_sync_pretty';

export function getLocalDfxVersion(): string {
    const dfxOutput = execSyncPretty('dfx --version').toString().trim();

    const match = dfxOutput.match(/dfx (\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Return the version number
    } else {
        throw new Error(`Could not parse the dfx version`);
    }
}
