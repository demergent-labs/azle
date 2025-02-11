import { ActorMethod } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
export interface Account {
    owner: Principal;
    subaccount: [] | [Subaccount];
}
export interface ApprovalInfo {
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: bigint;
    expires_at: [] | [bigint];
    spender: Account;
}
export interface ApproveCollectionArg {
    approval_info: ApprovalInfo;
}
export type ApproveCollectionError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { InvalidSpender: null }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { GenericBatchError: { message: string; error_code: bigint } }
    | { TooOld: null };
export type ApproveCollectionResult =
    | { Ok: bigint }
    | { Err: ApproveCollectionError };
export interface ApproveTokenArg {
    token_id: bigint;
    approval_info: ApprovalInfo;
}
export type ApproveTokenError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { InvalidSpender: null }
    | { NonExistingTokenId: null }
    | { Unauthorized: null }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { GenericBatchError: { message: string; error_code: bigint } }
    | { TooOld: null };
export type ApproveTokenResult = { Ok: bigint } | { Err: ApproveTokenError };
export type CollectionApproval = ApprovalInfo;
export interface IsApprovedArg {
    token_id: bigint;
    from_subaccount: [] | [Uint8Array | number[]];
    spender: Account;
}
export interface RevokeCollectionApprovalArg {
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    spender: [] | [Account];
}
export type RevokeCollectionApprovalError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { ApprovalDoesNotExist: null }
    | { GenericBatchError: { message: string; error_code: bigint } }
    | { TooOld: null };
export type RevokeCollectionApprovalResult =
    | { Ok: bigint }
    | { Err: RevokeCollectionApprovalError };
export interface RevokeTokenApprovalArg {
    token_id: bigint;
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    spender: [] | [Account];
}
export type RevokeTokenApprovalError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { NonExistingTokenId: null }
    | { Unauthorized: null }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { ApprovalDoesNotExist: null }
    | { GenericBatchError: { message: string; error_code: bigint } }
    | { TooOld: null };
export type RevokeTokenApprovalResponse =
    | { Ok: bigint }
    | { Err: RevokeTokenApprovalError };
export type Subaccount = Uint8Array | number[];
export interface TokenApproval {
    token_id: bigint;
    approval_info: ApprovalInfo;
}
export interface TransferFromArg {
    to: Account;
    spender_subaccount: [] | [Uint8Array | number[]];
    token_id: bigint;
    from: Account;
    memo: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
}
export type TransferFromError =
    | {
          GenericError: { message: string; error_code: bigint };
      }
    | { Duplicate: { duplicate_of: bigint } }
    | { NonExistingTokenId: null }
    | { Unauthorized: null }
    | { CreatedInFuture: { ledger_time: bigint } }
    | { InvalidRecipient: null }
    | { GenericBatchError: { message: string; error_code: bigint } }
    | { TooOld: null };
export type TransferFromResult = { Ok: bigint } | { Err: TransferFromError };
export interface _SERVICE {
    icrc37_approve_collection: ActorMethod<
        [Array<ApproveCollectionArg>],
        Array<[] | [ApproveCollectionError]>
    >;
    icrc37_approve_tokens: ActorMethod<
        [Array<ApproveTokenArg>],
        Array<[] | [ApproveTokenResult]>
    >;
    icrc37_get_collection_approvals: ActorMethod<
        [Account, [] | [CollectionApproval], [] | [bigint]],
        Array<CollectionApproval>
    >;
    icrc37_get_token_approvals: ActorMethod<
        [bigint, [] | [TokenApproval], [] | [bigint]],
        Array<TokenApproval>
    >;
    icrc37_is_approved: ActorMethod<[Array<IsApprovedArg>], Array<boolean>>;
    icrc37_max_approvals_per_token_or_collection: ActorMethod<
        [],
        [] | [bigint]
    >;
    icrc37_max_revoke_approvals: ActorMethod<[], [] | [bigint]>;
    icrc37_revoke_collection_approvals: ActorMethod<
        [Array<RevokeCollectionApprovalArg>],
        Array<[] | [RevokeCollectionApprovalResult]>
    >;
    icrc37_revoke_token_approvals: ActorMethod<
        [Array<RevokeTokenApprovalArg>],
        Array<[] | [RevokeTokenApprovalResponse]>
    >;
    icrc37_transfer_from: ActorMethod<
        [Array<TransferFromArg>],
        Array<[] | [TransferFromResult]>
    >;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: typeof IDL }) => IDL.Type[];
