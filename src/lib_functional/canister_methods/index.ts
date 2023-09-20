import { IDL } from '../../lib_new/index';
import { ic } from '../../lib_new/ic';

export * from './query';

export function executeMethod(
    paramCandid: any,
    returnCandid: any,
    args: any[],
    callback: any
) {
    const decoded = IDL.decode(paramCandid[0] as any, args[0]);

    const result = callback(decoded);

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
