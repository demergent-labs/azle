import {
    Alias,
    blob,
    CallResult,
    Func,
    nat32,
    nat64,
    Opt,
    Principal,
    Query,
    Record,
    Service,
    serviceQuery,
    serviceUpdate,
    Variant,
    Vec
} from '../../src/lib';

// Amount of tokens, measured in 10^-8 of a token.
export type Tokens = Record<{
    e8s: nat64;
}>;

// Number of nanoseconds from the UNIX epoch in UTC timezone.
export type TimeStamp = Record<{
    timestamp_nanos: nat64;
}>;

// AccountIdentifier is a 32-byte array.
// The first 4 bytes is big-endian encoding of a CRC32 checksum of the last 28 bytes.
export type AccountIdentifier = Alias<blob>;

// Subaccount is an arbitrary 32-byte byte array.
// Ledger uses subaccounts to compute the source address, which enables one
// principal to control multiple ledger accounts.
export type SubAccount = Alias<blob>;

// Sequence number of a block produced by the ledger.
export type BlockIndex = Alias<nat64>;

// An arbitrary number associated with a transaction.
// The caller can set it in a `transfer` call as a correlation identifier.
export type Memo = Alias<nat64>;

// Arguments for the `transfer` call.
export type TransferArgs = Record<{
    // Transaction memo.
    // See comments for the `Memo` type.
    memo: Memo;
    // The amount that the caller wants to transfer to the destination address.
    amount: Tokens;
    // The amount that the caller pays for the transaction.
    // Must be 10000 e8s.
    fee: Tokens;
    // The subaccount from which the caller wants to transfer funds.
    // If null, the ledger uses the default (all zeros) subaccount to compute the source address.
    // See comments for the `SubAccount` type.
    from_subaccount: Opt<SubAccount>;
    // The destination account.
    // If the transfer is successful, the balance of this address increases by `amount`.
    to: AccountIdentifier;
    // The point in time when the caller created this request.
    // If null, the ledger uses current IC time as the timestamp.
    created_at_time: Opt<TimeStamp>;
}>;

export type TransferError = Variant<{
    // The fee that the caller specified in the transfer request was not the one that ledger expects.
    // The caller can change the transfer fee to the `expected_fee` and retry the request.
    BadFee: Record<{
        expected_fee: Tokens;
    }>;
    // The account specified by the caller doesn't have enough funds.
    InsufficientFunds: Record<{
        balance: Tokens;
    }>;
    // The request is too old.
    // The ledger only accepts requests created within 24 hours window.
    // This is a non-recoverable error.
    TxTooOld: Record<{
        allowed_window_nanos: nat64;
    }>;
    // The caller specified `created_at_time` that is too far in future.
    // The caller can retry the request later.
    TxCreatedInFuture: null;
    // The ledger has already executed the request.
    // `duplicate_of` field is equal to the index of the block containing the original transaction.
    TxDuplicate: Record<{
        duplicate_of: BlockIndex;
    }>;
}>;

export type TransferResult = Variant<{
    Ok: nat64;
    Err: TransferError;
}>;

// Arguments for the `account_balance` call.
export type AccountBalanceArgs = Record<{
    account: AccountIdentifier;
}>;

export type TransferFeeArg = Record<{}>;

export type TransferFee = Record<{
    // The fee to pay to perform a transfer
    transfer_fee: Tokens;
}>;

export type GetBlocksArgs = Record<{
    // The index of the first block to fetch.
    start: BlockIndex;
    // Max number of blocks to fetch.
    length: nat64;
}>;

export type Operation = Variant<{
    Mint: Record<{
        to: AccountIdentifier;
        amount: Tokens;
    }>;
    Burn: Record<{
        from: AccountIdentifier;
        amount: Tokens;
    }>;
    Transfer: Record<{
        from: AccountIdentifier;
        to: AccountIdentifier;
        amount: Tokens;
        fee: Tokens;
    }>;
}>;

export type Transaction = Record<{
    memo: Memo;
    operation: Opt<Operation>;
    created_at_time: TimeStamp;
}>;

export type Block = Record<{
    parent_hash: Opt<blob>;
    transaction: Transaction;
    timestamp: TimeStamp;
}>;

// A prefix of the block range specified in the [GetBlocksArgs] request.
export type BlockRange = Record<{
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
    blocks: Vec<Block>;
}>;

