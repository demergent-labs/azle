import { IDL } from '@dfinity/candid';

import { handleUncaughtError } from './error';
import { reply } from './ic_apis';

type CanisterMethodMode =
    | 'query'
    | 'update'
    | 'init'
    | 'heartbeat'
    | 'inspectMessage'
    | 'postUpgrade'
    | 'preUpgrade';

export function executeWithCandidSerde(
    mode: CanisterMethodMode,
    args: any[],
    callback: any,
    paramIdls: IDL.Type[],
    returnIdl: IDL.Type | undefined,
    manual: boolean
): void {
    const decodedArgs = IDL.decode(paramIdls, args[0]);

    const result = getResult(decodedArgs, callback);

    if (mode === 'init' || mode === 'postUpgrade') {
        return;
    }

    if (
        result !== undefined &&
        result !== null &&
        typeof result.then === 'function'
    ) {
        result
            .then((result: any) => {
                reply({ data: result, idl: returnIdl });
            })
            .catch((error: any) => {
                handleUncaughtError(error);
            });
    } else {
        if (!manual) {
            reply({ data: result, idl: returnIdl });
        }
    }
}

function getResult(args: any[], callback: any): any {
    try {
        return callback(...args);
    } catch (error) {
        handleUncaughtError(error);
    }
}
