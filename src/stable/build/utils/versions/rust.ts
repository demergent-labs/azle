import { execSyncPretty } from '../exec_sync_pretty';

export function getLocalRustVersion(): string {
    const rustcOutput = execSyncPretty('rustc --version').toString().trim();
    const match = rustcOutput.match(/^rustc\s+(\d+\.\d+\.\d+)/);

    if (match !== null && match.length > 1 && typeof match[1] === 'string') {
        return match[1]; // Returns the version number
    } else {
        throw new Error(`Could not parse rustc version`);
    }
}
