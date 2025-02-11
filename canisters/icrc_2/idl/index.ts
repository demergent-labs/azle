import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export interface Account {
    owner: Principal;
    subaccount: [] | [Uint8Array | number[]];
}
export interface AllowanceArgs {
    account: Account;
    spender: Account;
}
export interface AllowanceResult {
    allowance: bigint;
    expires_at: [] | [bigint];
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
export type ApproveResult = { Ok: bigint } | { Err: ApproveError };
export interface SupportedStandard {
    url: string;
    name: string;
}
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
export type TransferFromResult = { Ok: bigint } | { Err: TransferFromError };
export interface _SERVICE {
    icrc1_supported_standards: ActorMethod<[], Array<SupportedStandard>>;
    icrc2_allowance: ActorMethod<[AllowanceArgs], AllowanceResult>;
    icrc2_approve: ActorMethod<[ApproveArgs], ApproveResult>;
    icrc2_transfer_from: ActorMethod<[TransferFromArgs], TransferFromResult>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const SupportedStandard = IDL.Record({
    url: IDL.Text,
    name: IDL.Text
});
export const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
});
export const AllowanceArgs = IDL.Record({
    account: Account,
    spender: Account
});
export const AllowanceResult = IDL.Record({
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
export const ApproveResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: ApproveError
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
export const TransferFromResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: TransferFromError
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const SupportedStandard = IDL.Record({ url: IDL.Text, name: IDL.Text });
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
    });
    const AllowanceArgs = IDL.Record({
        account: Account,
        spender: Account
    });
    const AllowanceResult = IDL.Record({
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
    const ApproveResult = IDL.Variant({ Ok: IDL.Nat, Err: ApproveError });
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
    const TransferFromResult = IDL.Variant({
        Ok: IDL.Nat,
        Err: TransferFromError
    });
    return IDL.Service({
        icrc1_supported_standards: IDL.Func(
            [],
            [IDL.Vec(SupportedStandard)],
            ['query']
        ),
        icrc2_allowance: IDL.Func(
            [AllowanceArgs],
            [AllowanceResult],
            ['query']
        ),
        icrc2_approve: IDL.Func([ApproveArgs], [ApproveResult], []),
        icrc2_transfer_from: IDL.Func(
            [TransferFromArgs],
            [TransferFromResult],
            []
        )
    });
};
export const init: init = () => {
    return [];
};
