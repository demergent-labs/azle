import { IDL } from '../../lib_new/index';
import { ic } from '../../lib_new/ic';
import { TypeMapping } from '..';
import {
    DecodeVisitor,
    EncodeVisitor
} from '../../lib_new/visitors/encode_decode';
import { Parent } from '../../lib_new/utils';

export * from './heartbeat';
export * from './init';
export * from './inspect_message';
export * from './post_upgrade';
export * from './pre_upgrade';
export * from './query';
export * from './update';

export type MethodArgs = { manual?: boolean; guard?: () => void };

export type CanisterMethodInfo<T extends ReadonlyArray<any>, K> = {
    mode:
        | 'query'
        | 'update'
        | 'init'
        | 'heartbeat'
        | 'inspectMessage'
        | 'postUpgrade'
        | 'preUpgrade';
    async: boolean;
    callback?: (...args: any) => any;
    paramsIdls: any[];
    returnIdl: any;
    guard: (() => any) | undefined;
};

export type Callback<Params extends ReadonlyArray<any>, Return> = (
    ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
) => TypeMapping<Return> | Promise<TypeMapping<Return>>;

export function executeMethod(
    mode: CanisterMethodInfo<any, any>['mode'],
    finalParamIdls: any,
    finalReturnIdl: any,
    args: any[],
    callback: any,
    userMadeParamsIdls: any[],
    userMadeReturnIdl: any,
    manual: boolean
) {
    if (mode === 'heartbeat') {
        const result = callback();

        if (
            result !== undefined &&
            result !== null &&
            typeof result.then === 'function'
        ) {
            result.catch((error: any) => {
                ic.trap(error.toString());
            });
        }

        return;
    }

    if (mode === 'preUpgrade') {
        callback();
        return;
    }

    const decoded = IDL.decode(finalParamIdls as any, args[0]);

    const myDecodedObject = finalParamIdls.map((idl: any, index: any) => {
        return idl.accept(new DecodeVisitor(), {
            js_class: userMadeParamsIdls[index],
            js_data: decoded[index]
        });
    });

    const result = callback(...myDecodedObject);

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
                // TODO this won't be accurate because we have most likely had
                // TODO cross-canister calls
                console.log(`final instructions: ${ic.instructionCounter()}`);

                if (!manual) {
                    // const encodeReadyResult = result === undefined ? [] : [result];
                    const encodeReadyResult = finalReturnIdl.map((idl: any) => {
                        return idl.accept(new EncodeVisitor(), {
                            js_class: userMadeReturnIdl,
                            js_data: result
                        });
                    });
                    const encoded = IDL.encode(
                        finalReturnIdl as any,
                        encodeReadyResult
                    );
                    ic.replyRaw(new Uint8Array(encoded));
                }
            })
            .catch((error: any) => {
                ic.trap(error.toString());
            });
    } else {
        if (!manual) {
            // const encodeReadyResult = result === undefined ? [] : [result];
            const encodeReadyResult = finalReturnIdl.map((idl: any) => {
                return idl.accept(new EncodeVisitor(), {
                    js_class: userMadeReturnIdl,
                    js_data: result
                });
            });

            const encoded = IDL.encode(
                finalReturnIdl as any,
                encodeReadyResult
            );
            ic.replyRaw(new Uint8Array(encoded));
        }

        console.log(`final instructions: ${ic.instructionCounter()}`);
    }
}

export function createParents(parent: any): Parent[] {
    return parent === undefined
        ? []
        : [{ idl: parent, name: parent._azleName }];
}
