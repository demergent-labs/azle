import {
    Alias,
    blob,
    nat32,
    nat64,
    Opt,
    Record,
    Variant,
    Vec
} from '../../src/lib';

export type BitcoinAddress = Alias<string>;
export type BlockHash = Alias<blob>;

export type GetBalanceArgs = Record<{
    address: BitcoinAddress;
    min_confirmations: Opt<nat32>;
    network: BitcoinNetwork;
}>;

export type GetCurrentFeePercentilesArgs = Record<{
    network: BitcoinNetwork;
}>;

export type GetUtxosArgs = Record<{
    address: BitcoinAddress;
    filter: Opt<UtxosFilter>;
    network: BitcoinNetwork;
}>;

export type GetUtxosResult = Record<{
    next_page: Opt<Page>;
    tip_block_hash: BlockHash;
    tip_height: nat32;
    utxos: Vec<Utxo>;
}>;

export type MillisatoshiPerByte = Alias<nat64>;

export const BitcoinNetwork = {
    Mainnet: { Mainnet: null },
    Regtest: { Regtest: null },
    Testnet: { Testnet: null }
};

export type BitcoinNetwork = Variant<{
    Mainnet: null;
    Regtest: null;
    Testnet: null;
}>;

export type Outpoint = Record<{
    txid: blob;
    vout: nat32;
}>;

export type Page = Alias<blob>;

export type Utxo = Record<{
    height: nat32;
    outpoint: Outpoint;
    value: Satoshi;
}>;

export type UtxosFilter = Variant<{
    MinConfirmations: nat32;
    Page: Page;
}>;

export type Satoshi = Alias<nat64>;

export type SendTransactionArgs = Record<{
    transaction: blob;
    network: BitcoinNetwork;
}>;

export type SendTransactionError = Variant<{
    MalformedTransaction: null;
    QueueFull: null;
}>;
