import { IOType } from 'child_process';

export { getCanisterConfig } from './get_canister_config';
export { getCanisterName } from './get_canister_name';
export { logSuccess } from './log_success';
export { unwrap } from './result';
export { time } from './time';

export function getStdIoType(): IOType {
    return isVerboseMode() ? 'inherit' : 'pipe';
}

export function isVerboseMode(): boolean {
    return (
        process.argv.includes('--verbose') ||
        process.argv.includes('-v') ||
        process.env.AZLE_VERBOSE === 'true'
    );
}
