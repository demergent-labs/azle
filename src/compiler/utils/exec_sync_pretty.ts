import { execSync, IOType } from 'child_process';

export function execSyncPretty(command: string, stdio?: IOType): Buffer {
    try {
        return execSync(command, { stdio });
    } catch (error) {
        throw new Error(`Azle build error`);
    }
}
