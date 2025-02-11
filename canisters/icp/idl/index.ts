import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export interface Account {
    owner: Principal;
    subaccount: [] | [SubAccount];
}
export interface AccountBalanceArgs {
    account: AccountIdentifier;
}
export interface AccountBalanceArgsDfx {
    account: TextAccountIdentifier;
}
export type AccountIdentifier = Uint8Array | number[];
export interface Allowance {
    allowance: Icrc1Tokens;
    expires_at: [] | [Icrc1Timestamp];
}
export interface AllowanceArgs {
    account: Account;
    spender: Account;
}
export interface ApproveArgs {
    fee: [] | [Icrc1Tokens];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [SubAccount];
    created_at_time: [] | [Icrc1Timestamp];
    amount: Icrc1Tokens;
    expected_allowance: [] | [Icrc1Tokens];
    expires_at: [] | [Icrc1Timestamp];
    spender: Account;
}
export type ApproveError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { Duplicate: { duplicate_of: Icrc1BlockIndex } }
    | { BadFee: { expected_fee: Icrc1Tokens } }
    | { AllowanceChanged: { current_allowance: Icrc1Tokens } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { Expired: { ledger_time: bigint } }
    | { InsufficientFunds: { balance: Icrc1Tokens } };
export type ApproveResult = { Ok: Icrc1BlockIndex } | { Err: ApproveError };
export interface Archive {
    canister_id: Principal;
}
export interface ArchiveOptions {
    num_blocks_to_archive: bigint;
    max_transactions_per_response: [] | [bigint];
    trigger_threshold: bigint;
    more_controller_ids: [] | [Array<Principal>];
    max_message_size_bytes: [] | [bigint];
    cycles_for_archive_creation: [] | [bigint];
    node_max_memory_size_bytes: [] | [bigint];
    controller_id: Principal;
}
export interface ArchivedBlocksRange {
    callback: QueryArchiveFn;
    start: BlockIndex;
    length: bigint;
}
export interface ArchivedEncodedBlocksRange {
    callback: [Principal, string];
    start: bigint;
    length: bigint;
}
export interface Archives {
    archives: Array<Archive>;
}
export interface Block {
    transaction: Transaction;
    timestamp: TimeStamp;
    parent_hash: [] | [Uint8Array | number[]];
}
export type BlockIndex = bigint;
export interface BlockRange {
    blocks: Array<Block>;
}
export interface DecimalsResult {
    decimals: number;
}
export interface Duration {
    secs: bigint;
    nanos: number;
}
export interface FeatureFlags {
    icrc2: boolean;
}
export interface GetBlocksArgs {
    start: BlockIndex;
    length: bigint;
}
export type Icrc1BlockIndex = bigint;
export type Icrc1Timestamp = bigint;
export type Icrc1Tokens = bigint;
export type Icrc1TransferError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { BadBurn: { min_burn_amount: Icrc1Tokens } }
    | { Duplicate: { duplicate_of: Icrc1BlockIndex } }
    | { BadFee: { expected_fee: Icrc1Tokens } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: Icrc1Tokens } };
export type Icrc1TransferResult =
    | { Ok: Icrc1BlockIndex }
    | { Err: Icrc1TransferError };
export interface InitArgs {
    send_whitelist: Array<Principal>;
    token_symbol: [] | [string];
    transfer_fee: [] | [Tokens];
    minting_account: TextAccountIdentifier;
    maximum_number_of_accounts: [] | [bigint];
    accounts_overflow_trim_quantity: [] | [bigint];
    transaction_window: [] | [Duration];
    max_message_size_bytes: [] | [bigint];
    icrc1_minting_account: [] | [Account];
    archive_options: [] | [ArchiveOptions];
    initial_values: Array<[TextAccountIdentifier, Tokens]>;
    token_name: [] | [string];
    feature_flags: [] | [FeatureFlags];
}
export type LedgerCanisterPayload =
    | { Upgrade: [] | [UpgradeArgs] }
    | { Init: InitArgs };
export type Memo = bigint;
export interface NameResult {
    name: string;
}
export type Operation =
    | {
          Approve: {
              fee: Tokens;
              from: AccountIdentifier;
              allowance_e8s: bigint;
              allowance: Tokens;
              expected_allowance: [] | [Tokens];
              expires_at: [] | [TimeStamp];
              spender: AccountIdentifier;
          };
      }
    | {
          Burn: {
              from: AccountIdentifier;
              amount: Tokens;
              spender: [] | [AccountIdentifier];
          };
      }
    | { Mint: { to: AccountIdentifier; amount: Tokens } }
    | {
          Transfer: {
              to: AccountIdentifier;
              fee: Tokens;
              from: AccountIdentifier;
              amount: Tokens;
              spender: [] | [Uint8Array | number[]];
          };
      };
export type QueryArchiveError =
    | {
          BadFirstBlockIndex: {
              requested_index: BlockIndex;
              first_valid_index: BlockIndex;
          };
      }
    | { Other: { error_message: string; error_code: bigint } };
