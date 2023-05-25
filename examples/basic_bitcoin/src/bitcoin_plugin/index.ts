import { blob, int32, nat32, nat64, Vec } from 'azle';

export type BitcoinAddress = {
    scriptPubkey: () => BitcoinScript;
};

export const BitcoinAddress = {
    fromStr: (string: string) => {
        return (globalThis as any).BitcoinPlugin.BitcoinAddress.from_str(
            string
        ) as BitcoinAddress;
    }
};

export type BitcoinBuilder = {
    intoScript: () => BitcoinScriptBuf;
    new: () => BitcoinBuilder;
    pushSlice: (_: blob) => BitcoinBuilder;
};

export const BitcoinBuilder = {
    new: () => {
        return (
            globalThis as any
        ).BitcoinPlugin.BitcoinBuilder.new() as BitcoinBuilder;
    }
};

// TODO it would be nice to use a Variant here...
export type BitcoinEcdsaSighashType = {
    All?: null;
    None?: null;
    Single?: null;
    AllPlusAnyoneCanPay?: null;
    NonePlusAnyoneCanPay?: null;
    SinglePlusAnyoneCanPay?: null;
    to_u32?: () => nat32;
};

export const BitcoinEcdsaSighashType = {
    All: {
        All: null
    },
    None: {
        None: null
    },
    Single: {
        Single: null
    },
    AllPlusAnyoneCanPay: {
        AllPlusAnyoneCanPay: null
    },
    NonePlusAnyoneCanPay: {
        NonePlusAnyoneCanPay: null
    },
    SinglePlusAnyoneCanPay: {
        SinglePlusAnyoneCanPay: null
    }
};

export type BitcoinHash = {
    fromSlice: (_: blob) => BitcoinHash;
};

export const BitcoinHash = {
    fromSlice: (slice: blob) => {
        return (globalThis as any).BitcoinPlugin.BitcoinHash.fromSlice(
            slice
        ) as BitcoinHash;
    }
};

export type BitcoinLegacySigHash = {
    toVec: () => blob;
};

export type BitcoinScript = {
    new: () => BitcoinScript;
};

export const BitcoinScript = {
    new: () => {
        return (
            globalThis as any
        ).BitcoinPlugin.BitcoinScript.new() as BitcoinScript;
    }
};

export type BitcoinScriptBuf = {};

export type BitcoinTxid = {
    fromHash: (hash: BitcoinHash) => BitcoinTxid;
};

export const BitcoinTxid = {
    fromHash: (hash: BitcoinHash) => {
        return (globalThis as any).BitcoinPlugin.BitcoinScript.fromHash(
            hash
        ) as BitcoinTxid;
    }
};

export type BitcoinTxIn = {
    scriptSig: BitcoinScriptBuf;
    witness: BitcoinWitness;
};

export type BitcoinTxOut = {
    value: nat64;
    scriptPubkey: BitcoinScript;
};

export type BitcoinTransaction = {
    input: Vec<BitcoinTxIn>;
    lockTime: nat32;
    version: int32;
    output: Vec<BitcoinTxOut>;
    serialize?: () => blob;
    signatureHash?: (
        inputIndex: nat32,
        scriptPubkey: BitcoinScript,
        sighashU32: nat32
    ) => BitcoinLegacySigHash;
    txid?: () => BitcoinTxid;
};

export type BitcoinWitness = {
    clear: () => void;
    new: () => BitcoinWitness;
};

export const BitcoinWitness = {
    new: () => {
        return (
            globalThis as any
        ).BitcoinPlugin.BitcoinWitness.new() as BitcoinWitness;
    }
};
