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
    paramIdlTypes: IDL.Type[],
    returnIdlType: IDL.Type | undefined,
    manual: boolean
): void {
    const decodedArgs = IDL.decode(paramIdlTypes, args[0]);

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
                if (!manual) {
                    reply({ data: result, idlType: returnIdlType });
                }
            })
            .catch((error: any) => {
                handleUncaughtError(error);
            });
    } else {
        if (!manual) {
            reply({ data: result, idlType: returnIdlType });
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