export type QueryArchiveFn = ActorMethod<[GetBlocksArgs], QueryArchiveResult>;
export type QueryArchiveResult =
    | { Ok: BlockRange }
    | { Err: QueryArchiveError };
export interface QueryBlocksResponse {
    certificate: [] | [Uint8Array | number[]];
    blocks: Array<Block>;
    chain_length: bigint;
    first_block_index: BlockIndex;
    archived_blocks: Array<ArchivedBlocksRange>;
}
export interface QueryEncodedBlocksResponse {
    certificate: [] | [Uint8Array | number[]];
    blocks: Array<Uint8Array | number[]>;
    chain_length: bigint;
    first_block_index: bigint;
    archived_blocks: Array<ArchivedEncodedBlocksRange>;
}
export interface SendArgs {
    to: TextAccountIdentifier;
    fee: Tokens;
    memo: Memo;
    from_subaccount: [] | [SubAccount];
    created_at_time: [] | [TimeStamp];
    amount: Tokens;
}
export type SubAccount = Uint8Array | number[];
export interface SymbolResult {
    symbol: string;
}
export type TextAccountIdentifier = string;
export interface TimeStamp {
    timestamp_nanos: bigint;
}
export interface Tokens {
    e8s: bigint;
}
export interface Transaction {
    memo: Memo;
    icrc1_memo: [] | [Uint8Array | number[]];
    operation: [] | [Operation];
    created_at_time: TimeStamp;
}
export interface TransferArg {
    to: Account;
    fee: [] | [Icrc1Tokens];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [SubAccount];
    created_at_time: [] | [Icrc1Timestamp];
    amount: Icrc1Tokens;
}
export interface TransferArgs {
    to: AccountIdentifier;
    fee: Tokens;
    memo: Memo;
    from_subaccount: [] | [SubAccount];
    created_at_time: [] | [TimeStamp];
    amount: Tokens;
}
export type TransferError =
    | {
          TxTooOld: { allowed_window_nanos: bigint };
      }
    | { BadFee: { expected_fee: Tokens } }
    | { TxDuplicate: { duplicate_of: BlockIndex } }
    | { TxCreatedInFuture: null }
    | { InsufficientFunds: { balance: Tokens } };
export interface TransferFee {
    transfer_fee: Tokens;
}
// eslint-disable-next-line
export type TransferFeeArg = {};
export interface TransferFromArgs {
    to: Account;
    fee: [] | [Icrc1Tokens];
    spender_subaccount: [] | [SubAccount];
    from: Account;
    memo: [] | [Uint8Array | number[]];
    created_at_time: [] | [Icrc1Timestamp];
    amount: Icrc1Tokens;
}
export type TransferFromError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { InsufficientAllowance: { allowance: Icrc1Tokens } }
    | { BadBurn: { min_burn_amount: Icrc1Tokens } }
    | { Duplicate: { duplicate_of: Icrc1BlockIndex } }
    | { BadFee: { expected_fee: Icrc1Tokens } }
    | { CreatedInFuture: { ledger_time: Icrc1Timestamp } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: Icrc1Tokens } };
export type TransferFromResult =
    | { Ok: Icrc1BlockIndex }
    | { Err: TransferFromError };
export type TransferResult = { Ok: BlockIndex } | { Err: TransferError };
export interface UpgradeArgs {
    icrc1_minting_account: [] | [Account];
    feature_flags: [] | [FeatureFlags];
}
export type Value =
    | { Int: bigint }
    | { Nat: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string };
export interface icrc21_consent_info {
    metadata: icrc21_consent_message_metadata;
    consent_message: icrc21_consent_message;
}
export type icrc21_consent_message =
    | {
          LineDisplayMessage: { pages: Array<{ lines: Array<string> }> };
      }
    | { GenericDisplayMessage: string };
export interface icrc21_consent_message_metadata {
    utc_offset_minutes: [] | [number];
    language: string;
}
export interface icrc21_consent_message_request {
    arg: Uint8Array | number[];
    method: string;
    user_preferences: icrc21_consent_message_spec;
}
export type icrc21_consent_message_response =
    | { Ok: icrc21_consent_info }
    | { Err: icrc21_error };
export interface icrc21_consent_message_spec {
    metadata: icrc21_consent_message_metadata;
    device_spec:
        | []
        | [
              | { GenericDisplay: null }
              | {
                    LineDisplay: {
                        characters_per_line: number;
                        lines_per_page: number;
                    };
                }
          ];
}
export type icrc21_error =
    | {
          GenericError: { description: string; error_code: bigint };
      }
    | { InsufficientPayment: icrc21_error_info }
    | { UnsupportedCanisterCall: icrc21_error_info }
    | { ConsentMessageUnavailable: icrc21_error_info };
