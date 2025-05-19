"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUncaughtError = handleUncaughtError;
exports.validateUnsignedInteger = validateUnsignedInteger;
var trap_1 = require("./ic_apis/trap");
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
function handleUncaughtError(rawError) {
    var executingWithinCleanupCallback = rawError.type === 'CleanupCallback' &&
        rawError.rejectCode === 10001 &&
        rawError.rejectMessage === 'executing within cleanup callback';
    if (executingWithinCleanupCallback === true) {
        return;
    }
    if (rawError instanceof Error) {
        var error = rawError;
        (0, trap_1.trap)("Uncaught ".concat(error.name, ": ").concat(error.message, "\n").concat(error.stack));
    }
    else {
        var error = new Error(rawError);
        (0, trap_1.trap)("Uncaught: ".concat(error.message, "\n").concat(error.stack));
    }
}
function validateUnsignedInteger(errorPrefix, size, number) {
    if (number < 0) {
        throw new Error("".concat(errorPrefix, " cannot be negative"));
    }
    var maxUnsignedInteger = Math.pow(2, size) - 1;
    if (number > maxUnsignedInteger) {
        throw new Error("".concat(errorPrefix, " cannot be greater than ").concat(maxUnsignedInteger, " (2^").concat(size, " - 1)"));
    }
}
