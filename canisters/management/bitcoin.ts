// TODO I am thinking we should use the same names as ic-btc-types

import {
    blob,
    nat32,
    nat64,
    Null,
    Opt,
    Record,
    text,
    Variant,
    Vec
} from '../../src/lib';

export const BitcoinAddress = text;
export type BitcoinAddress = text;

export const BlockHash = blob;
export type BlockHash = blob;

export const Page = blob;
export type Page = blob;

export const MillisatoshiPerByte = nat64;
export type MillisatoshiPerByte = nat64;

export const Satoshi = nat64;
export type Satoshi = nat64;

export const BitcoinNetwork = Variant({
    Mainnet: Null,
    Regtest: Null,
    Testnet: Null
});
export type BitcoinNetwork = typeof BitcoinNetwork.tsType;

export const Outpoint = Record({
    txid: blob,
    vout: nat32
});
export type Outpoint = typeof Outpoint.tsType;

export const Utxo = Record({
    height: nat32,
    outpoint: Outpoint,
    value: Satoshi
});
export type Utxo = typeof Utxo.tsType;

export const UtxosFilter = Variant({
    MinConfirmations: nat32,
    Page: Page
});
export type UtxosFilter = typeof UtxosFilter.tsType;

export const GetBalanceArgs = Record({
    address: BitcoinAddress,
    min_confirmations: Opt(nat32),
    network: BitcoinNetwork
});
export type GetBalanceArgs = typeof GetBalanceArgs.tsType;

export const GetCurrentFeePercentilesArgs = Record({
    network: BitcoinNetwork
});
export type GetCurrentFeePercentilesArgs =
    typeof GetCurrentFeePercentilesArgs.tsType;

export const GetUtxosArgs = Record({
    address: BitcoinAddress,
    filter: Opt(UtxosFilter),
    network: BitcoinNetwork
});
export type GetUtxosArgs = typeof GetUtxosArgs.tsType;

export const GetUtxosResult = Record({
    next_page: Opt(Page),
    tip_block_hash: BlockHash,
    tip_height: nat32,
    utxos: Vec(Utxo)
});
export type GetUtxosResult = typeof GetUtxosResult.tsType;

export const SendTransactionArgs = Record({
    transaction: blob,
    network: BitcoinNetwork
});
export type SendTransactionArgs = typeof SendTransactionArgs.tsType;

export const SendTransactionError = Variant({
    MalformedTransaction: Null,
    QueueFull: Null
});
export type SendTransactionError = typeof SendTransactionError.tsType;
