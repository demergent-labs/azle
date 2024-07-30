/**
 * The interface for our rust methods it slightly different than the interface
 * we expose to the users. This is the interface for the rust functions.
 */
export type AzleIc = {
    argDataRaw: () => ArrayBuffer;
    callRaw: (
        promiseId: string,
        canisterIdBytes: ArrayBuffer,
        method: string,
        argsRaw: ArrayBuffer,
        paymentString: string
    ) => void;
    caller: () => ArrayBuffer;
    candidCompiler: (candidPath: string) => string;
    candidDecode: (candidBytes: ArrayBuffer) => string;
    candidEncode: (candidString: string) => ArrayBuffer;
    canisterBalance: () => string;
    canisterVersion: () => string;
    clearTimer: (timerIdString: string) => void;
    dataCertificate: () => ArrayBuffer | undefined;
    id: () => string;
    instructionCounter: () => string;
    isController: (principalBytes: ArrayBuffer) => boolean;
    msgCyclesAccept: (maxAmountString: string) => string;
    msgCyclesAvailable: () => string;
    msgCyclesRefunded: () => string;
    notifyRaw: (
        canisterIdBytes: ArrayBuffer,
        method: string,
        argsRawBuffer: ArrayBuffer,
        paymentString: string
    ) => void;
    performanceCounter: (counterType: string) => string;
    rejectCode: () => string;
    replyRaw: (bytes: ArrayBuffer) => void;
    setCertifiedData: (dataBytes: ArrayBuffer) => void;
    setTimer: (delayString: string, timerCallbackId: string) => string;
    setTimerInterval: (
        intervalString: string,
        timerCallbackId: string
    ) => string;
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
    notify: () => never;
    reply: () => never;
    // Stable B Tree Map Functions
    stableBTreeMapInit: (memoryId: string) => void;
    stableBTreeMapContainsKey: (
        memoryId: string,
        encodedKey: ArrayBuffer
    ) => boolean;
    stableBTreeMapGet: (
        memoryId: string,
        encodedKey: ArrayBuffer
    ) => ArrayBuffer | undefined;
    stableBTreeMapInsert: (
        memoryId: string,
        encodedKey: ArrayBuffer,
        encodedValue: ArrayBuffer
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
        encodedKey: ArrayBuffer
    ): ArrayBuffer;
    stableBTreeMapValues: (
        memoryId: string,
        startIndex: string,
        length: string
    ) => ArrayBuffer[];
};
