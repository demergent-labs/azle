import { IDL, JsonValue } from '@dfinity/candid';

import { reply } from './ic_apis';

export type CanisterMethodMode =
    | 'query'
    | 'update'
    | 'init'
    | 'postUpgrade'
    | 'preUpgrade'
    | 'inspectMessage'
    | 'heartbeat';

export async function executeAndReplyWithCandidSerde(
    mode: CanisterMethodMode,
    args: Uint8Array,
    callback: (...args: any) => any,
    paramIdlTypes: IDL.Type[],
    returnIdlType: IDL.Type | undefined,
    manual: boolean
): Promise<void> {
    const decodedArgs = decodeArgs(mode, args, paramIdlTypes);
    const unencodedResult = await getUnencodedResult(decodedArgs, callback);
    encodeResultAndReply(mode, manual, unencodedResult, returnIdlType);
}

function decodeArgs(
    mode: CanisterMethodMode,
    args: Uint8Array,
    paramIdlTypes: IDL.Type[]
): JsonValue[] {
    if (
        mode === 'init' ||
        mode === 'postUpgrade' ||
        mode === 'query' ||
        mode === 'update'
    ) {
        return idlDecode(paramIdlTypes, args);
    } else {
        return [];
    }
}

async function getUnencodedResult(
    args: JsonValue[],
    callback: (...args: any) => any
): Promise<any> {
    return await callback(...args);
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

export function idlEncode(
    argTypes: Array<IDL.Type<any>>,
    args: any[]
): Uint8Array {
    try {
        // TODO IDL.encode has ArrayBuffer as the return type, but it actually returns a Uint8Array
        // TODO we may need to remove the new Uint8Array in the future if they address the situation
        // TODO we are not sure if they will make the final type and return value an ArrayBuffer
        // TODO or a Uint8Array: https://github.com/demergent-labs/azle/issues/2061
        return new Uint8Array(IDL.encode(argTypes, args));
    } catch (error) {
        throw new Error(`Failed to encode Candid arguments: ${error}`);
    }
}

export function idlDecode(
    retTypes: IDL.Type[],
    bytes: Uint8Array
): JsonValue[] {
    try {
        return IDL.decode(retTypes, bytes);
    } catch (error) {
        throw new Error(`Failed to decode Candid bytes: ${error}`);
    }
}