export interface icrc21_error_info {
    description: string;
}
export interface _SERVICE {
    account_balance: ActorMethod<[AccountBalanceArgs], Tokens>;
    account_balance_dfx: ActorMethod<[AccountBalanceArgsDfx], Tokens>;
    account_identifier: ActorMethod<[Account], AccountIdentifier>;
    archives: ActorMethod<[], Archives>;
    decimals: ActorMethod<[], DecimalsResult>;
    icrc10_supported_standards: ActorMethod<
        [],
        Array<{ url: string; name: string }>
    >;
    icrc1_balance_of: ActorMethod<[Account], Icrc1Tokens>;
    icrc1_decimals: ActorMethod<[], number>;
    icrc1_fee: ActorMethod<[], Icrc1Tokens>;
    icrc1_metadata: ActorMethod<[], Array<[string, Value]>>;
    icrc1_minting_account: ActorMethod<[], [] | [Account]>;
    icrc1_name: ActorMethod<[], string>;
    icrc1_supported_standards: ActorMethod<
        [],
        Array<{ url: string; name: string }>
    >;
    icrc1_symbol: ActorMethod<[], string>;
    icrc1_total_supply: ActorMethod<[], Icrc1Tokens>;
    icrc1_transfer: ActorMethod<[TransferArg], Icrc1TransferResult>;
    icrc21_canister_call_consent_message: ActorMethod<
        [icrc21_consent_message_request],
        icrc21_consent_message_response
    >;
    icrc2_allowance: ActorMethod<[AllowanceArgs], Allowance>;
    icrc2_approve: ActorMethod<[ApproveArgs], ApproveResult>;
    icrc2_transfer_from: ActorMethod<[TransferFromArgs], TransferFromResult>;
    is_ledger_ready: ActorMethod<[], boolean>;
    name: ActorMethod<[], NameResult>;
    query_blocks: ActorMethod<[GetBlocksArgs], QueryBlocksResponse>;
    query_encoded_blocks: ActorMethod<
        [GetBlocksArgs],
        QueryEncodedBlocksResponse
    >;
    send_dfx: ActorMethod<[SendArgs], BlockIndex>;
    symbol: ActorMethod<[], SymbolResult>;
    transfer: ActorMethod<[TransferArgs], TransferResult>;
    transfer_fee: ActorMethod<[TransferFeeArg], TransferFee>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const SubAccount = IDL.Vec(IDL.Nat8);
export const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(SubAccount)
});
export const FeatureFlags = IDL.Record({ icrc2: IDL.Bool });
export const UpgradeArgs = IDL.Record({
    icrc1_minting_account: IDL.Opt(Account),
    feature_flags: IDL.Opt(FeatureFlags)
});
export const Tokens = IDL.Record({ e8s: IDL.Nat64 });
export const TextAccountIdentifier = IDL.Text;
export const Duration = IDL.Record({ secs: IDL.Nat64, nanos: IDL.Nat32 });
export const ArchiveOptions = IDL.Record({
    num_blocks_to_archive: IDL.Nat64,
    max_transactions_per_response: IDL.Opt(IDL.Nat64),
    trigger_threshold: IDL.Nat64,
    more_controller_ids: IDL.Opt(IDL.Vec(IDL.Principal)),
    max_message_size_bytes: IDL.Opt(IDL.Nat64),
    cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
    node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
    controller_id: IDL.Principal
});
export const InitArgs = IDL.Record({
    send_whitelist: IDL.Vec(IDL.Principal),
    token_symbol: IDL.Opt(IDL.Text),
    transfer_fee: IDL.Opt(Tokens),
    minting_account: TextAccountIdentifier,
    maximum_number_of_accounts: IDL.Opt(IDL.Nat64),
    accounts_overflow_trim_quantity: IDL.Opt(IDL.Nat64),
    transaction_window: IDL.Opt(Duration),
    max_message_size_bytes: IDL.Opt(IDL.Nat64),
    icrc1_minting_account: IDL.Opt(Account),
    archive_options: IDL.Opt(ArchiveOptions),
    initial_values: IDL.Vec(IDL.Tuple(TextAccountIdentifier, Tokens)),
    token_name: IDL.Opt(IDL.Text),
    feature_flags: IDL.Opt(FeatureFlags)
});
export const LedgerCanisterPayload = IDL.Variant({
    Upgrade: IDL.Opt(UpgradeArgs),
    Init: InitArgs
});
export const AccountIdentifier = IDL.Vec(IDL.Nat8);
export const AccountBalanceArgs = IDL.Record({ account: AccountIdentifier });
export const AccountBalanceArgsDfx = IDL.Record({
    account: TextAccountIdentifier
});
export const Archive = IDL.Record({ canister_id: IDL.Principal });
export const Archives = IDL.Record({ archives: IDL.Vec(Archive) });
export const DecimalsResult = IDL.Record({ decimals: IDL.Nat32 });
export const Icrc1Tokens = IDL.Nat;
export const Value = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text
});
export const Icrc1Timestamp = IDL.Nat64;
export const TransferArg = IDL.Record({
    to: Account,
    fee: IDL.Opt(Icrc1Tokens),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(SubAccount),
    created_at_time: IDL.Opt(Icrc1Timestamp),
    amount: Icrc1Tokens
});
export const Icrc1BlockIndex = IDL.Nat;
export const Icrc1TransferError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: Icrc1Tokens }),
    Duplicate: IDL.Record({ duplicate_of: Icrc1BlockIndex }),
    BadFee: IDL.Record({ expected_fee: Icrc1Tokens }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: Icrc1Tokens })
});
export const Icrc1TransferResult = IDL.Variant({
    Ok: Icrc1BlockIndex,
    Err: Icrc1TransferError
});
export const icrc21_consent_message_metadata = IDL.Record({
    utc_offset_minutes: IDL.Opt(IDL.Int16),
    language: IDL.Text
});
export const icrc21_consent_message_spec = IDL.Record({
    metadata: icrc21_consent_message_metadata,
    device_spec: IDL.Opt(
        IDL.Variant({
            GenericDisplay: IDL.Null,
            LineDisplay: IDL.Record({
                characters_per_line: IDL.Nat16,
                lines_per_page: IDL.Nat16
            })
        })
    )
});
export const icrc21_consent_message_request = IDL.Record({
    arg: IDL.Vec(IDL.Nat8),
    method: IDL.Text,
    user_preferences: icrc21_consent_message_spec
});
export const icrc21_consent_message = IDL.Variant({
    LineDisplayMessage: IDL.Record({
        pages: IDL.Vec(IDL.Record({ lines: IDL.Vec(IDL.Text) }))
    }),
    GenericDisplayMessage: IDL.Text
});
export const icrc21_consent_info = IDL.Record({
    metadata: icrc21_consent_message_metadata,
    consent_message: icrc21_consent_message
});
export const icrc21_error_info = IDL.Record({ description: IDL.Text });
export const icrc21_error = IDL.Variant({
    GenericError: IDL.Record({
        description: IDL.Text,
        error_code: IDL.Nat
    }),
    InsufficientPayment: icrc21_error_info,
    UnsupportedCanisterCall: icrc21_error_info,
    ConsentMessageUnavailable: icrc21_error_info
});
export const icrc21_consent_message_response = IDL.Variant({
    Ok: icrc21_consent_info,
    Err: icrc21_error
});
export const AllowanceArgs = IDL.Record({
    account: Account,
    spender: Account
});
export const Allowance = IDL.Record({
    allowance: Icrc1Tokens,
    expires_at: IDL.Opt(Icrc1Timestamp)
});
export const ApproveArgs = IDL.Record({
    fee: IDL.Opt(Icrc1Tokens),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(SubAccount),
    created_at_time: IDL.Opt(Icrc1Timestamp),
    amount: Icrc1Tokens,
    expected_allowance: IDL.Opt(Icrc1Tokens),
    expires_at: IDL.Opt(Icrc1Timestamp),
    spender: Account
});
export const ApproveError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    Duplicate: IDL.Record({ duplicate_of: Icrc1BlockIndex }),
    BadFee: IDL.Record({ expected_fee: Icrc1Tokens }),
    AllowanceChanged: IDL.Record({ current_allowance: Icrc1Tokens }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    Expired: IDL.Record({ ledger_time: IDL.Nat64 }),
    InsufficientFunds: IDL.Record({ balance: Icrc1Tokens })
});
export const ApproveResult = IDL.Variant({
    Ok: Icrc1BlockIndex,
    Err: ApproveError
});
export const TransferFromArgs = IDL.Record({
    to: Account,
    fee: IDL.Opt(Icrc1Tokens),
    spender_subaccount: IDL.Opt(SubAccount),
    from: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(Icrc1Timestamp),
    amount: Icrc1Tokens
});
export const TransferFromError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    InsufficientAllowance: IDL.Record({ allowance: Icrc1Tokens }),
    BadBurn: IDL.Record({ min_burn_amount: Icrc1Tokens }),
    Duplicate: IDL.Record({ duplicate_of: Icrc1BlockIndex }),
    BadFee: IDL.Record({ expected_fee: Icrc1Tokens }),
    CreatedInFuture: IDL.Record({ ledger_time: Icrc1Timestamp }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: Icrc1Tokens })
});
export const TransferFromResult = IDL.Variant({
    Ok: Icrc1BlockIndex,
    Err: TransferFromError
});
export const NameResult = IDL.Record({ name: IDL.Text });
export const BlockIndex = IDL.Nat64;
export const GetBlocksArgs = IDL.Record({
    start: BlockIndex,
    length: IDL.Nat64
});
export const Memo = IDL.Nat64;
export const TimeStamp = IDL.Record({ timestamp_nanos: IDL.Nat64 });
export const Operation = IDL.Variant({
    Approve: IDL.Record({
        fee: Tokens,
        from: AccountIdentifier,
        allowance_e8s: IDL.Int,
        allowance: Tokens,
        expected_allowance: IDL.Opt(Tokens),
        expires_at: IDL.Opt(TimeStamp),
        spender: AccountIdentifier
    }),
    Burn: IDL.Record({
        from: AccountIdentifier,
        amount: Tokens,
        spender: IDL.Opt(AccountIdentifier)
    }),
    Mint: IDL.Record({ to: AccountIdentifier, amount: Tokens }),
    Transfer: IDL.Record({
        to: AccountIdentifier,
        fee: Tokens,
        from: AccountIdentifier,
        amount: Tokens,
        spender: IDL.Opt(IDL.Vec(IDL.Nat8))
    })
});
export const Transaction = IDL.Record({
    memo: Memo,
    icrc1_memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    operation: IDL.Opt(Operation),
    created_at_time: TimeStamp
});
export const Block = IDL.Record({
    transaction: Transaction,
    timestamp: TimeStamp,
    parent_hash: IDL.Opt(IDL.Vec(IDL.Nat8))
});
export const BlockRange = IDL.Record({ blocks: IDL.Vec(Block) });
export const QueryArchiveError = IDL.Variant({
    BadFirstBlockIndex: IDL.Record({
        requested_index: BlockIndex,
        first_valid_index: BlockIndex
    }),
    Other: IDL.Record({
        error_message: IDL.Text,
        error_code: IDL.Nat64
    })
});
export const QueryArchiveResult = IDL.Variant({
    Ok: BlockRange,
    Err: QueryArchiveError
});
export const QueryArchiveFn = IDL.Func(
    [GetBlocksArgs],
    [QueryArchiveResult],
    ['query']
);
export const ArchivedBlocksRange = IDL.Record({
    callback: QueryArchiveFn,
    start: BlockIndex,
    length: IDL.Nat64
});
export const QueryBlocksResponse = IDL.Record({
    certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
    blocks: IDL.Vec(Block),
    chain_length: IDL.Nat64,
    first_block_index: BlockIndex,
    archived_blocks: IDL.Vec(ArchivedBlocksRange)
});
export const ArchivedEncodedBlocksRange = IDL.Record({
    callback: IDL.Func(
        [GetBlocksArgs],
        [
            IDL.Variant({
                Ok: IDL.Vec(IDL.Vec(IDL.Nat8)),
                Err: QueryArchiveError
            })
        ],
        ['query']
    ),
    start: IDL.Nat64,
    length: IDL.Nat64
});
export const QueryEncodedBlocksResponse = IDL.Record({
    certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
    blocks: IDL.Vec(IDL.Vec(IDL.Nat8)),
    chain_length: IDL.Nat64,
    first_block_index: IDL.Nat64,
    archived_blocks: IDL.Vec(ArchivedEncodedBlocksRange)
});
export const SendArgs = IDL.Record({
    to: TextAccountIdentifier,
    fee: Tokens,
    memo: Memo,
    from_subaccount: IDL.Opt(SubAccount),
    created_at_time: IDL.Opt(TimeStamp),
    amount: Tokens
});
export const SymbolResult = IDL.Record({ symbol: IDL.Text });
export const TransferArgs = IDL.Record({
    to: AccountIdentifier,
    fee: Tokens,
    memo: Memo,
    from_subaccount: IDL.Opt(SubAccount),
    created_at_time: IDL.Opt(TimeStamp),
    amount: Tokens
});
export const TransferError = IDL.Variant({
    TxTooOld: IDL.Record({ allowed_window_nanos: IDL.Nat64 }),
    BadFee: IDL.Record({ expected_fee: Tokens }),
    TxDuplicate: IDL.Record({ duplicate_of: BlockIndex }),
    TxCreatedInFuture: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: Tokens })
});
export const TransferResult = IDL.Variant({
    Ok: BlockIndex,
    Err: TransferError
});
export const TransferFeeArg = IDL.Record({});
export const TransferFee = IDL.Record({ transfer_fee: Tokens });
export const idlFactory: idlFactory = ({ IDL }) => {
    const SubAccount = IDL.Vec(IDL.Nat8);
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(SubAccount)
    });
    const FeatureFlags = IDL.Record({ icrc2: IDL.Bool });
    const UpgradeArgs = IDL.Record({
        icrc1_minting_account: IDL.Opt(Account),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const Tokens = IDL.Record({ e8s: IDL.Nat64 });
    const TextAccountIdentifier = IDL.Text;
    const Duration = IDL.Record({ secs: IDL.Nat64, nanos: IDL.Nat32 });
    const ArchiveOptions = IDL.Record({
        num_blocks_to_archive: IDL.Nat64,
        max_transactions_per_response: IDL.Opt(IDL.Nat64),
        trigger_threshold: IDL.Nat64,
        more_controller_ids: IDL.Opt(IDL.Vec(IDL.Principal)),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
        node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
        controller_id: IDL.Principal
    });
    const InitArgs = IDL.Record({
        send_whitelist: IDL.Vec(IDL.Principal),
        token_symbol: IDL.Opt(IDL.Text),
        transfer_fee: IDL.Opt(Tokens),
        minting_account: TextAccountIdentifier,
        maximum_number_of_accounts: IDL.Opt(IDL.Nat64),
        accounts_overflow_trim_quantity: IDL.Opt(IDL.Nat64),
        transaction_window: IDL.Opt(Duration),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        icrc1_minting_account: IDL.Opt(Account),
        archive_options: IDL.Opt(ArchiveOptions),
        initial_values: IDL.Vec(IDL.Tuple(TextAccountIdentifier, Tokens)),
        token_name: IDL.Opt(IDL.Text),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    // eslint-disable-next-line
    const LedgerCanisterPayload = IDL.Variant({
        Upgrade: IDL.Opt(UpgradeArgs),
        Init: InitArgs
    });
    const AccountIdentifier = IDL.Vec(IDL.Nat8);
    const AccountBalanceArgs = IDL.Record({ account: AccountIdentifier });
    const AccountBalanceArgsDfx = IDL.Record({
        account: TextAccountIdentifier
    });
    const Archive = IDL.Record({ canister_id: IDL.Principal });
    const Archives = IDL.Record({ archives: IDL.Vec(Archive) });
    const DecimalsResult = IDL.Record({ decimals: IDL.Nat32 });
    const Icrc1Tokens = IDL.Nat;
    const Value = IDL.Variant({
        Int: IDL.Int,
        Nat: IDL.Nat,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text
    });
    const Icrc1Timestamp = IDL.Nat64;
    const TransferArg = IDL.Record({
        to: Account,
        fee: IDL.Opt(Icrc1Tokens),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(SubAccount),
        created_at_time: IDL.Opt(Icrc1Timestamp),
        amount: Icrc1Tokens
    });
    const Icrc1BlockIndex = IDL.Nat;
    const Icrc1TransferError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        BadBurn: IDL.Record({ min_burn_amount: Icrc1Tokens }),
        Duplicate: IDL.Record({ duplicate_of: Icrc1BlockIndex }),
        BadFee: IDL.Record({ expected_fee: Icrc1Tokens }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: Icrc1Tokens })
    });
    const Icrc1TransferResult = IDL.Variant({
        Ok: Icrc1BlockIndex,
        Err: Icrc1TransferError
    });
    const icrc21_consent_message_metadata = IDL.Record({
        utc_offset_minutes: IDL.Opt(IDL.Int16),
        language: IDL.Text
    });
    const icrc21_consent_message_spec = IDL.Record({
        metadata: icrc21_consent_message_metadata,
        device_spec: IDL.Opt(
            IDL.Variant({
                GenericDisplay: IDL.Null,
                LineDisplay: IDL.Record({
                    characters_per_line: IDL.Nat16,
                    lines_per_page: IDL.Nat16
                })
            })
        )
    });
    const icrc21_consent_message_request = IDL.Record({
        arg: IDL.Vec(IDL.Nat8),
        method: IDL.Text,
        user_preferences: icrc21_consent_message_spec
    });
    const icrc21_consent_message = IDL.Variant({
        LineDisplayMessage: IDL.Record({
            pages: IDL.Vec(IDL.Record({ lines: IDL.Vec(IDL.Text) }))
        }),
        GenericDisplayMessage: IDL.Text
    });
    const icrc21_consent_info = IDL.Record({
        metadata: icrc21_consent_message_metadata,
        consent_message: icrc21_consent_message
    });
    const icrc21_error_info = IDL.Record({ description: IDL.Text });
    const icrc21_error = IDL.Variant({
        GenericError: IDL.Record({
            description: IDL.Text,
            error_code: IDL.Nat
        }),
        InsufficientPayment: icrc21_error_info,
        UnsupportedCanisterCall: icrc21_error_info,
        ConsentMessageUnavailable: icrc21_error_info
    });
    const icrc21_consent_message_response = IDL.Variant({
        Ok: icrc21_consent_info,
        Err: icrc21_error
    });
    const AllowanceArgs = IDL.Record({
        account: Account,
        spender: Account
    });
    const Allowance = IDL.Record({
        allowance: Icrc1Tokens,
        expires_at: IDL.Opt(Icrc1Timestamp)
    });
    const ApproveArgs = IDL.Record({
        fee: IDL.Opt(Icrc1Tokens),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(SubAccount),
        created_at_time: IDL.Opt(Icrc1Timestamp),
        amount: Icrc1Tokens,
        expected_allowance: IDL.Opt(Icrc1Tokens),
        expires_at: IDL.Opt(Icrc1Timestamp),
        spender: Account
    });
    const ApproveError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        Duplicate: IDL.Record({ duplicate_of: Icrc1BlockIndex }),
        BadFee: IDL.Record({ expected_fee: Icrc1Tokens }),
        AllowanceChanged: IDL.Record({ current_allowance: Icrc1Tokens }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        Expired: IDL.Record({ ledger_time: IDL.Nat64 }),
        InsufficientFunds: IDL.Record({ balance: Icrc1Tokens })
    });
    const ApproveResult = IDL.Variant({
        Ok: Icrc1BlockIndex,
        Err: ApproveError
    });
    const TransferFromArgs = IDL.Record({
        to: Account,
        fee: IDL.Opt(Icrc1Tokens),
        spender_subaccount: IDL.Opt(SubAccount),
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(Icrc1Timestamp),
        amount: Icrc1Tokens
    });
    const TransferFromError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        InsufficientAllowance: IDL.Record({ allowance: Icrc1Tokens }),
        BadBurn: IDL.Record({ min_burn_amount: Icrc1Tokens }),
        Duplicate: IDL.Record({ duplicate_of: Icrc1BlockIndex }),
        BadFee: IDL.Record({ expected_fee: Icrc1Tokens }),
        CreatedInFuture: IDL.Record({ ledger_time: Icrc1Timestamp }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: Icrc1Tokens })
    });
    const TransferFromResult = IDL.Variant({
        Ok: Icrc1BlockIndex,
        Err: TransferFromError
    });
    const NameResult = IDL.Record({ name: IDL.Text });
    const BlockIndex = IDL.Nat64;
    const GetBlocksArgs = IDL.Record({
        start: BlockIndex,
        length: IDL.Nat64
    });
    const Memo = IDL.Nat64;
    const TimeStamp = IDL.Record({ timestamp_nanos: IDL.Nat64 });
    const Operation = IDL.Variant({
        Approve: IDL.Record({
            fee: Tokens,
            from: AccountIdentifier,
            allowance_e8s: IDL.Int,
            allowance: Tokens,
            expected_allowance: IDL.Opt(Tokens),
            expires_at: IDL.Opt(TimeStamp),
            spender: AccountIdentifier
        }),
        Burn: IDL.Record({
            from: AccountIdentifier,
            amount: Tokens,
            spender: IDL.Opt(AccountIdentifier)
        }),
        Mint: IDL.Record({ to: AccountIdentifier, amount: Tokens }),
        Transfer: IDL.Record({
            to: AccountIdentifier,
            fee: Tokens,
            from: AccountIdentifier,
            amount: Tokens,
            spender: IDL.Opt(IDL.Vec(IDL.Nat8))
        })
    });
    const Transaction = IDL.Record({
        memo: Memo,
        icrc1_memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        operation: IDL.Opt(Operation),
        created_at_time: TimeStamp
    });
    const Block = IDL.Record({
        transaction: Transaction,
        timestamp: TimeStamp,
        parent_hash: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const BlockRange = IDL.Record({ blocks: IDL.Vec(Block) });
    const QueryArchiveError = IDL.Variant({
        BadFirstBlockIndex: IDL.Record({
            requested_index: BlockIndex,
            first_valid_index: BlockIndex
        }),
        Other: IDL.Record({
            error_message: IDL.Text,
            error_code: IDL.Nat64
        })
    });
    const QueryArchiveResult = IDL.Variant({
        Ok: BlockRange,
        Err: QueryArchiveError
    });
    const QueryArchiveFn = IDL.Func(
        [GetBlocksArgs],
        [QueryArchiveResult],
        ['query']
    );
    const ArchivedBlocksRange = IDL.Record({
        callback: QueryArchiveFn,
        start: BlockIndex,
        length: IDL.Nat64
    });
    const QueryBlocksResponse = IDL.Record({
        certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
        blocks: IDL.Vec(Block),
        chain_length: IDL.Nat64,
        first_block_index: BlockIndex,
        archived_blocks: IDL.Vec(ArchivedBlocksRange)
    });
    const ArchivedEncodedBlocksRange = IDL.Record({
        callback: IDL.Func(
            [GetBlocksArgs],
            [
                IDL.Variant({
                    Ok: IDL.Vec(IDL.Vec(IDL.Nat8)),
                    Err: QueryArchiveError
                })
            ],
            ['query']
        ),
        start: IDL.Nat64,
        length: IDL.Nat64
    });
    const QueryEncodedBlocksResponse = IDL.Record({
        certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
        blocks: IDL.Vec(IDL.Vec(IDL.Nat8)),
        chain_length: IDL.Nat64,
        first_block_index: IDL.Nat64,
        archived_blocks: IDL.Vec(ArchivedEncodedBlocksRange)
    });
    const SendArgs = IDL.Record({
        to: TextAccountIdentifier,
        fee: Tokens,
        memo: Memo,
        from_subaccount: IDL.Opt(SubAccount),
        created_at_time: IDL.Opt(TimeStamp),
        amount: Tokens
    });
    const SymbolResult = IDL.Record({ symbol: IDL.Text });
    const TransferArgs = IDL.Record({
        to: AccountIdentifier,
        fee: Tokens,
        memo: Memo,
        from_subaccount: IDL.Opt(SubAccount),
        created_at_time: IDL.Opt(TimeStamp),
        amount: Tokens
    });
    const TransferError = IDL.Variant({
        TxTooOld: IDL.Record({ allowed_window_nanos: IDL.Nat64 }),
        BadFee: IDL.Record({ expected_fee: Tokens }),
        TxDuplicate: IDL.Record({ duplicate_of: BlockIndex }),
        TxCreatedInFuture: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: Tokens })
    });
    const TransferResult = IDL.Variant({
        Ok: BlockIndex,
        Err: TransferError
    });
    const TransferFeeArg = IDL.Record({});
    const TransferFee = IDL.Record({ transfer_fee: Tokens });
    return IDL.Service({
        account_balance: IDL.Func([AccountBalanceArgs], [Tokens], ['query']),
        account_balance_dfx: IDL.Func(
            [AccountBalanceArgsDfx],
            [Tokens],
            ['query']
        ),
        account_identifier: IDL.Func([Account], [AccountIdentifier], ['query']),
        archives: IDL.Func([], [Archives], ['query']),
        decimals: IDL.Func([], [DecimalsResult], ['query']),
        icrc10_supported_standards: IDL.Func(
            [],
            [IDL.Vec(IDL.Record({ url: IDL.Text, name: IDL.Text }))],
            ['query']
        ),
        icrc1_balance_of: IDL.Func([Account], [Icrc1Tokens], ['query']),
        icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
        icrc1_fee: IDL.Func([], [Icrc1Tokens], ['query']),
        icrc1_metadata: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Text, Value))],
            ['query']
        ),
        icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ['query']),
        icrc1_name: IDL.Func([], [IDL.Text], ['query']),
        icrc1_supported_standards: IDL.Func(
            [],
            [IDL.Vec(IDL.Record({ url: IDL.Text, name: IDL.Text }))],
            ['query']
        ),
        icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
        icrc1_total_supply: IDL.Func([], [Icrc1Tokens], ['query']),
        icrc1_transfer: IDL.Func([TransferArg], [Icrc1TransferResult], []),
        icrc21_canister_call_consent_message: IDL.Func(
            [icrc21_consent_message_request],
            [icrc21_consent_message_response],
            []
        ),
        icrc2_allowance: IDL.Func([AllowanceArgs], [Allowance], ['query']),
        icrc2_approve: IDL.Func([ApproveArgs], [ApproveResult], []),
        icrc2_transfer_from: IDL.Func(
            [TransferFromArgs],
            [TransferFromResult],
            []
        ),
        is_ledger_ready: IDL.Func([], [IDL.Bool], ['query']),
        name: IDL.Func([], [NameResult], ['query']),
        query_blocks: IDL.Func(
            [GetBlocksArgs],
            [QueryBlocksResponse],
            ['query']
        ),
        query_encoded_blocks: IDL.Func(
            [GetBlocksArgs],
            [QueryEncodedBlocksResponse],
            ['query']
        ),
        send_dfx: IDL.Func([SendArgs], [BlockIndex], []),
        symbol: IDL.Func([], [SymbolResult], ['query']),
        transfer: IDL.Func([TransferArgs], [TransferResult], []),
        transfer_fee: IDL.Func([TransferFeeArg], [TransferFee], ['query'])
    });
};
export const init: init = ({ IDL }) => {
    const SubAccount = IDL.Vec(IDL.Nat8);
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(SubAccount)
    });
    const FeatureFlags = IDL.Record({ icrc2: IDL.Bool });
    const UpgradeArgs = IDL.Record({
        icrc1_minting_account: IDL.Opt(Account),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const Tokens = IDL.Record({ e8s: IDL.Nat64 });
    const TextAccountIdentifier = IDL.Text;
    const Duration = IDL.Record({ secs: IDL.Nat64, nanos: IDL.Nat32 });
    const ArchiveOptions = IDL.Record({
        num_blocks_to_archive: IDL.Nat64,
        max_transactions_per_response: IDL.Opt(IDL.Nat64),
        trigger_threshold: IDL.Nat64,
        more_controller_ids: IDL.Opt(IDL.Vec(IDL.Principal)),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
        node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
        controller_id: IDL.Principal
    });
    const InitArgs = IDL.Record({
        send_whitelist: IDL.Vec(IDL.Principal),
        token_symbol: IDL.Opt(IDL.Text),
        transfer_fee: IDL.Opt(Tokens),
        minting_account: TextAccountIdentifier,
        maximum_number_of_accounts: IDL.Opt(IDL.Nat64),
        accounts_overflow_trim_quantity: IDL.Opt(IDL.Nat64),
        transaction_window: IDL.Opt(Duration),
        max_message_size_bytes: IDL.Opt(IDL.Nat64),
        icrc1_minting_account: IDL.Opt(Account),
        archive_options: IDL.Opt(ArchiveOptions),
        initial_values: IDL.Vec(IDL.Tuple(TextAccountIdentifier, Tokens)),
        token_name: IDL.Opt(IDL.Text),
        feature_flags: IDL.Opt(FeatureFlags)
    });
    const LedgerCanisterPayload = IDL.Variant({
        Upgrade: IDL.Opt(UpgradeArgs),
        Init: InitArgs
    });
    return [LedgerCanisterPayload];
};

export {
    binaryAddressFromAddress,
    binaryAddressFromPrincipal,
    hexAddressFromPrincipal
} from './address';
