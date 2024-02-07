export { getCanisterConfig } from './get_canister_config';
export { getCanisterName } from './get_canister_name';
export { logSuccess } from './log_success';
export { printFirstBuildWarning } from './print_first_build_warning';
export { unwrap } from './result';
export { time } from './time';

export function getStdIoType() {
    return isVerboseMode() ? 'inherit' : 'pipe';
}

export function isVerboseMode(): boolean {
    return process.argv.includes('--verbose') || process.argv.includes('-v');
}
