import { trap } from './ic_apis/trap';

/**
 * Handles uncaught errors in the canister execution environment by converting them
 * to a formatted error message and calling IC trap. This function ensures that all
 * uncaught errors are properly reported with stack traces before halting execution.
 *
 * @param rawError - The raw error value to handle. Can be an Error object or any other value
 * @returns never - This function always traps and never returns
 *
 * @remarks
 *
 * If an uncaught error happens during execution of the cleanup callback of an inter-canister call,
 * then its `rejectCode` will be set to `10_001` and its `rejectMessage` will be set to
 * `executing within cleanup callback`. It is essential that the canister not trap during execution
 * of the cleanup callback. If the cleanup callback error reaches `handleUncaughtError` it means
 * that the developer has not caught the error, and thus we return without trapping.
 *
 */
export function handleUncaughtError(rawError: any): never | void {
    const executingWithinCleanupCallback =
        rawError.type === 'CleanupCallback' &&
        rawError.rejectCode === 10_001 &&
        rawError.rejectMessage === 'executing within cleanup callback';

    if (executingWithinCleanupCallback === true) {
        return;
    }

    if (rawError instanceof Error) {
        const error = rawError;
        trap(`Uncaught ${error.name}: ${error.message}\n${error.stack}`);
    } else {
        const error = new Error(rawError);
        trap(`Uncaught: ${error.message}\n${error.stack}`);
    }
}

export function validateUnsignedInteger(
    errorPrefix: string,
    size: number,
    number: number
): void {
    if (number < 0) {
        throw new Error(`${errorPrefix} cannot be negative`);
    }

    if (size > 53) {
        throw new Error(
            `${errorPrefix} to remain within safe integer bounds, size cannot be greater than 53`
        );
    }

    const maxUnsignedInteger = Math.pow(2, size) - 1;

    if (number > maxUnsignedInteger) {
        throw new Error(
            `${errorPrefix} cannot be greater than ${maxUnsignedInteger} (2^${size} - 1)`
        );
    }
}
