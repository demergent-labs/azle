import { trap } from './ic_apis/trap';

/**
 * Handles uncaught errors in the canister execution environment by converting them
 * to a formatted error message and calling IC trap. This function ensures that all
 * uncaught errors are properly reported with stack traces before halting execution.
 *
 * @param rawError - The raw error value to handle. Can be an Error object or any other value
 * @returns never - This function always traps and never returns
 * @throws Calls IC trap with the formatted error message
 */
export function handleUncaughtError(rawError: any): never {
    if (rawError instanceof Error) {
        const error = rawError;
        trap(`Uncaught ${error.name}: ${error.message}\n${error.stack}`);
    } else {
        const error = new Error(rawError);
        trap(`Uncaught: ${error.message}\n${error.stack}`);
    }
}
