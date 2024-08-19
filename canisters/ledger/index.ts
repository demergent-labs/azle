// Some JS docs licensed under:
//
// - https://github.com/dfinity/cdk-rs/blob/main/LICENSE
// - https://github.com/dfinity/interface-spec/blob/master/LICENSE
// - https://github.com/dfinity/portal/blob/master/LICENSE
//
// Some documentation changed from original work.

import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

import * as icrc from '../icrc';

// Amount of tokens, measured in 10^-8 of a token.
export const Tokens = IDL.Record({
    e8s: IDL.Nat64
});
export type Tokens = {
    e8s: bigint;
};

// Number of nanoseconds from the UNIX epoch in UTC timezone.
export const TimeStamp = IDL.Record({
    timestamp_nanos: IDL.Nat64
});
export type TimeStamp = {
    timestamp_nanos: bigint;
};

// AccountIdentifier is a 32-byte array.
// The first 4 bytes is big-endian encoding of a CRC32 checksum of the last 28 bytes.
export const AccountIdentifier = IDL.Vec(IDL.Nat8);
export type AccountIdentifier = Uint8Array;

// Subaccount is an arbitrary 32-byte byte array.
// Ledger uses subaccounts to compute the source address, which enables one
// principal to control multiple ledger accounts.
export const SubAccount = IDL.Vec(IDL.Nat8);
export type SubAccount = Uint8Array;

// Sequence number of a block produced by the ledger.
export const BlockIndex = IDL.Nat64;
export type BlockIndex = bigint;

// An arbitrary number associated with a transaction.
// The caller can set it in a `transfer` call as a correlation identifier.
export const Memo = IDL.Nat64;
export type Memo = bigint;

// Arguments for the `transfer` call.
export const TransferArgs = IDL.Record({
    // Transaction memo.
    // See comments for the `Memo` type.
    memo: Memo,
    // The amount that the caller wants to transfer to the destination address.
    amount: Tokens,
    // The amount that the caller pays for the transaction.
    // Must be 10000 e8s.
    fee: Tokens,
    // The subaccount from which the caller wants to transfer funds.
    // If null, the ledger uses the default (all zeros) subaccount to compute the source address.
    // See comments for the `SubAccount` type.
    from_subaccount: IDL.Opt(SubAccount),
    // The destination account.
    // If the transfer is successful, the balance of this address increases by `amount`.
    to: AccountIdentifier,
    // The point in time when the caller created this request.
    // If null, the ledger uses current IC time as the timestamp.
    created_at_time: IDL.Opt(TimeStamp)
});
export type TransferArgs = {
    memo: Memo;
    amount: Tokens;
    fee: Tokens;
    from_subaccount: [SubAccount] | [];
    to: AccountIdentifier;
    created_at_time: [TimeStamp] | [];
};

export const BadFee = IDL.Record({
    expected_fee: Tokens
});
export type BadFee = {
    expected_fee: Tokens;
};

export const InsufficientFunds = IDL.Record({
    balance: Tokens
});
export type InsufficientFunds = {
    balance: Tokens;
};

export const TxTooOld = IDL.Record({
    allowed_window_nanos: IDL.Nat64
});
export type TxTooOld = {
    allowed_window_nanos: bigint;
};

export const TxDuplicate = IDL.Record({
    duplicate_of: BlockIndex
});
export type TxDuplicate = {
    duplicate_of: BlockIndex;
};

export const TransferError = IDL.Variant({
    // The fee that the caller specified in the transfer request was not the one that ledger expects.
    // The caller can change the transfer fee to the `expected_fee` and retry the request.
    BadFee: BadFee,
    // The account specified by the caller doesn't have enough funds.
    InsufficientFunds: InsufficientFunds,
    // The request is too old.
    // The ledger only accepts requests created within 24 hours window.
    // This is a non-recoverable error.
    TxTooOld: TxTooOld,
    // The caller specified `created_at_time` that is too far in future.
    // The caller can retry the request later.
    TxCreatedInFuture: IDL.Null,
    // The ledger has already executed the request.
    // `duplicate_of` field is equal to the index of the block containing the original transaction.
    TxDuplicate: TxDuplicate
});
export type TransferError =
    | {
          BadFee: BadFee;
      }
    | {
          InsufficientFunds: InsufficientFunds;
      }
    | {
          TxTooOld: TxTooOld;
      }
    | {
          TxCreatedInFuture: null;
      }
    | {
          TxDuplicate: TxDuplicate;
      };

export const TransferResult = IDL.Variant({
    Ok: IDL.Nat64,
    Err: TransferError
});
export type TransferResult =
    | {
          Ok: bigint;
      }
    | {
          Err: TransferError;
      };