export const Subaccount = IDL.Vec(IDL.Nat8);
export const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(Subaccount)
});
export const ApprovalInfo = IDL.Record({
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Nat64,
    expires_at: IDL.Opt(IDL.Nat64),
    spender: Account
});
export const ApproveCollectionArg = IDL.Record({
    approval_info: ApprovalInfo
});
export const ApproveCollectionError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    InvalidSpender: IDL.Null,
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    GenericBatchError: IDL.Record({
        message: IDL.Text,
        error_code: IDL.Nat
    }),
    TooOld: IDL.Null
});
export const ApproveTokenArg = IDL.Record({
    token_id: IDL.Nat,
    approval_info: ApprovalInfo
});
export const ApproveTokenError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    InvalidSpender: IDL.Null,
    NonExistingTokenId: IDL.Null,
    Unauthorized: IDL.Null,
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    GenericBatchError: IDL.Record({
        message: IDL.Text,
        error_code: IDL.Nat
    }),
    TooOld: IDL.Null
});
export const ApproveTokenResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: ApproveTokenError
});
export const CollectionApproval = ApprovalInfo;
export const TokenApproval = IDL.Record({
    token_id: IDL.Nat,
    approval_info: ApprovalInfo
});
export const IsApprovedArg = IDL.Record({
    token_id: IDL.Nat,
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    spender: Account
});
export const RevokeCollectionApprovalArg = IDL.Record({
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    spender: IDL.Opt(Account)
});
export const RevokeCollectionApprovalError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    ApprovalDoesNotExist: IDL.Null,
    GenericBatchError: IDL.Record({
        message: IDL.Text,
        error_code: IDL.Nat
    }),
    TooOld: IDL.Null
});
export const RevokeCollectionApprovalResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: RevokeCollectionApprovalError
});
export const RevokeTokenApprovalArg = IDL.Record({
    token_id: IDL.Nat,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    spender: IDL.Opt(Account)
});
export const RevokeTokenApprovalError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    NonExistingTokenId: IDL.Null,
    Unauthorized: IDL.Null,
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    ApprovalDoesNotExist: IDL.Null,
    GenericBatchError: IDL.Record({
        message: IDL.Text,
        error_code: IDL.Nat
    }),
    TooOld: IDL.Null
});
export const RevokeTokenApprovalResponse = IDL.Variant({
    Ok: IDL.Nat,
    Err: RevokeTokenApprovalError
});
export const TransferFromArg = IDL.Record({
    to: Account,
    spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    token_id: IDL.Nat,
    from: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64)
});
export const TransferFromError = IDL.Variant({
    GenericError: IDL.Record({ message: IDL.Text, error_code: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    NonExistingTokenId: IDL.Null,
    Unauthorized: IDL.Null,
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    InvalidRecipient: IDL.Null,
    GenericBatchError: IDL.Record({
        message: IDL.Text,
        error_code: IDL.Nat
    }),
    TooOld: IDL.Null
});
export const TransferFromResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: TransferFromError
});
export const idlFactory: idlFactory = ({ IDL }) => {
    const Subaccount = IDL.Vec(IDL.Nat8);
    const Account = IDL.Record({
        owner: IDL.Principal,
        subaccount: IDL.Opt(Subaccount)
    });
    const ApprovalInfo = IDL.Record({
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Nat64,
        expires_at: IDL.Opt(IDL.Nat64),
        spender: Account
    });
    const ApproveCollectionArg = IDL.Record({ approval_info: ApprovalInfo });
    const ApproveCollectionError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        InvalidSpender: IDL.Null,
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        GenericBatchError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TooOld: IDL.Null
    });
    const ApproveTokenArg = IDL.Record({
        token_id: IDL.Nat,
        approval_info: ApprovalInfo
    });
    const ApproveTokenError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        InvalidSpender: IDL.Null,
        NonExistingTokenId: IDL.Null,
        Unauthorized: IDL.Null,
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        GenericBatchError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TooOld: IDL.Null
    });
    const ApproveTokenResult = IDL.Variant({
        Ok: IDL.Nat,
        Err: ApproveTokenError
    });
    const CollectionApproval = ApprovalInfo;
    const TokenApproval = IDL.Record({
        token_id: IDL.Nat,
        approval_info: ApprovalInfo
    });
    const IsApprovedArg = IDL.Record({
        token_id: IDL.Nat,
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        spender: Account
    });
    const RevokeCollectionApprovalArg = IDL.Record({
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        spender: IDL.Opt(Account)
    });
    const RevokeCollectionApprovalError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        ApprovalDoesNotExist: IDL.Null,
        GenericBatchError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TooOld: IDL.Null
    });
    const RevokeCollectionApprovalResult = IDL.Variant({
        Ok: IDL.Nat,
        Err: RevokeCollectionApprovalError
    });
    const RevokeTokenApprovalArg = IDL.Record({
        token_id: IDL.Nat,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64),
        spender: IDL.Opt(Account)
    });
    const RevokeTokenApprovalError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        NonExistingTokenId: IDL.Null,
        Unauthorized: IDL.Null,
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        ApprovalDoesNotExist: IDL.Null,
        GenericBatchError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TooOld: IDL.Null
    });
    const RevokeTokenApprovalResponse = IDL.Variant({
        Ok: IDL.Nat,
        Err: RevokeTokenApprovalError
    });
    const TransferFromArg = IDL.Record({
        to: Account,
        spender_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
        token_id: IDL.Nat,
        from: Account,
        memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
        created_at_time: IDL.Opt(IDL.Nat64)
    });
    const TransferFromError = IDL.Variant({
        GenericError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
        NonExistingTokenId: IDL.Null,
        Unauthorized: IDL.Null,
        CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
        InvalidRecipient: IDL.Null,
        GenericBatchError: IDL.Record({
            message: IDL.Text,
            error_code: IDL.Nat
        }),
        TooOld: IDL.Null
    });
    const TransferFromResult = IDL.Variant({
        Ok: IDL.Nat,
        Err: TransferFromError
    });
    return IDL.Service({
        icrc37_approve_collection: IDL.Func(
            [IDL.Vec(ApproveCollectionArg)],
            [IDL.Vec(IDL.Opt(ApproveCollectionError))],
            []
        ),
        icrc37_approve_tokens: IDL.Func(
            [IDL.Vec(ApproveTokenArg)],
            [IDL.Vec(IDL.Opt(ApproveTokenResult))],
            []
        ),
        icrc37_get_collection_approvals: IDL.Func(
            [Account, IDL.Opt(CollectionApproval), IDL.Opt(IDL.Nat)],
            [IDL.Vec(CollectionApproval)],
            ['query']
        ),
        icrc37_get_token_approvals: IDL.Func(
            [IDL.Nat, IDL.Opt(TokenApproval), IDL.Opt(IDL.Nat)],
            [IDL.Vec(TokenApproval)],
            ['query']
        ),
        icrc37_is_approved: IDL.Func(
            [IDL.Vec(IsApprovedArg)],
            [IDL.Vec(IDL.Bool)],
            ['query']
        ),
        icrc37_max_approvals_per_token_or_collection: IDL.Func(
            [],
            [IDL.Opt(IDL.Nat)],
            ['query']
        ),
        icrc37_max_revoke_approvals: IDL.Func(
            [],
            [IDL.Opt(IDL.Nat)],
            ['query']
        ),
        icrc37_revoke_collection_approvals: IDL.Func(
            [IDL.Vec(RevokeCollectionApprovalArg)],
            [IDL.Vec(IDL.Opt(RevokeCollectionApprovalResult))],
            []
        ),
        icrc37_revoke_token_approvals: IDL.Func(
            [IDL.Vec(RevokeTokenApprovalArg)],
            [IDL.Vec(IDL.Opt(RevokeTokenApprovalResponse))],
            []
        ),
        icrc37_transfer_from: IDL.Func(
            [IDL.Vec(TransferFromArg)],
            [IDL.Vec(IDL.Opt(TransferFromResult))],
            []
        )
    });
};
export const init: init = () => {
    return [];
};
