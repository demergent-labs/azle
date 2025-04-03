import { execSync, ExecSyncOptionsWithBufferEncoding } from 'child_process';

export function execSyncPretty(
    command: string,
    options?: ExecSyncOptionsWithBufferEncoding,
    hint?: string
): Buffer {
    try {
        return execSync(command, options ?? {});
    } catch (error) {
        if (hint !== undefined) {
            throw new Error(`${hint}: ${error}`);
        } else {
            throw error;
        }
    }
}
