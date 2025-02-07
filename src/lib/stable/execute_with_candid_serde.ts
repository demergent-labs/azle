import { IDL, JsonValue } from '@dfinity/candid';

import { ExportedCanisterClass } from './canister_methods';
import { msgArgData } from './ic_apis/msg_arg_data';
import { msgMethodName } from './ic_apis/msg_method_name';
import { msgReply } from './ic_apis/msg_reply';

/**
 * Represents the different types of canister method execution modes.
 */
export type CanisterMethodMode =
    | 'query' // Read-only operations
    | 'update' // State-modifying operations
    | 'init' // Canister initialization
    | 'postUpgrade' // After canister upgrade
    | 'preUpgrade' // Before canister upgrade
    | 'inspectMessage' // Message inspection
    | 'heartbeat' // Periodic heartbeat
    | 'onLowWasmMemory'; // Low Wasm memory handler

/**
 * Executes a canister method with Candid serialization/deserialization handling.
 * This function manages the full lifecycle of a canister method call:
 * 1. Decodes the input arguments from Candid format
 * 2. Executes the callback with decoded arguments
 * 3. Encodes and replies with the result
 *
 * @param mode - The execution mode of the canister method
 * @param args - Raw Candid-encoded input arguments as bytes
 * @param callback - The actual method implementation to execute
 * @param paramIdlTypes - Candid type definitions for the input parameters
 * @param returnIdlType - Candid type definition for the return value
 * @param manual - If true, skips automatic reply handling
 */
export async function executeAndReplyWithCandidSerde(
    mode: CanisterMethodMode,
    callback: (...args: any) => any,
    paramIdlTypes: IDL.Type[],
    returnIdlType: IDL.Type | undefined,
    manual: boolean,
    canisterMethodIdlParamTypes: ExportedCanisterClass['_azleCanisterMethodIdlParamTypes']
): Promise<void> {
    const decodedArgs = decodeArgs(
        mode,
        manual,
        paramIdlTypes,
        canisterMethodIdlParamTypes
    );
    const unencodedResult = await getUnencodedResult(
        mode,
        manual,
        decodedArgs,
        callback
    );
    encodeResultAndReply(mode, manual, unencodedResult, returnIdlType);
}

/**
 * Decodes Candid-encoded arguments based on the method mode.
 * Only decodes arguments for init, postUpgrade, query, and update methods.
 *
 * @param mode - The execution mode of the canister method
 * @param args - Raw Candid-encoded input arguments
 * @param paramIdlTypes - Candid type definitions for the parameters
 * @returns Decoded argument values as a JSON-compatible array
 */
function decodeArgs(
    mode: CanisterMethodMode,
    manual: boolean,
    paramIdlTypes: IDL.Type[],
    canisterMethodIdlParamTypes: ExportedCanisterClass['_azleCanisterMethodIdlParamTypes']
): JsonValue[] {
    if (manual === true) {
        return [];
    }

    if (
        mode === 'init' ||
        mode === 'postUpgrade' ||
        mode === 'query' ||
        mode === 'update'
    ) {
        return idlDecode(paramIdlTypes, msgArgData());
    }

    if (mode === 'inspectMessage') {
        const methodName = msgMethodName();

        const paramIdlTypes =
            canisterMethodIdlParamTypes?.[methodName]?.argTypes;

        if (paramIdlTypes === undefined) {
            throw new Error(
                `@inspectMessage could not find the IDL types for method ${methodName}`
            );
        }

        return idlDecode(paramIdlTypes, msgArgData());
    }

    return [];
}

/**
 * Executes the callback function with the decoded arguments.
 *
 * @param args - Decoded arguments to pass to the callback
 * @param callback - The method implementation to execute
 * @returns The result of the callback execution
 */
async function getUnencodedResult(
    mode: CanisterMethodMode,
    manual: boolean,
    args: JsonValue[],
    callback: (...args: any) => any
): Promise<any> {
    if (mode === 'inspectMessage') {
        const result = await callback(
            ...(manual === true ? [] : [msgMethodName(), ...args])
        );

        if (result === true) {
            if (globalThis._azleIcStable !== undefined) {
                globalThis._azleIcStable.acceptMessage();
            } else {
                globalThis._azleIcExperimental.acceptMessage();
            }
        }
    } else {
        return await callback(...args);
    }
}

/**
 * Handles the encoding and reply of the method result.
 * Only sends replies for query and update methods when manual mode is not enabled.
 *
 * @param mode - The execution mode of the canister method
 * @param manual - If true, skips automatic reply handling
 * @param unencodedResult - The raw result from the callback
 * @param returnIdlType - Candid type definition for the return value
 */
function encodeResultAndReply(
    mode: CanisterMethodMode,
    manual: boolean,
    unencodedResult: any,
    returnIdlType: IDL.Type | undefined
): void {
    if ((mode !== 'query' && mode !== 'update') || manual === true) {
        return;
    }

    const encodedResult = idlEncode(
        [...(returnIdlType !== undefined ? [returnIdlType] : [])],
        [...(unencodedResult !== undefined ? [unencodedResult] : [])]
    );

    msgReply(encodedResult);
}

/**
 * Encodes JavaScript values into Candid format.
 *
 * @param argTypes - Candid type definitions for the values to encode
 * @param args - Values to encode into Candid format
 * @returns Candid-encoded data as bytes
 * @throws {Error} If encoding fails
 */
export function idlEncode(
    argTypes: Array<IDL.Type<any>>,
    args: any[]
): Uint8Array<ArrayBuffer> {
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

/**
 * Decodes Candid-encoded data into JavaScript values.
 *
 * @param retTypes - Candid type definitions for the values to decode
 * @param bytes - Candid-encoded data to decode
 * @returns Decoded JavaScript values
 * @throws {Error} If decoding fails
 */
export function idlDecode(
    retTypes: IDL.Type[],
    bytes: Uint8Array<ArrayBuffer>
): JsonValue[] {
    try {
        return IDL.decode(retTypes, bytes.buffer);
    } catch (error) {
        throw new Error(`Failed to decode Candid bytes: ${error}`);
    }
}
