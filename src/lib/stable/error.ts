import { trap } from './ic_apis/trap';

export function handleUncaughtError(rawError: any): never {
    if (rawError instanceof Error) {
        const error = rawError;
        trap(`Uncaught ${error.name}: ${error.message}\n${error.stack}`);
    } else {
        const error = new Error(rawError);
        trap(`Uncaught: ${error.message}\n${error.stack}`);
    }
}
