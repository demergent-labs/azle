import { execSync, IOType } from 'child_process';

export function execSyncPretty(
    command: string,
    stdio?: IOType,
    hint?: string
): Buffer {
    try {
        return execSync(command, { stdio });
    } catch (error) {
        if (hint !== undefined) {
            throw new Error(`${hint}: ${error}`);
        } else {
            throw error;
        }
    }
}
