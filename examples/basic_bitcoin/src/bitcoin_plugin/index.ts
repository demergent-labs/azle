import { blob, int32, nat32, nat64, registerPlugin, Vec } from 'azle';

export type BitcoinAddress = {
    script_pubkey: () => BitcoinScript;
};

export const BitcoinAddress = {
    from_str: (string: string) => {
        return (globalThis as any).BitcoinPlugin.BitcoinAddress.from_str(
            string
        ) as BitcoinAddress;
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
    from_slice: (_: blob) => BitcoinHash;
};

export const BitcoinHash = {
    from_slice: (slice: blob) => {
        return (globalThis as any).BitcoinPlugin.BitcoinHash.from_slice(
            slice
        ) as BitcoinHash;
    }
};

export type BitcoinSighash = {
    to_vec: () => blob;
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

export type BitcoinScriptBuilder = {
    into_script: () => BitcoinScript;
    new: () => BitcoinScriptBuilder;
    push_slice: (_: blob) => BitcoinScriptBuilder;
};

export const BitcoinScriptBuilder = {
    new: () => {
        return (
            globalThis as any
        ).BitcoinPlugin.BitcoinScriptBuilder.new() as BitcoinScriptBuilder;
    }
};

export type BitcoinTransaction = {
    input: Vec<BitcoinTxIn>;
    lock_time: nat32;
    version: int32;
    output: Vec<BitcoinTxOut>;
    serialize?: () => blob;
    signature_hash?: (
        input_index: nat32,
        script_pubkey: BitcoinScript,
        sighash_u32: nat32
    ) => BitcoinSighash;
    txid?: () => BitcoinTxid;
};

export const BitcoinTransaction = {
    new: (
        input: BitcoinTransaction['input'],
        lock_time: BitcoinTransaction['lock_time'],
        version: BitcoinTransaction['version'],
        output: BitcoinTransaction['output']
    ) => {
        return (globalThis as any).BitcoinPlugin.BitcoinTransaction.new(
            input,
            lock_time,
            version,
            output
        ) as BitcoinTransaction;
    }
};

export type BitcoinTxid = {
    from_hash: (hash: BitcoinHash) => BitcoinTxid;
};

export const BitcoinTxid = {
    from_hash: (hash: BitcoinHash) => {
        return (globalThis as any).BitcoinPlugin.BitcoinScript.from_hash(
            hash
        ) as BitcoinTxid;
    }
};

export type BitcoinTxIn = {
    script_sig: BitcoinScript;
    witness: BitcoinWitness;
};

export type BitcoinTxOut = {
    value: nat64;
    script_pubkey: BitcoinScript;
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

registerPlugin({
    globalObjectName: 'BitcoinPlugin',
    rustRegisterFunctionName: '_bitcoin_plugin_register'
});