// Arguments for the `account_balance` call.
export const AccountBalanceArgs = IDL.Record({
    account: AccountIdentifier
});
export type AccountBalanceArgs = {
    account: AccountIdentifier;
};

export const TransferFeeArg = IDL.Record({});
export type TransferFeeArg = Record<string, never>;

export const TransferFee = IDL.Record({
    // The fee to pay to perform a transfer
    transfer_fee: Tokens
});
export type TransferFee = {
    transfer_fee: Tokens;
};

export const GetBlocksArgs = IDL.Record({
    // The index of the first block to fetch.
    start: BlockIndex,
    // Max number of blocks to fetch.
    length: IDL.Nat64
});
export type GetBlocksArgs = {
    start: BlockIndex;
    length: bigint;
};

export const Mint = IDL.Record({
    to: AccountIdentifier,
    amount: Tokens
});
export type Mint = {
    to: AccountIdentifier;
    amount: Tokens;
};

export const Burn = IDL.Record({
    from: AccountIdentifier,
    amount: Tokens
});
export type Burn = {
    from: AccountIdentifier;
    amount: Tokens;
};

export const Transfer = IDL.Record({
    from: AccountIdentifier,
    to: AccountIdentifier,
    amount: Tokens,
    fee: Tokens
});
export type Transfer = {
    from: AccountIdentifier;
    to: AccountIdentifier;
    amount: Tokens;
    fee: Tokens;
};

export const Operation = IDL.Variant({
    Mint: Mint,
    Burn: Burn,
    Transfer: Transfer
});
export type Operation =
    | {
          Mint: Mint;
      }
    | {
          Burn: Burn;
      }
    | {
          Transfer: Transfer;
      };

export const Transaction = IDL.Record({
    memo: Memo,
    operation: IDL.Opt(Operation),
    created_at_time: TimeStamp
});
export type Transaction = {
    memo: Memo;
    operation: Operation | null;
    created_at_time: TimeStamp;
};

export const Block = IDL.Record({
    parent_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
    transaction: Transaction,
    timestamp: TimeStamp
});
export type Block = {
    parent_hash: Uint8Array | null;
    transaction: Transaction;
    timestamp: TimeStamp;
};

// A prefix of the block range specified in the [GetBlocksArgs] request.
export const BlockRange = IDL.Record({
    // A prefix of the requested block range.
    // The index of the first block is equal to [GetBlocksArgs.from].
    //
    // Note that the number of blocks might be less than the requested
    // [GetBlocksArgs.len] for various reasons, for example:
    //
    // 1. The query might have hit the replica with an outdated state
    //    that doesn't have the full block range yet.
    // 2. The requested range is too large to fit into a single reply.
    //
    // NOTE: the list of blocks can be empty if:
    // 1. [GetBlocksArgs.len] was zero.
    // 2. [GetBlocksArgs.from] was larger than the last block known to the canister.
    blocks: IDL.Vec(Block)
});
export type BlockRange = {
    blocks: Block[];
};

export const BadFirstBlockIndex = IDL.Record({
    requested_index: BlockIndex,
    first_valid_index: BlockIndex
});
export type BadFirstBlockIndex = {
    requested_index: BlockIndex;
    first_valid_index: BlockIndex;
};

export const Other = IDL.Record({
    error_code: IDL.Nat64,
    error_message: IDL.Text
});
export type Other = {
    error_code: bigint;
    error_message: string;
};

// An error indicating that the arguments passed to [QueryArchiveFn] were invalid.
export const QueryArchiveError = IDL.Variant({
    // [GetBlocksArgs.from] argument was smaller than the first block
    // served by the canister that received the request.
    BadFirstBlockIndex: BadFirstBlockIndex,
    // Reserved for future use.
    Other: Other
});
export type QueryArchiveError =
    | {
          BadFirstBlockIndex?: BadFirstBlockIndex;
      }
    | {
          Other?: Other;
      };

export const QueryArchiveResult = IDL.Variant({
    // Successfully fetched zero or more blocks.
    Ok: BlockRange,
    // The [GetBlocksArgs] request was invalid.
    Err: QueryArchiveError
});
export type QueryArchiveResult =
    | {
          Ok: BlockRange;
      }
    | {
          Err: QueryArchiveError;
      };

// A function that is used for fetching archived ledger blocks.
export const QueryArchiveFn = IDL.Func(
    [GetBlocksArgs],
    [QueryArchiveResult],
    ['query']
);
export type QueryArchiveFn = (
    args: GetBlocksArgs
) => Promise<QueryArchiveResult>;

