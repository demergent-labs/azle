import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

export interface Account {
    owner: Principal;
    subaccount: [] | [Uint8Array | number[]];
}
export interface Allowance {
    allowance: bigint;
    expires_at: [] | [bigint];
}
export interface AllowanceArgs {
    account: Account;
    spender: Account;
}
export interface ApproveArgs {
    fee: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
    expected_allowance: [] | [bigint];
    expires_at: [] | [bigint];
    spender: Account;
}
export type ApproveError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { AllowanceChanged: { current_allowance: bigint } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { Expired: { ledger_time: bigint } }
    | { InsufficientFunds: { balance: bigint } };
export type BlockIndex = bigint;
export interface CanisterSettings {
    freezing_threshold: [] | [bigint];
    controllers: [] | [Array<Principal>];
    reserved_cycles_limit: [] | [bigint];
    memory_allocation: [] | [bigint];
    compute_allocation: [] | [bigint];
}
export type ChangeIndexId = { SetTo: Principal } | { Unset: null };
export interface CmcCreateCanisterArgs {
    subnet_selection: [] | [SubnetSelection];
    settings: [] | [CanisterSettings];
}
export interface CreateCanisterArgs {
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
    creation_args: [] | [CmcCreateCanisterArgs];
}
export type CreateCanisterError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | {
          Duplicate: { duplicate_of: bigint; canister_id: [] | [Principal] };
      }
    | { CreatedInFuture: { ledger_time: bigint } }
    | {
          FailedToCreate: {
              error: string;
              refund_block: [] | [BlockIndex];
              fee_block: [] | [BlockIndex];
          };
      }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export interface CreateCanisterFromArgs {
    spender_subaccount: [] | [Uint8Array | number[]];
    from: Account;
    created_at_time: [] | [bigint];
    amount: bigint;
    creation_args: [] | [CmcCreateCanisterArgs];
}
export type CreateCanisterFromError =
    | {
          FailedToCreateFrom: {
              create_from_block: [] | [BlockIndex];
              rejection_code: RejectionCode;
              refund_block: [] | [BlockIndex];
              approval_refund_block: [] | [BlockIndex];
              rejection_reason: string;
          };
      }
    | { GenericError: { message: string; error_code: bigint } }
    | { TemporarilyUnavailable: null }
    | { InsufficientAllowance: { allowance: bigint } }
    | {
          Duplicate: { duplicate_of: bigint; canister_id: [] | [Principal] };
      }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export interface CreateCanisterSuccess {
    block_id: BlockIndex;
    canister_id: Principal;
}
export interface DataCertificate {
    certificate: Uint8Array | number[];
    hash_tree: Uint8Array | number[];
}
export interface DepositArgs {
    to: Account;
    memo: [] | [Uint8Array | number[]];
}
export interface DepositResult {
    balance: bigint;
    block_index: BlockIndex;
}
export interface GetArchivesArgs {
    from: [] | [Principal];
}
export type GetArchivesResult = Array<{
    end: bigint;
    canister_id: Principal;
    start: bigint;
}>;
export type GetBlocksArgs = Array<{ start: bigint; length: bigint }>;
export interface GetBlocksResult {
    log_length: bigint;
    blocks: Array<{ id: bigint; block: Value }>;
    archived_blocks: Array<{
        args: GetBlocksArgs;
        callback: [Principal, string];
    }>;
}
export interface HttpRequest {
    url: string;
    method: string;
    body: Uint8Array | number[];
    headers: Array<[string, string]>;
}
export interface HttpResponse {
    body: Uint8Array | number[];
    headers: Array<[string, string]>;
    status_code: number;
}
export interface InitArgs {
    index_id: [] | [Principal];
    max_blocks_per_request: bigint;
}
export type LedgerArgs = { Upgrade: [] | [UpgradeArgs] } | { Init: InitArgs };
export type MetadataValue =
    | { Int: bigint }
    | { Nat: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string };
export type RejectionCode =
    | { NoError: null }
    | { CanisterError: null }
    | { SysTransient: null }
    | { DestinationInvalid: null }
    | { Unknown: null }
    | { SysFatal: null }
    | { CanisterReject: null };
export interface SubnetFilter {
    subnet_type: [] | [string];
}
export type SubnetSelection =
    | { Filter: SubnetFilter }
    | { Subnet: { subnet: Principal } };
export interface SupportedBlockType {
    url: string;
    block_type: string;
}
export interface SupportedStandard {
    url: string;
    name: string;
}
export interface TransferArgs {
    to: Account;
    fee: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
}
export type TransferError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { BadBurn: { min_burn_amount: bigint } }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export interface TransferFromArgs {
    to: Account;
    fee: [] | [bigint];
    spender_subaccount: [] | [Uint8Array | number[]];
    from: Account;
    memo: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
}
export type TransferFromError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { InsufficientAllowance: { allowance: bigint } }
    | { BadBurn: { min_burn_amount: bigint } }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export interface UpgradeArgs {
    change_index_id: [] | [ChangeIndexId];
    max_blocks_per_request: [] | [bigint];
}
export type Value =
    | { Int: bigint }
    | { Map: Array<[string, Value]> }
    | { Nat: bigint }
    | { Nat64: bigint }
    | { Blob: Uint8Array | number[] }
    | { Text: string }
    | { Array: Array<Value> };
export interface WithdrawArgs {
    to: Principal;
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
}
export type WithdrawError =
    | {
          FailedToWithdraw: {
              rejection_code: RejectionCode;
              fee_block: [] | [bigint];
              rejection_reason: string;
          };
      }
    | { GenericError: { message: string; error_code: bigint } }
    | { TemporarilyUnavailable: null }
    | { Duplicate: { duplicate_of: bigint } }
    | { BadFee: { expected_fee: bigint } }
    | { InvalidReceiver: { receiver: Principal } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | { InsufficientFunds: { balance: bigint } };
export interface WithdrawFromArgs {
    to: Principal;
    spender_subaccount: [] | [Uint8Array | number[]];
    from: Account;
    created_at_time: [] | [bigint];
    amount: bigint;
}
export type WithdrawFromError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { TemporarilyUnavailable: null }
    | { InsufficientAllowance: { allowance: bigint } }
    | { Duplicate: { duplicate_of: BlockIndex } }
    | { InvalidReceiver: { receiver: Principal } }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { TooOld: null }
    | {
          FailedToWithdrawFrom: {
              withdraw_from_block: [] | [bigint];
              rejection_code: RejectionCode;
              refund_block: [] | [bigint];
              approval_refund_block: [] | [bigint];
              rejection_reason: string;
          };
      }
    | { InsufficientFunds: { balance: bigint } };
export interface _SERVICE {
    create_canister: ActorMethod<
        [CreateCanisterArgs],
        { Ok: CreateCanisterSuccess } | { Err: CreateCanisterError }
    >;
    create_canister_from: ActorMethod<
        [CreateCanisterFromArgs],
        { Ok: CreateCanisterSuccess } | { Err: CreateCanisterFromError }
    >;
    deposit: ActorMethod<[DepositArgs], DepositResult>;
    http_request: ActorMethod<[HttpRequest], HttpResponse>;
    icrc1_balance_of: ActorMethod<[Account], bigint>;
    icrc1_decimals: ActorMethod<[], number>;
    icrc1_fee: ActorMethod<[], bigint>;
    icrc1_metadata: ActorMethod<[], Array<[string, MetadataValue]>>;
    icrc1_minting_account: ActorMethod<[], [] | [Account]>;
    icrc1_name: ActorMethod<[], string>;
    icrc1_supported_standards: ActorMethod<[], Array<SupportedStandard>>;
    icrc1_symbol: ActorMethod<[], string>;
    icrc1_total_supply: ActorMethod<[], bigint>;
    icrc1_transfer: ActorMethod<
        [TransferArgs],
        { Ok: BlockIndex } | { Err: TransferError }
    >;
    icrc2_allowance: ActorMethod<[AllowanceArgs], Allowance>;
    icrc2_approve: ActorMethod<
        [ApproveArgs],
        { Ok: bigint } | { Err: ApproveError }
    >;
    icrc2_transfer_from: ActorMethod<
        [TransferFromArgs],
        { Ok: bigint } | { Err: TransferFromError }
    >;
    icrc3_get_archives: ActorMethod<[GetArchivesArgs], GetArchivesResult>;
    icrc3_get_blocks: ActorMethod<[GetBlocksArgs], GetBlocksResult>;
    icrc3_get_tip_certificate: ActorMethod<[], [] | [DataCertificate]>;
    icrc3_supported_block_types: ActorMethod<[], Array<SupportedBlockType>>;
    withdraw: ActorMethod<
        [WithdrawArgs],
        { Ok: BlockIndex } | { Err: WithdrawError }
    >;
    withdraw_from: ActorMethod<
        [WithdrawFromArgs],
        { Ok: BlockIndex } | { Err: WithdrawFromError }
    >;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const GetBlocksResult = IDL.Rec();
export const Value = IDL.Rec();
export const SubnetFilter = IDL.Record({ subnet_type: IDL.Opt(IDL.Text) });
export const SubnetSelection = IDL.Variant({
    Filter: SubnetFilter,
    Subnet: IDL.Record({ subnet: IDL.Principal })
});
export const CanisterSettings = IDL.Record({
    freezing_threshold: IDL.Opt(IDL.Nat),
    controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
    reserved_cycles_limit: IDL.Opt(IDL.Nat),
    memory_allocation: IDL.Opt(IDL.Nat),
    compute_allocation: IDL.Opt(IDL.Nat)
});
export const CmcCreateCanisterArgs = IDL.Record({
    subnet_selection: IDL.Opt(SubnetSelection),
    settings: IDL.Opt(CanisterSettings)
});
export const CreateCanisterArgs = IDL.Record({
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
    creation_args: IDL.Opt(CmcCreateCanisterArgs)
});
export const BlockIndex = IDL.Nat;
export const CreateCanisterSuccess = IDL.Record({
    block_id: BlockIndex,
    canister_id: IDL.Principal
});
export const CreateCanisterError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    Duplicate: IDL.Record({
        duplicate_of: IDL.Nat,
        canister_id: IDL.Opt(IDL.Principal)
    }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    FailedToCreate: IDL.Record({
        error: IDL.Text,
        refund_block: IDL.Opt(BlockIndex),
        fee_block: IDL.Opt(BlockIndex)
    }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
});
export const CreateCanisterFromArgs = IDL.Record({
    spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from: Account,
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
    creation_args: IDL.Opt(CmcCreateCanisterArgs)
});
export const RejectionCode = IDL.Variant({
    NoError: IDL.Null,
    CanisterError: IDL.Null,
    SysTransient: IDL.Null,
    DestinationInvalid: IDL.Null,
    Unknown: IDL.Null,
    SysFatal: IDL.Null,
    CanisterReject: IDL.Null
});
export const CreateCanisterFromError = IDL.Variant({
    FailedToCreateFrom: IDL.Record({
        create_from_block: IDL.Opt(BlockIndex),
        rejection_code: RejectionCode,
        refund_block: IDL.Opt(BlockIndex),
        approval_refund_block: IDL.Opt(BlockIndex),
        rejection_reason: IDL.Text
    }),
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
    Duplicate: IDL.Record({
        duplicate_of: IDL.Nat,
        canister_id: IDL.Opt(IDL.Principal)
    }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const DepositArgs = IDL.Record({
    to: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8))
});
export const DepositResult = IDL.Record({
    balance: IDL.Nat,
    block_index: BlockIndex
});
export const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))
});
export const HttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    status_code: IDL.Nat16
});
export const MetadataValue = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text
});
export const SupportedStandard = IDL.Record({
    url: IDL.Text,
    name: IDL.Text
});
export const TransferArgs = IDL.Record({
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat
});
export const TransferError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const AllowanceArgs = IDL.Record({
    account: Account,
    spender: Account
});
export const Allowance = IDL.Record({
    allowance: IDL.Nat,
    expires_at: IDL.Opt(IDL.Nat64)
});
export const ApproveArgs = IDL.Record({
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
    expected_allowance: IDL.Opt(IDL.Nat),
    expires_at: IDL.Opt(IDL.Nat64),
    spender: Account
});
export const ApproveError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    AllowanceChanged: IDL.Record({ current_allowance: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    Expired: IDL.Record({ ledger_time: IDL.Nat64 }),
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const TransferFromArgs = IDL.Record({
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat
});
export const TransferFromError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const GetArchivesArgs = IDL.Record({ from: IDL.Opt(IDL.Principal) });
export const GetArchivesResult = IDL.Vec(
    IDL.Record({
        end: IDL.Nat,
        canister_id: IDL.Principal,
        start: IDL.Nat
    })
);
export const GetBlocksArgs = IDL.Vec(
    IDL.Record({ start: IDL.Nat, length: IDL.Nat })
);
Value.fill(
    IDL.Variant({
        Int: IDL.Int,
        Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
        Nat: IDL.Nat,
        Nat64: IDL.Nat64,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text,
        Array: IDL.Vec(Value)
    })
);
GetBlocksResult.fill(
    IDL.Record({
        log_length: IDL.Nat,
        blocks: IDL.Vec(IDL.Record({ id: IDL.Nat, block: Value })),
        archived_blocks: IDL.Vec(
            IDL.Record({
                args: GetBlocksArgs,
                callback: IDL.Func(
                    [GetBlocksArgs],
                    [GetBlocksResult],
                    ['query']
                )
            })
        )
    })
);
export const DataCertificate = IDL.Record({
    certificate: IDL.Vec(IDL.Nat8),
    hash_tree: IDL.Vec(IDL.Nat8)
});
export const SupportedBlockType = IDL.Record({
    url: IDL.Text,
    block_type: IDL.Text
});
export const WithdrawArgs = IDL.Record({
    to: IDL.Principal,
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat
});
export const WithdrawError = IDL.Variant({
    FailedToWithdraw: IDL.Record({
        rejection_code: RejectionCode,
        fee_block: IDL.Opt(IDL.Nat),
        rejection_reason: IDL.Text
    }),
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    InvalidReceiver: IDL.Record({ receiver: IDL.Principal }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const WithdrawFromArgs = IDL.Record({
    to: IDL.Principal,
    spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from: Account,
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat
});
export const WithdrawFromError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    TemporarilyUnavailable: IDL.Null,
    InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: BlockIndex }),
    InvalidReceiver: IDL.Record({ receiver: IDL.Principal }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    FailedToWithdrawFrom: IDL.Record({
        withdraw_from_block: IDL.Opt(IDL.Nat),
        rejection_code: RejectionCode,
        refund_block: IDL.Opt(IDL.Nat),
        approval_refund_block: IDL.Opt(IDL.Nat),
        rejection_reason: IDL.Text
    }),
    InsufficientFunds: IDL.Record({ balance: IDL.Nat })
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const GetBlocksResult = IDL.Rec();
    const Value = IDL.Rec();
    const SubnetFilter = IDL.Record({ subnet_type: IDL.Opt(IDL.Text) });
    const SubnetSelection = IDL.Variant({
        Filter: SubnetFilter,
        Subnet: IDL.Record({ subnet: IDL.Principal })
    });
    const CanisterSettings = IDL.Record({
        freezing_threshold: IDL.Opt(IDL.Nat),
        controllers: IDL.Opt(IDL.Vec(IDL.Principal)),
        reserved_cycles_limit: IDL.Opt(IDL.Nat),
        memory_allocation: IDL.Opt(IDL.Nat),
        compute_allocation: IDL.Opt(IDL.Nat)
    });
    const CmcCreateCanisterArgs = IDL.Record({
        subnet_selection: IDL.Opt(SubnetSelection),
        settings: IDL.Opt(CanisterSettings)
    });
    const CreateCanisterArgs = IDL.Record({
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat,
        creation_args: IDL.Opt(CmcCreateCanisterArgs)
    });
    const BlockIndex = IDL.Nat;
    const CreateCanisterSuccess = IDL.Record({
        block_id: BlockIndex,
        canister_id: IDL.Principal
    });
    const CreateCanisterError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        Duplicate: IDL.Record({
            duplicate_of: IDL.Nat,
            canister_id: IDL.Opt(IDL.Principal)
        }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        FailedToCreate: IDL.Record({
            error: IDL.Text,
            refund_block: IDL.Opt(BlockIndex),
            fee_block: IDL.Opt(BlockIndex)
        }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const CreateCanisterFromArgs = IDL.Record({
        spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from: Account,
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat,
        creation_args: IDL.Opt(CmcCreateCanisterArgs)
    });
    const RejectionCode = IDL.Variant({
        NoError: IDL.Null,
        CanisterError: IDL.Null,
        SysTransient: IDL.Null,
        DestinationInvalid: IDL.Null,
        Unknown: IDL.Null,
        SysFatal: IDL.Null,
        CanisterReject: IDL.Null
    });
    const CreateCanisterFromError = IDL.Variant({
        FailedToCreateFrom: IDL.Record({
            create_from_block: IDL.Opt(BlockIndex),
            rejection_code: RejectionCode,
            refund_block: IDL.Opt(BlockIndex),
            approval_refund_block: IDL.Opt(BlockIndex),
            rejection_reason: IDL.Text
        }),
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
        Duplicate: IDL.Record({
            duplicate_of: IDL.Nat,
            canister_id: IDL.Opt(IDL.Principal)
        }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const DepositArgs = IDL.Record({
        to: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const DepositResult = IDL.Record({
        balance: IDL.Nat,
        block_index: BlockIndex
    });
    const HttpRequest = IDL.Record({
        url: IDL.Text,
        method: IDL.Text,
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))
    });
    const HttpResponse = IDL.Record({
        body: IDL.Vec(IDL.Nat8),
        headers: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
        status_code: IDL.Nat16
    });
    const MetadataValue = IDL.Variant({
        Int: IDL.Int,
        Nat: IDL.Nat,
        Blob: IDL.Vec(IDL.Nat8),
        Text: IDL.Text
    });
    const SupportedStandard = IDL.Record({ url: IDL.Text, name: IDL.Text });
    const TransferArgs = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat
    });
    const TransferError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const AllowanceArgs = IDL.Record({
        account: Account,
        spender: Account
    });
    const Allowance = IDL.Record({
        allowance: IDL.Nat,
        expires_at: IDL.Opt(IDL.Nat64)
    });
    const ApproveArgs = IDL.Record({
        fee: IDL.Opt(IDL.Nat),
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat,
        expected_allowance: IDL.Opt(IDL.Nat),
        expires_at: IDL.Opt(IDL.Nat64),
        spender: Account
    });
    const ApproveError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
        AllowanceChanged: IDL.Record({ current_allowance: IDL.Nat }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        Expired: IDL.Record({ ledger_time: IDL.Nat64 }),
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const TransferFromArgs = IDL.Record({
        to: Account,
        fee: IDL.Opt(IDL.Nat),
        spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat
    });
    const TransferFromError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
        BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const GetArchivesArgs = IDL.Record({ from: IDL.Opt(IDL.Principal) });
    const GetArchivesResult = IDL.Vec(
        IDL.Record({
            end: IDL.Nat,
            canister_id: IDL.Principal,
            start: IDL.Nat
        })
    );
    const GetBlocksArgs = IDL.Vec(
        IDL.Record({ start: IDL.Nat, length: IDL.Nat })
    );
    Value.fill(
        IDL.Variant({
            Int: IDL.Int,
            Map: IDL.Vec(IDL.Tuple(IDL.Text, Value)),
            Nat: IDL.Nat,
            Nat64: IDL.Nat64,
            Blob: IDL.Vec(IDL.Nat8),
            Text: IDL.Text,
            Array: IDL.Vec(Value)
        })
    );
    GetBlocksResult.fill(
        IDL.Record({
            log_length: IDL.Nat,
            blocks: IDL.Vec(IDL.Record({ id: IDL.Nat, block: Value })),
            archived_blocks: IDL.Vec(
                IDL.Record({
                    args: GetBlocksArgs,
                    callback: IDL.Func(
                        [GetBlocksArgs],
                        [GetBlocksResult],
                        ['query']
                    )
                })
            )
        })
    );
    const DataCertificate = IDL.Record({
        certificate: IDL.Vec(IDL.Nat8),
        hash_tree: IDL.Vec(IDL.Nat8)
    });
    const SupportedBlockType = IDL.Record({
        url: IDL.Text,
        block_type: IDL.Text
    });
    const WithdrawArgs = IDL.Record({
        to: IDL.Principal,
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat
    });
    const WithdrawError = IDL.Variant({
        FailedToWithdraw: IDL.Record({
            rejection_code: RejectionCode,
            fee_block: IDL.Opt(IDL.Nat),
            rejection_reason: IDL.Text
        }),
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        BadFee: IDL.Record({ expected_fee: IDL.Nat }),
        InvalidReceiver: IDL.Record({ receiver: IDL.Principal }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    const WithdrawFromArgs = IDL.Record({
        to: IDL.Principal,
        spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from: Account,
        created_at_time: IDL.Opt(IDL.Nat64),
        amount: IDL.Nat
    });
    const WithdrawFromError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TemporarilyUnavailable: IDL.Null,
        InsufficientAllowance: IDL.Record({ allowance: IDL.Nat }),
        Duplicate: IDL.Record({ duplicate_of: BlockIndex }),
        InvalidReceiver: IDL.Record({ receiver: IDL.Principal }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        TooOld: IDL.Null,
        FailedToWithdrawFrom: IDL.Record({
            withdraw_from_block: IDL.Opt(IDL.Nat),
            rejection_code: RejectionCode,
            refund_block: IDL.Opt(IDL.Nat),
            approval_refund_block: IDL.Opt(IDL.Nat),
            rejection_reason: IDL.Text
        }),
        InsufficientFunds: IDL.Record({ balance: IDL.Nat })
    });
    return IDL.Service({
        create_canister: IDL.Func(
            [CreateCanisterArgs],
            [
                IDL.Variant({
                    Ok: CreateCanisterSuccess,
                    Err: CreateCanisterError
                })
            ],
            []
        ),
        create_canister_from: IDL.Func(
            [CreateCanisterFromArgs],
            [
                IDL.Variant({
                    Ok: CreateCanisterSuccess,
                    Err: CreateCanisterFromError
                })
            ],
            []
        ),
        deposit: IDL.Func([DepositArgs], [DepositResult], []),
        http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
        icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
        icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
        icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
        icrc1_metadata: IDL.Func(
            [],
            [IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue))],
            ['query']
        ),
        icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ['query']),
        icrc1_name: IDL.Func([], [IDL.Text], ['query']),
        icrc1_supported_standards: IDL.Func(
            [],
            [IDL.Vec(SupportedStandard)],
            ['query']
        ),
        icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
        icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
        icrc1_transfer: IDL.Func(
            [TransferArgs],
            [IDL.Variant({ Ok: BlockIndex, Err: TransferError })],
            []
        ),
        icrc2_allowance: IDL.Func([AllowanceArgs], [Allowance], ['query']),
        icrc2_approve: IDL.Func(
            [ApproveArgs],
            [IDL.Variant({ Ok: IDL.Nat, Err: ApproveError })],
            []
        ),
        icrc2_transfer_from: IDL.Func(
            [TransferFromArgs],
            [IDL.Variant({ Ok: IDL.Nat, Err: TransferFromError })],
            []
        ),
        icrc3_get_archives: IDL.Func(
            [GetArchivesArgs],
            [GetArchivesResult],
            ['query']
        ),
        icrc3_get_blocks: IDL.Func(
            [GetBlocksArgs],
            [GetBlocksResult],
            ['query']
        ),
        icrc3_get_tip_certificate: IDL.Func(
            [],
            [IDL.Opt(DataCertificate)],
            ['query']
        ),
        icrc3_supported_block_types: IDL.Func(
            [],
            [IDL.Vec(SupportedBlockType)],
            ['query']
        ),
        withdraw: IDL.Func(
            [WithdrawArgs],
            [IDL.Variant({ Ok: BlockIndex, Err: WithdrawError })],
            []
        ),
        withdraw_from: IDL.Func(
            [WithdrawFromArgs],
            [IDL.Variant({ Ok: BlockIndex, Err: WithdrawFromError })],
            []
        )
    });
};
export const init: init = () => {
    return [];
};
