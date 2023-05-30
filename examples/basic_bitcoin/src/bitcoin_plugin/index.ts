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

export type BitcoinOutPoint = {
    new: (txid: BitcoinTxid, vout: nat32) => BitcoinOutPoint;
};

export const BitcoinOutPoint = {
    new: (txid: BitcoinTxid, vout: nat32) => {
        return (globalThis as any).BitcoinPlugin.BitcoinOutPoint.new(
            txid,
            vout
        ) as BitcoinOutPoint;
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
    inputs: Vec<BitcoinTxIn>;
    lock_time: nat32;
    version: int32;
    outputs: Vec<BitcoinTxOut>;
    prepare_script_sig: (index: nat32, script: BitcoinScript) => void;
    serialize: () => blob;
    signature_hash: (
        input_index: nat32,
        script_pubkey: BitcoinScript,
        sighash_u32: nat32
    ) => BitcoinSighash;
    txid: () => BitcoinTxid;
};

export const BitcoinTransaction = {
    new: (
        inputs: BitcoinTransaction['inputs'],
        lock_time: BitcoinTransaction['lock_time'],
        version: BitcoinTransaction['version'],
        outputs: BitcoinTransaction['outputs']
    ) => {
        return (globalThis as any).BitcoinPlugin.BitcoinTransaction.new(
            inputs,
            lock_time,
            version,
            outputs
        ) as BitcoinTransaction;
    }
};

export type BitcoinTxid = {
    from_hash: (hash: BitcoinHash) => BitcoinTxid;
    to_string: () => string;
};

export const BitcoinTxid = {
    from_hash: (hash: BitcoinHash) => {
        return (globalThis as any).BitcoinPlugin.BitcoinTxid.from_hash(
            hash
        ) as BitcoinTxid;
    }
};

export type BitcoinTxIn = {
    witness: BitcoinWitness; // TODO we need these to be setters or accessors or something
    new: (
        previous_output: BitcoinOutPoint,
        sequence: nat32,
        witness: BitcoinWitness,
        script_sig: BitcoinScript
    ) => BitcoinTxIn;
    set_script_sig: (script_sig: BitcoinScript) => void;
};

export const BitcoinTxIn = {
    new: (
        previous_output: BitcoinOutPoint,
        script_sig: BitcoinScript,
        sequence: nat32,
        witness: BitcoinWitness
    ) => {
        return (globalThis as any).BitcoinPlugin.BitcoinTxIn.new(
            previous_output,
            script_sig,
            sequence,
            witness
        ) as BitcoinTxIn;
    }
};

export type BitcoinTxOut = {
    new: (value: nat64, script_pubkey: BitcoinScript) => BitcoinTxOut;
};

export const BitcoinTxOut = {
    new: (value: nat64, script_pubkey: BitcoinScript) => {
        return (globalThis as any).BitcoinPlugin.BitcoinTxOut.new(
            value,
            script_pubkey
        ) as BitcoinTxOut;
    }
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
