import { trap } from './ic_apis/trap';

export function handleUncaughtError(rawError: any): never {
    const error = rawError instanceof Error ? rawError : new Error(rawError);

    const azleError = `Uncaught ${error.name}: ${error.message}${error.stack}`;

    trap(azleError);
}
