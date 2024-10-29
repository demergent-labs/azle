import { execSyncPretty } from '../exec_sync_pretty';

export function getLocalWasi2icVersion(): string {
    return getCargoVersion('wasi2ic');
}

function getCargoVersion(packageName: string): string {
    const cargoOutput = execSyncPretty('cargo install --list').toString();

    // Regular expression to capture both with and without a repository link
    const regex = new RegExp(
        `${packageName}\\s+v(\\d+\\.\\d+\\.\\d+)(?:\\s+\\((https?:\\/\\/.+?)\\))?`
    );
    const match = cargoOutput.match(regex);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        if (match.length > 2 && typeof match[2] === 'string') {
            return match[2]; // Return the repository link if available
        } else {
            return match[1]; // Return the version number if no link is found
        }
    } else {
        throw new Error(`Could not parse ${packageName} version`);
    }
}