// An error indicating that the arguments passed to [QueryArchiveFn] were invalid.
export type QueryArchiveError = Variant<{
    // [GetBlocksArgs.from] argument was smaller than the first block
    // served by the canister that received the request.
    BadFirstBlockIndex: Record<{
        requested_index: BlockIndex;
        first_valid_index: BlockIndex;
    }>;

    // Reserved for future use.
    Other: Record<{
        error_code: nat64;
        error_message: string;
    }>;
}>;

export type QueryArchiveResult = Variant<{
    // Successfully fetched zero or more blocks.
    Ok: BlockRange;
    // The [GetBlocksArgs] request was invalid.
    Err: QueryArchiveError;
}>;

// A function that is used for fetching archived ledger blocks.
type QueryArchiveFn = Func<
    Query<(get_blocks_args: GetBlocksArgs) => QueryArchiveResult>
>;

// The result of a "query_blocks" call.
//
// The structure of the result is somewhat complicated because the main ledger canister might
// not have all the blocks that the caller requested: One or more "archive" canisters might
// store some of the requested blocks.
//
// Note: as of Q4 2021 when this interface is authored, the IC doesn't support making nested
// query calls within a query call.
export type QueryBlocksResponse = Record<{
    // The total number of blocks in the chain.
    // If the chain length is positive, the index of the last block is `chain_len - 1`.
    chain_length: nat64;

    // System certificate for the hash of the latest block in the chain.
    // Only present if `query_blocks` is called in a non-replicated query context.
    certificate: Opt<blob>;

    // List of blocks that were available in the ledger when it processed the call.
    //
    // The blocks form a contiguous range, with the first block having index
    // [first_block_index] (see below), and the last block having index
    // [first_block_index] + len(blocks) - 1.
    //
    // The block range can be an arbitrary sub-range of the originally requested range.
    blocks: Vec<Block>;

    // The index of the first block in "blocks".
    // If the blocks vector is empty, the exact value of this field is not specified.
    first_block_index: BlockIndex;

    // Encoding of instructions for fetching archived blocks whose indices fall into the
    // requested range.
    //
    // For each entry `e` in [archived_blocks], `[e.from, e.from + len)` is a sub-range
    // of the originally requested block range.
    archived_blocks: Vec<
        Record<{
            // The index of the first archived block that can be fetched using the callback.
            start: BlockIndex;

            // The number of blocks that can be fetch using the callback.
            length: nat64;

            // The function that should be called to fetch the archived blocks.
            // The range of the blocks accessible using this function is given by [from]
            // and [len] fields above.
            callback: QueryArchiveFn;
        }>
    >;
}>;

export type Archive = Record<{
    canister_id: Principal;
}>;

export type Archives = Record<{
    archives: Vec<Archive>;
}>;

export type SymbolResult = Record<{
    symbol: string;
}>;

export type NameResult = Record<{
    name: string;
}>;

export type DecimalsResult = Record<{
    decimals: nat32;
}>;

export type Address = Alias<string>;

export class Ledger extends Service {
    // Transfers tokens from a subaccount of the caller to the destination address.
    // The source address is computed from the principal of the caller and the specified subaccount.
    // When successful, returns the index of the block containing the transaction.
    @serviceUpdate
    transfer: (transfer_args: TransferArgs) => CallResult<TransferResult>;

    // Returns the amount of Tokens on the specified account.
    @serviceQuery
    account_balance: (
        accountBalanceArgs: AccountBalanceArgs
    ) => CallResult<Tokens>;

    // Returns the current transfer_fee.
    @serviceQuery
    transfer_fee: (transfer_fee_arg: TransferFeeArg) => CallResult<TransferFee>;

    // Queries blocks in the specified range.
    @serviceQuery
    query_blocks: (
        get_blocks_args: GetBlocksArgs
    ) => CallResult<QueryBlocksResponse>;

    // Returns token symbol.
    @serviceQuery
    symbol: () => CallResult<SymbolResult>;

    // Returns token name.
    @serviceQuery
    name: () => CallResult<NameResult>;

    // Returns token decimals.
    @serviceQuery
    decimals: () => CallResult<DecimalsResult>;

    // Returns the existing archive canisters information.
    @serviceQuery
    archives: () => CallResult<Archives>;
}

export {
    binaryAddressFromAddress,
    binaryAddressFromPrincipal,
    hexAddressFromPrincipal
} from './address';
