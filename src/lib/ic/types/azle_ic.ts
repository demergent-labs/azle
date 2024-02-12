/**
 * The interface for our rust methods it slightly different than the interface
 * we expose to the users. This is the interface for the rust functions.
 */
export type AzleIc = {
    argDataRaw: () => ArrayBufferLike;
    argDataRawSize: () => string;
    callRaw: (
        promiseId: string,
        canisterIdBytes: ArrayBufferLike,
        method: string,
        argsRaw: ArrayBufferLike,
        paymentString: string
    ) => void;
    callRaw128: (
        promiseId: string,
        canisterIdBytes: ArrayBufferLike,
        method: string,
        argsRaw: ArrayBufferLike,
        paymentString: string
    ) => void;
    caller: () => ArrayBufferLike;
    candidCompiler: (candidPath: string) => string;
    candidDecode: (candidBytes: ArrayBufferLike) => string;
    candidEncode: (candidString: string) => ArrayBufferLike;
    canisterBalance: () => string;
    canisterBalance128: () => string;
    canisterVersion: () => string;
    clearTimer: (timerIdString: string) => void;
    dataCertificate: () => ArrayBufferLike | undefined;
    id: () => string;
    instructionCounter: () => string;
    isController: (principalBytes: ArrayBufferLike) => boolean;
    msgCyclesAccept: (maxAmountString: string) => string;
    msgCyclesAccept128: (maxAmountString: string) => string;
    msgCyclesAvailable: () => string;
    msgCyclesAvailable128: () => string;
    msgCyclesRefunded: () => string;
    msgCyclesRefunded128: () => string;
    notifyRaw: (
        canisterIdBytes: ArrayBufferLike,
        method: string,
        argsRawBuffer: ArrayBufferLike,
        paymentString: string
    ) => void;
    performanceCounter: (counterType: string) => string;
    rejectCode: () => string;
    replyRaw: (bytes: ArrayBufferLike) => void;
    setCertifiedData: (dataBytes: ArrayBufferLike) => void;
    setTimer: (delayString: string, timerCallbackId: string) => string;
    setTimerInterval: (
        intervalString: string,
        timerCallbackId: string
    ) => string;
    stableBytes: () => ArrayBufferLike;
    stableGrow: (newPages: string) => string;
    stableRead: (offset: string, length: string) => ArrayBufferLike;
    stableSize: () => string;
    stableWrite: (offset: string, buf: ArrayBufferLike) => void;
    stable64Grow: (newPages: string) => string;
    stable64Read: (offset: string, length: string) => ArrayBufferLike;
    stable64Size: () => string;
    stable64Write: (offset: string, buf: ArrayBufferLike) => void;
    time: () => string;
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
    stableBTreeMapInit: (memoryId: string) => void;
    stableBTreeMapContainsKey: (
        memoryId: string,
        encodedKey: ArrayBufferLike
    ) => boolean;
    stableBTreeMapGet: (
        memoryId: string,
        encodedKey: ArrayBufferLike
    ) => ArrayBuffer | undefined;
    stableBTreeMapInsert: (
        memoryId: string,
        encodedKey: ArrayBufferLike,
        encodedValue: ArrayBufferLike
    ) => ArrayBuffer | undefined;
    stableBTreeMapIsEmpty: (memoryId: string) => boolean;
    stableBTreeMapItems: (
        memoryId: string,
        startIndex: string,
        length: string
    ) => [ArrayBuffer, ArrayBuffer][];
    stableBTreeMapKeys: (
        memoryId: string,
        startIndex: string,
        length: string
    ) => ArrayBuffer[];
    stableBTreeMapLen: (memoryId: string) => string;
    stableBTreeMapRemove(
        memoryId: string,
        encodedKey: ArrayBufferLike
    ): ArrayBuffer;
    stableBTreeMapValues: (
        memoryId: string,
        startIndex: string,
        length: string
    ) => ArrayBuffer[];
};
