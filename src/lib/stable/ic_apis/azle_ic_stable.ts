import { RejectCode } from './msg_reject_code';

/**
 * The interface for our rust methods it slightly different than the interface
 * we expose to the users. This is the interface for the rust functions.
 */
export type AzleIcStable = {
    msgArgData: () => Uint8Array;
    callRaw: (
        globalResolveId: string,
        globalRejectId: string,
        canisterIdBytes: Uint8Array,
        method: string,
        argsRaw: Uint8Array,
        cyclesString: string
    ) => void;
    msgCaller: () => Uint8Array;
    candidDecode: (candidBytes: Uint8Array) => string;
    candidEncode: (candidString: string) => Uint8Array;
    canisterCycleBalance: () => string;
    canisterVersion: () => bigint;
    clearTimer: (timerId: string) => void;
    cyclesBurn: (amountString: string) => string;
    dataCertificate: () => Uint8Array | undefined;
    canisterSelf: () => Uint8Array;
    inReplicatedExecution: () => boolean;
    isController: (principalBytes: Uint8Array) => boolean;
    msgCyclesAccept: (maxAmountString: string) => string;
    msgCyclesAvailable: () => string;
    msgCyclesRefunded: () => string;
    notifyRaw: (
        canisterIdBytes: Uint8Array,
        method: string,
        argsRawBuffer: Uint8Array,
        cyclesString: string
    ) => void;
    performanceCounter: (counterType: number) => bigint;
    msgRejectCode: () => RejectCode;
    msgReply: (bytes: Uint8Array) => void;
    setCertifiedData: (dataBytes: Uint8Array) => void;
    setTimer: (delay: string, timerCallbackId: string) => bigint;
    setTimerInterval: (interval: string, timerCallbackId: string) => bigint;
    time: () => bigint;
    // These calls aren't intercepted by our IC object, they go right to the
    // rust version and come out. Since they don't need to be intercepted I am
    // assuming that their types are the same as the types declared by our
    // interceptor.
    acceptMessage: () => void;
    msgMethodName: () => string;
    debugPrint: (...args: any) => void;
    msgReject: (message: string) => void;
    msgRejectMsg: () => string;
    trap: (message: string) => never;
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
    stableBTreeMapLen: (memoryId: number) => number;
    stableBTreeMapRemove(memoryId: number, encodedKey: Uint8Array): Uint8Array;
    stableBTreeMapValues: (
        memoryId: number,
        startIndex: number,
        length: number
    ) => Uint8Array[];
};
