export function callRaw(canisterId, method, argsRaw, payment) {
    return new Promise((resolve, reject) => {
        const promiseId = v4();
        const globalResolveId = `_resolve_${promiseId}`;
        const globalRejectId = `_reject_${promiseId}`;

        // TODO perhaps we should be more robust
        // TODO for example, we can keep the time with these
        // TODO if they are over a certain amount old we can delete them
        globalThis[globalResolveId] = (bytes: ArrayBuffer) => {
            resolve(new Uint8Array(bytes));

            delete globalThis[globalResolveId];
            delete globalThis[globalRejectId];
        };

        globalThis[globalRejectId] = (error: any) => {
            reject(error);

            delete globalThis[globalResolveId];
            delete globalThis[globalRejectId];
        };

        const canisterIdBytes = canisterId.toUint8Array().buffer;
        const argsRawBuffer = argsRaw.buffer;
        const paymentCandidBytes = new Uint8Array(
            IDL.encode([IDL.Nat64], [payment])
        ).buffer;

        // TODO consider finally, what if deletion goes wrong
        try {
            globalThis._azleIc.callRaw(
                promiseId,
                canisterIdBytes,
                method,
                argsRawBuffer,
                paymentCandidBytes
            );
        } catch (error) {
            delete globalThis[globalResolveId];
            delete globalThis[globalRejectId];
            throw error;
        }
    });
}
