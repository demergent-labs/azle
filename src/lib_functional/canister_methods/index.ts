import { IDL } from '../../lib_new/index';
import { ic } from '../../lib_new/ic';
import { TypeMapping } from '..';
import {
    DecodeVisitor,
    EncodeVisitor
} from '../../lib_new/visitors/encode_decode';

export * from './query';
export * from './update';

export type CanisterMethodInfo<T extends ReadonlyArray<any>, K> = {
    mode: 'query' | 'update';
    callback?: (...args: any) => any;
    candid: string;
    candidTypes: string[];
    paramsIdls: any[];
    returnIdl: any;
};

export type Callback<Params extends ReadonlyArray<any>, Return> = (
    ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
) => TypeMapping<Return> | Promise<TypeMapping<Return>>;

export function executeMethod(
    paramCandid: any,
    returnCandid: any,
    args: any[],
    callback: any,
    paramsIdls: any[],
    returnIdl: any
) {
    const decoded = IDL.decode(paramCandid[0] as any, args[0]);

    const myDecodedObject = paramCandid[0].map((idl, index) => {
        return idl.accept(new DecodeVisitor(), {
            js_class: paramsIdls[index],
            js_data: decoded[index]
        });
    });

    const result = callback(...myDecodedObject);

    if (
        result !== undefined &&
        result !== null &&
        typeof result.then === 'function'
    ) {
        result
            .then((result: any) => {
                // TODO this won't be accurate because we have most likely had
                // TODO cross-canister calls
                console.log(`final instructions: ${ic.instructionCounter()}`);

                // if (!manual) {
                // const encodeReadyResult = result === undefined ? [] : [result];
                const encodeReadyResult = returnCandid[0].map((idl) => {
                    return idl.accept(new EncodeVisitor(), {
                        js_class: returnIdl,
                        js_data: result
                    });
                });
                const encoded = IDL.encode(
                    returnCandid[0] as any,
                    encodeReadyResult
                );
                ic.replyRaw(new Uint8Array(encoded));
                // }
            })
            .catch((error: any) => {
                ic.trap(error.toString());
            });
    } else {
        // const encodeReadyResult = result === undefined ? [] : [result];
        const encodeReadyResult = returnCandid[0].map((idl) => {
            return idl.accept(new EncodeVisitor(), {
                js_class: returnIdl,
                js_data: result
            });
        });

        // if (!manual) {
        const encoded = IDL.encode(returnCandid[0] as any, encodeReadyResult);
        ic.replyRaw(new Uint8Array(encoded));
        // }

        console.log(`final instructions: ${ic.instructionCounter()}`);
    }
}
