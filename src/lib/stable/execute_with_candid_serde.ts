import { IDL, JsonValue } from '@dfinity/candid';

import { handleUncaughtError } from './error';
import { reply, trap } from './ic_apis';

type CanisterMethodMode =
    | 'query'
    | 'update'
    | 'init'
    | 'postUpgrade'
    | 'preUpgrade'
    | 'inspectMessage'
    | 'heartbeat';

export async function executeAndReplyWithCandidSerde(
    mode: CanisterMethodMode,
    args: any[],
    callback: (...args: any) => any,
    paramIdlTypes: IDL.Type[],
    returnIdlType: IDL.Type | undefined,
    manual: boolean
): Promise<void> {
    try {
        const decodedArgs = decodeArgs(mode, args, paramIdlTypes);
        const unencodedResult = await getUnencodedResult(decodedArgs, callback);
        encodeResultAndReply(mode, manual, unencodedResult, returnIdlType);
    } catch (error: any) {
        trap(error.toString());
    }
}

function decodeArgs(
    mode: CanisterMethodMode,
    args: any[],
    paramIdlTypes: IDL.Type[]
): JsonValue[] {
    if (
        mode === 'init' ||
        mode === 'postUpgrade' ||
        mode === 'query' ||
        mode === 'update'
    ) {
        return IDL.decode(paramIdlTypes, args[0]);
    } else {
        return [];
    }
}

async function getUnencodedResult(
    args: JsonValue[],
    callback: (...args: any) => any
): Promise<any> {
    try {
        return await callback(...args);
    } catch (error) {
        handleUncaughtError(error);
    }
}

function encodeResultAndReply(
    mode: CanisterMethodMode,
    manual: boolean,
    unencodedResult: any,
    returnIdlType: IDL.Type | undefined
): void {
    if ((mode !== 'query' && mode !== 'update') || manual === true) {
        return;
    }

    reply({ data: unencodedResult, idlType: returnIdlType });
}
