// TODO I am thinking we should use the same names as ic-btc-types

import { IDL } from '../../src/lib/stable';

export const BitcoinAddress = IDL.Text;
export type BitcoinAddress = string;

export const BlockHash = IDL.Vec(IDL.Nat8);
export type BlockHash = Uint8Array;

export const Page = IDL.Vec(IDL.Nat8);
export type Page = Uint8Array;

export const MillisatoshiPerByte = IDL.Nat64;
export type MillisatoshiPerByte = bigint;

export const Satoshi = IDL.Nat64;
export type Satoshi = bigint;

export const BitcoinNetwork = IDL.Variant({
    mainnet: IDL.Null,
    regtest: IDL.Null,
    testnet: IDL.Null
});
export type BitcoinNetwork =
    | { mainnet: null }
    | { regtest: null }
    | { testnet: null };

export const Outpoint = IDL.Record({
    txid: IDL.Vec(IDL.Nat8),
    vout: IDL.Nat32
});
export type Outpoint = { txid: Uint8Array; vout: number };

export const Utxo = IDL.Record({
    height: IDL.Nat32,
    outpoint: Outpoint,
    value: Satoshi
});
export type Utxo = { height: number; outpoint: Outpoint; value: Satoshi };

export const UtxosFilter = IDL.Variant({
    MinConfirmations: IDL.Nat32,
    Page: Page
});
export type UtxosFilter = { MinConfirmations: number } | { Page: Page };

export const GetBalanceArgs = IDL.Record({
    address: BitcoinAddress,
    min_confirmations: IDL.Opt(IDL.Nat32),
    network: BitcoinNetwork
});
export type GetBalanceArgs = {
    address: BitcoinAddress;
    min_confirmations: [number] | [];
};

export const GetCurrentFeePercentilesArgs = IDL.Record({
    network: BitcoinNetwork
});
export type GetCurrentFeePercentilesArgs = { network: BitcoinNetwork };

export const GetUtxosArgs = IDL.Record({
    address: BitcoinAddress,
    filter: IDL.Opt(UtxosFilter),
    network: BitcoinNetwork
});
export type GetUtxosArgs = {
    address: BitcoinAddress;
    filter: [UtxosFilter] | [];
};

export const GetUtxosResult = IDL.Record({
    next_page: IDL.Opt(Page),
    tip_block_hash: BlockHash,
    tip_height: IDL.Nat32,
    utxos: IDL.Vec(Utxo)
});
export type GetUtxosResult = {
    next_page: [Page] | [];
    tip_block_hash: BlockHash;
    tip_height: number;
    utxos: Utxo[];
};

export const SendTransactionArgs = IDL.Record({
    transaction: IDL.Vec(IDL.Nat8),
    network: BitcoinNetwork
});
export type SendTransactionArgs = {
    transaction: Uint8Array;
    network: BitcoinNetwork;
};

export const SendTransactionError = IDL.Variant({
    MalformedTransaction: IDL.Null,
    QueueFull: IDL.Null
});
export type SendTransactionError =
    | { MalformedTransaction: null }
    | { QueueFull: null };
