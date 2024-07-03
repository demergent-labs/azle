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
                if (!manual) {
                    if (returnIdl !== undefined) {
                        ic.replyRaw(
                            new Uint8Array(IDL.encode([returnIdl], [result]))
                        );
                    } else {
                        // TODO is void best represented as IDL.encode([], [])?
                        ic.replyRaw(new Uint8Array(IDL.encode([], [])));
                    }
                }
            })
            .catch((error: any) => {
                handleUncaughtError(error);
            });
    } else {
        if (!manual) {
            if (returnIdl !== undefined) {
                ic.replyRaw(new Uint8Array(IDL.encode([returnIdl], [result])));
            } else {
                // TODO is void best represented as IDL.encode([], [])?
                ic.replyRaw(new Uint8Array(IDL.encode([], [])));
            }
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
