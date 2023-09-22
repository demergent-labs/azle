import { IDL } from '../../lib_new/index';
import { ic } from '../../lib_new/ic';
import { TypeMapping } from '..';

export * from './query';
export * from './update';

export type CanisterMethodInfo = {
    type: 'query' | 'update';
    callback: (...args: any) => any;
    candid: string;
    candidTypes: string[];
};

// TODO this doesn't produce a TS error when the user returns a non-void value in a void function
export type Callback<Params extends ReadonlyArray<any>, Return> = (
    ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
) => TypeMapping<Return>;

export function executeMethod(
    paramCandid: any,
    returnCandid: any,
    args: any[],
    callback: any
) {
    const decoded = IDL.decode(paramCandid[0] as any, args[0]);

    const result = callback(...decoded);

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
                const encodeReadyResult = result === undefined ? [] : [result];
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
        const encodeReadyResult = result === undefined ? [] : [result];

        // if (!manual) {
        const encoded = IDL.encode(returnCandid[0] as any, encodeReadyResult);
        ic.replyRaw(new Uint8Array(encoded));
        // }

        console.log(`final instructions: ${ic.instructionCounter()}`);
    }
}
