import { ic } from '.';

export function handleUncaughtError(rawError: any) {
    const error = rawError instanceof Error ? rawError : new Error(rawError);

    const azleError = `Uncaught ${error.name}: ${error.message}${error.stack}`;

    ic.trap(azleError);
}
