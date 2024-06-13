import { IDL } from '@dfinity/candid';

import { ic } from '../ic';
import { handleUncaughtError } from './error';

type CanisterMethodMode =
    | 'query'
    | 'update'
    | 'init'
    | 'heartbeat'
    | 'inspectMessage'
    | 'postUpgrade'
    | 'preUpgrade';

export function executeMethod(
    mode: CanisterMethodMode,
    args: any[],
    callback: any,
    paramIdls: IDL.Type[],
    returnIdl: IDL.Type,
    manual: boolean
) {
    const decodedArgs = IDL.decode(paramIdls, args[0]);

    const result = getResult(decodedArgs, callback);

    if (
        mode === 'init' ||
        mode === 'postUpgrade' ||
        mode === 'inspectMessage'
    ) {
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
                    ic.replyRaw(
                        new Uint8Array(IDL.encode([returnIdl], [result]))
                    );
                }
            })
            .catch((error: any) => {
                handleUncaughtError(error);
            });
    } else {
        if (!manual) {
            ic.replyRaw(new Uint8Array(IDL.encode([returnIdl], [result])));
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
