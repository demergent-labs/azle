// import { trap } from './ic_apis/trap'; // TODO why does this break bitcoin_psbt examples? https://github.com/demergent-labs/azle/issues/2003
import { trap } from './ic/trap';

export function handleUncaughtError(rawError: any): never {
    const error = rawError instanceof Error ? rawError : new Error(rawError);

    const azleError = `Uncaught ${error.name}: Error: ${error.message}${error.stack}`;

    trap(azleError);
}