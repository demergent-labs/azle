/**
 * The interface for our rust methods it slightly different than the interface
 * we expose to the users. This is the interface for the rust functions.
 */
export type AzleIc = {
    argDataRaw: () => Uint8Array;
    callRaw: (
        promiseId: string,
        canisterIdBytes: Uint8Array,
        method: string,
        argsRaw: Uint8Array,
        payment: bigint
    ) => void;
    caller: () => Uint8Array;
    candidCompiler: (candidPath: string) => string;
    candidDecode: (candidBytes: Uint8Array) => string;
    candidEncode: (candidString: string) => Uint8Array;
    canisterBalance: () => string;
    canisterVersion: () => bigint;
    clearTimer: (timerId: bigint) => void;
    cyclesBurn: (amountString: string) => string;
    dataCertificate: () => Uint8Array | undefined;
    id: () => Uint8Array;
    instructionCounter: () => bigint;
    isController: (principalBytes: Uint8Array) => boolean;
    msgCyclesAccept: (maxAmountString: string) => string;
    msgCyclesAvailable: () => string;
    msgCyclesRefunded: () => string;
    notifyRaw: (
        canisterIdBytes: Uint8Array,
        method: string,
        argsRawBuffer: Uint8Array,
        payment: bigint
    ) => void;
    performanceCounter: (counterType: number) => bigint;
    rejectCode: () => number;
    replyRaw: (bytes: Uint8Array) => void;
    setCertifiedData: (dataBytes: Uint8Array) => void;
    setTimer: (delayString: bigint, timerCallbackId: string) => bigint;
    setTimerInterval: (
        intervalString: bigint,
        timerCallbackId: string
    ) => bigint;
    time: () => bigint;
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
    stableBTreeMapInit: (memoryId: number) => void;
    stableBTreeMapContainsKey: (
        memoryId: number,
        encodedKey: Uint8Array
    ) => boolean;
    stableBTreeMapGet: (
        memoryId: number,
        encodedKey: Uint8Array
    ) => Uint8Array | undefined;
    stableBTreeMapInsert: (
        memoryId: number,
        encodedKey: Uint8Array,
        encodedValue: Uint8Array
    ) => Uint8Array | undefined;
    stableBTreeMapIsEmpty: (memoryId: number) => boolean;
    // TODO should these indexes and lengths be bigints for future proofing?
    stableBTreeMapItems: (
        memoryId: number,
        startIndex: number,
        length: number
    ) => [Uint8Array, Uint8Array][];
    stableBTreeMapKeys: (
        memoryId: number,
        startIndex: number,
        length: number
    ) => Uint8Array[];
    stableBTreeMapLen: (memoryId: number) => bigint;
    stableBTreeMapRemove(memoryId: number, encodedKey: Uint8Array): Uint8Array;
    stableBTreeMapValues: (
        memoryId: number,
        startIndex: number,
        length: number
    ) => Uint8Array[];
};
