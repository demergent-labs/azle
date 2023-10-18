/**
 * The interface for our rust methods it slightly different than the interface
 * we expose to the users. This is the interface for the rust functions.
 */
export type AzleIc = {
    argDataRaw: () => ArrayBufferLike;
    argDataRawSize: () => number;
    callRaw: (
        promiseId: string,
        canisterIdBytes: ArrayBufferLike,
        method: string,
        argsRaw: ArrayBufferLike,
        paymentCandidBytes: ArrayBufferLike
    ) => void;
    callRaw128: (
        promiseId: string,
        canisterIdBytes: ArrayBufferLike,
        method: string,
        argsRaw: ArrayBufferLike,
        paymentCandidBytes: ArrayBufferLike
    ) => void;
    caller: () => ArrayBufferLike;
    candidDecode: (candidBytes: ArrayBufferLike) => string;
    candidEncode: (candidString: string) => ArrayBufferLike;
    canisterBalance: () => ArrayBufferLike;
    canisterBalance128: () => ArrayBufferLike;
    canisterVersion: () => ArrayBufferLike;
    clearTimer: (timerIdBytes: ArrayBufferLike) => void;
    dataCertificate: () => ArrayBufferLike | undefined;
    id: () => string;
    instructionCounter: () => ArrayBufferLike;
    isController: (principalBytes: ArrayBufferLike) => boolean;
    msgCyclesAccept: (maxAmountCandidBytes: ArrayBufferLike) => ArrayBufferLike;
    msgCyclesAccept128: (
        maxAmountCandidBytes: ArrayBufferLike
    ) => ArrayBufferLike;
    msgCyclesAvailable: () => ArrayBufferLike;
    msgCyclesAvailable128: () => ArrayBufferLike;
    msgCyclesRefunded: () => ArrayBufferLike;
    msgCyclesRefunded128: () => ArrayBufferLike;
    notifyRaw: (
        canisterIdBytes: ArrayBufferLike,
        method: string,
        argsRawBuffer: ArrayBufferLike,
        paymentCandidBytes: ArrayBufferLike
    ) => void;
    performanceCounter: (
        counterTypeCandidBytes: ArrayBufferLike
    ) => ArrayBufferLike;
    rejectCode: () => number;
    replyRaw: (bytes: ArrayBufferLike) => void;
    setCertifiedData: (dataBytes: ArrayBufferLike) => void;
    setTimer: (
        delayBytes: ArrayBufferLike,
        timerCallbackId: string
    ) => ArrayBufferLike;
    setTimerInterval: (
        intervalBytes: ArrayBufferLike,
        timerCallbackId: string
    ) => ArrayBufferLike;
    stableBytes: () => ArrayBufferLike;
    stableGrow: (newPagesCandidBytes: ArrayBufferLike) => ArrayBufferLike;
    stableRead: (paramsCandidBytes: ArrayBufferLike) => ArrayBufferLike;
    stableSize: () => ArrayBufferLike;
    stableWrite: (paramsCandidBytes: ArrayBufferLike) => void;
    stable64Grow: (newPagesCandidBytes: ArrayBufferLike) => ArrayBufferLike;
    stable64Read: (paramsCandidBytes: ArrayBufferLike) => ArrayBufferLike;
    stable64Size: () => ArrayBufferLike;
    stable64Write: (paramsCandidBytes: ArrayBufferLike) => void;
    time: () => ArrayBufferLike;
    // These calls aren't intercepted by our IC object, they go right to the
    // rust version and come out. Since they don't need to be intercepted I am
    // assuming that their types are the same as the types declared by our
    // interceptor.
    acceptMessage: () => void;
    methodName: () => string;
    print: (...args: any) => void;
    reject: (message: string) => void;
    rejectMessage: () => string;
    trap: (message: string) => never;
    // These calls are intercepted by our IC object and redirected to their
    // corresponding raw version. The rust version is never called, we don't
    // have enough info about types to do so
    call: () => never;
    call128: () => never;
    notify: () => never;
    reply: () => never;
    // Stable B Tree Map Functions
    stableBTreeMapInit: (candidEncodedMemoryId: ArrayBufferLike) => void;
    stableBTreeMapContainsKey: (
        candidEncodedMemoryId: ArrayBufferLike,
        candidEncodedKey: ArrayBufferLike
    ) => boolean;
    stableBTreeMapGet: (
        candidEncodedMemoryId: ArrayBufferLike,
        candidEncodedKey: ArrayBufferLike
    ) => ArrayBuffer | undefined;
    stableBTreeMapInsert: (
        candidEncodedMemoryId: ArrayBufferLike,
        candidEncodedKey: ArrayBufferLike,
        candidEncodedValue: ArrayBufferLike
    ) => ArrayBuffer | undefined;
    stableBTreeMapIsEmpty: (candidEncodedMemoryId: ArrayBuffer) => boolean;
    stableBTreeMapItems: (
        candidEncodedMemoryId: ArrayBufferLike
    ) => [ArrayBuffer, ArrayBuffer][];
    stableBTreeMapKeys: (
        candidEncodedMemoryId: ArrayBufferLike
    ) => ArrayBuffer[];
    stableBTreeMapLen: (candidEncodedMemoryId: ArrayBufferLike) => ArrayBuffer;
    stableBTreeMapRemove(
        candidEncodedMemoryId: ArrayBufferLike,
        candidEncodedKey: ArrayBufferLike
    ): ArrayBuffer;
    stableBTreeMapValues: (
        candidEncodedMemoryId: ArrayBufferLike
    ) => ArrayBuffer[];
};