export const ArchivedBlock = IDL.Record({
    // The index of the first archived block that can be fetched using the callback.
    start: BlockIndex,
    // The number of blocks that can be fetch using the callback.
    length: IDL.Nat64,
    // The function that should be called to fetch the archived blocks.
    // The range of the blocks accessible using this function is given by [from]
    // and [len] fields above.
    callback: QueryArchiveFn
});
export type ArchivedBlock = {
    start: BlockIndex;
    length: bigint;
    callback: QueryArchiveFn;
};

// The result of a "query_blocks" call.
//
// The structure of the result is somewhat complicated because the main ledger canister might
// not have all the blocks that the caller requested: One or more "archive" canisters might
// store some of the requested blocks.
//
// Note: as of Q4 2021 when this interface is authored, the IC doesn't support making nested
// query calls within a query call.
export const QueryBlocksResponse = IDL.Record({
    // The total number of blocks in the chain.
    // If the chain length is positive, the index of the last block is `chain_len - 1`.
    chain_length: IDL.Nat64,
    // System certificate for the hash of the latest block in the chain.
    // Only present if `query_blocks` is called in a non-replicated query conIDL.Text.
    certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
    // List of blocks that were available in the ledger when it processed the call.
    //
    // The blocks form a contiguous range, with the first block having index
    // [first_block_index] (see below), and the last block having index
    // [first_block_index] + len(blocks) - 1.
    //
    // The block range can be an arbitrary sub-range of the originally requested range.
    blocks: IDL.Vec(Block),
    // The index of the first block in "blocks".
    // If the blocks vector is empty, the exact value of this field is not specified.
    first_block_index: BlockIndex,
    // Encoding of instructions for fetching archived blocks whose indices fall into the
    // requested range.
    //
    // For each entry `e` in [archived_blocks], `[e.from, e.from + len)` is a sub-range
    // of the originally requested block range.
    archived_blocks: IDL.Vec(ArchivedBlock)
});
export type QueryBlocksResponse = {
    chain_length: bigint;
    certificate: Uint8Array | null;
    blocks: Block[];
    first_block_index: BlockIndex;
    archived_blocks: ArchivedBlock[];
};

export const Archive = IDL.Record({
    canister_id: IDL.Principal
});
export type Archive = {
    canister_id: Principal;
};

export const Archives = IDL.Record({
    archives: IDL.Vec(Archive)
});
export type Archives = {
    archives: Archive[];
};

export const SymbolResult = IDL.Record({
    symbol: IDL.Text
});
export type SymbolResult = {
    symbol: string;
};

export const NameResult = IDL.Record({
    name: IDL.Text
});
export type NameResult = {
    name: string;
};

export const DecimalsResult = IDL.Record({
    decimals: IDL.Nat32
});
export type DecimalsResult = {
    decimals: number;
};

export const Address = IDL.Text;
export type Address = string;

export const Ledger = IDL.Service({
    // Transfers tokens from a subaccount of the caller to the destination address.
    // The source address is computed from the principal of the caller and the specified subaccount.
    // When successful, returns the index of the block containing the transaction.
    transfer: IDL.Func([TransferArgs], [TransferResult]),
    // Returns the amount of Tokens on the specified account.
    account_balance: IDL.Func([AccountBalanceArgs], [Tokens], ['query']),
    // Returns the current transfer_fee.
    transfer_fee: IDL.Func([TransferFeeArg], [TransferFee], ['query']),
    // Queries blocks in the specified range.
    query_blocks: IDL.Func([GetBlocksArgs], [QueryBlocksResponse], ['query']),
    // Returns token symbol.
    symbol: IDL.Func([], [SymbolResult], ['query']),
    // Returns token name.
    name: IDL.Func([], [NameResult], ['query']),
    // Returns token decimals.
    decimals: IDL.Func([], [DecimalsResult], ['query']),
    // Returns the existing archive canisters information.
    archives: IDL.Func([], [Archives], ['query']),
    icrc1_metadata: IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, icrc.Value))],
        ['query']
    ),
    icrc1_name: IDL.Func([], [IDL.Text], ['query']),
    icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
    icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
    icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
    icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
    icrc1_minting_account: IDL.Func([], [IDL.Opt(icrc.Account)], ['query']),
    icrc1_balance_of: IDL.Func([icrc.Account], [IDL.Nat], ['query']),
    icrc1_transfer: IDL.Func([icrc.TransferArgs], [icrc.TransferResult]),
    icrc1_supported_standards: IDL.Func(
        [],
        [IDL.Vec(icrc.SupportedStandard)],
        ['query']
    )
});

export {
    binaryAddressFromAddress,
    binaryAddressFromPrincipal,
    hexAddressFromPrincipal
} from './address';
