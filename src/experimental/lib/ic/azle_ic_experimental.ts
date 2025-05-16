/**
 * The interface for our rust methods it slightly different than the interface
 * we expose to the users. This is the interface for the rust functions.
 */
export type AzleIcExperimental = {
    msgArgData: () => ArrayBuffer;
    callRaw: (
        globalResolveId: string,
        globalRejectId: string,
        canisterIdBytes: ArrayBuffer,
        method: string,
        argsRaw: ArrayBuffer,
        paymentString: string
    ) => void;
    msgCaller: () => ArrayBuffer;
    candidCompiler: (candidPath: string) => string;
    candidDecode: (candidBytes: ArrayBuffer) => string;
    candidEncode: (candidString: string) => ArrayBuffer;
    canisterCycleBalance: () => string;
    canisterVersion: () => string;
    clearTimer: (timerIdString: string) => void;
    cyclesBurn: (amount: string) => string;
    dataCertificate: () => ArrayBuffer | undefined;
    canisterSelf: () => string;
    inReplicatedExecution: () => boolean;
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
    msgRejectCode: () => number;
    msgReply: (bytes: ArrayBuffer) => void;
    randBytes: (byteLength: number) => ArrayBuffer;
    randSeed: (seed: ArrayBuffer) => void;
    certifiedDataSet: (dataBytes: ArrayBuffer) => void;
    setTimer: (delayString: string) => string;
    setTimerInterval: (intervalString: string) => string;
    time: () => string;
    drainMicrotasks: () => void;
    // These calls aren't intercepted by our IC object, they go right to the
    // rust version and come out. Since they don't need to be intercepted I am
    // assuming that their types are the same as the types declared by our
    // interceptor.
    acceptMessage: () => void;
    msgMethodName: () => string;
    debugPrint: (message: string) => void;
    msgReject: (message: string) => void;
    msgRejectMsg: () => string;
    trap: (message: string) => never;
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
