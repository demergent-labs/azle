import { RejectCode } from './msg_reject_code';

/**
 * The interface for our Rust functions is slightly different than the interface
 * we expose to the users. This is the interface for the Rust functions.
 */
export type AzleIc = {
    acceptMessage: () => void;
    callRaw: (
        globalResolveId: string,
        globalRejectId: string,
        canisterIdBytes: Uint8Array,
        method: string,
        argsRaw: Uint8Array,
        cyclesString: string
    ) => void;
    candidDecode: (candidBytes: Uint8Array) => string;
    candidEncode: (candidString: string) => Uint8Array;
    canisterCycleBalance: () => string;
    canisterSelf: () => Uint8Array;
    canisterVersion: () => bigint;
    clearTimer: (timerId: string) => void;
    cyclesBurn: (amountString: string) => string;
    dataCertificate: () => Uint8Array | undefined;
    debugPrint: (message: string) => void;
    inReplicatedExecution: () => boolean;
    isController: (principalBytes: Uint8Array) => boolean;
    msgArgData: () => Uint8Array;
    msgCaller: () => Uint8Array;
    msgCyclesAccept: (maxAmountString: string) => string;
    msgCyclesAvailable: () => string;
    msgCyclesRefunded: () => string;
    msgMethodName: () => string;
    msgRejectCode: () => RejectCode;
    msgRejectMsg: () => string;
    msgReject: (message: string) => void;
    msgReply: (bytes: Uint8Array) => void;
    notifyRaw: (
        canisterIdBytes: Uint8Array,
        method: string,
        argsRawBuffer: Uint8Array,
        cyclesString: string
    ) => void;
    performanceCounter: (counterType: number) => bigint;
    randBytes: (byteLength: number) => Uint8Array;
    randSeed: (seed: Uint8Array) => void;
    setCertifiedData: (dataBytes: Uint8Array) => void;
    setTimerInterval: (interval: number) => bigint;
    setTimer: (delay: number) => bigint;
    stableBTreeMapContainsKey: (
        memoryId: number,
        encodedKey: Uint8Array
    ) => boolean;
    stableBTreeMapGet: (
        memoryId: number,
        encodedKey: Uint8Array
    ) => Uint8Array | undefined;
    stableBTreeMapInit: (memoryId: number) => void;
    stableBTreeMapInsert: (
        memoryId: number,
        encodedKey: Uint8Array,
        encodedValue: Uint8Array
    ) => Uint8Array | undefined;
    stableBTreeMapIsEmpty: (memoryId: number) => boolean;
    stableBTreeMapItems: (
        memoryId: number,
        startIndex?: number,
        length?: number
    ) => [Uint8Array, Uint8Array][];
    stableBTreeMapKeys: (
        memoryId: number,
        startIndex?: number,
        length?: number
    ) => Uint8Array[];
    stableBTreeMapLen: (memoryId: number) => number;
    stableBTreeMapRemove(
        memoryId: number,
        encodedKey: Uint8Array
    ): Uint8Array | undefined;
    stableBTreeMapValues: (
        memoryId: number,
        startIndex?: number,
        length?: number
    ) => Uint8Array[];
    time: () => bigint;
    trap: (message: string) => never;
};
