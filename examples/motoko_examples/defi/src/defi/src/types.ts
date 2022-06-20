import {
    Canister,
    CanisterResult,
    nat,
    nat32,
    nat8,
    Opt,
    Principal,
    Variant
} from 'azle';

export type Token = Principal;

export type OrderId = nat32;

export type Order = {
    id: OrderId;
    owner: Principal;
    from: Token;
    fromAmount: nat;
    to: Token;
    toAmount: nat;
};

// ledger types
export type Operation = Variant<{
    approve: null;
    mint: null;
    transfer: null;
    transferFrom: null;
}>;

export type TransactionStatus = Variant<{
    succeeded: null;
    failed: null;
}>;

export type TxRecord = {
    caller?: Opt<Principal>;
    op: Operation; // operation type
    index: nat; // transaction index
    from: Principal;
    to: Principal;
    amount: nat;
    fee: nat;
    timestamp: nat;
    status: TransactionStatus;
};

// Dip20 token interface
export type TxReceipt = Variant<{
    Ok: nat;
    Err: Variant<{
        InsufficientAllowance: null;
        InsufficientBalance: null;
        ErrorOperationStyle: null;
        Unauthorized: null;
        LedgerTrap: null;
        ErrorTo: null;
        Other: null;
        BlockUsed: null;
        AmountTooSmall: null;
    }>;
}>;

export type Metadata = {
    logo: string; // base64 encoded logo or logo url
    name: string; // token name
    symbol: string; // token symbol
    decimals: nat8; // token decimal
    totalSupply: nat; // token total supply
    owner: Principal; // token owner
    fee: nat; // fee for update calls
};

export type DIPInterface = Canister<{
    transfer(to: Principal, amount: nat): CanisterResult<TxReceipt>;
    transferFrom(
        from: Principal,
        to: Principal,
        amount: nat
    ): CanisterResult<TxReceipt>;
    allowance(owner: Principal, spender: Principal): CanisterResult<nat>;
    getMetadata(): CanisterResult<Metadata>;
}>;

// return types
export type OrderPlacementErr = Variant<{
    InvalidOrder: null;
    OrderBookFull: null;
}>;
export type OrderPlacementReceipt = Variant<{
    Ok?: Opt<Order>;
    Err: OrderPlacementErr;
}>;
export type CancelOrderErr = Variant<{
    NotExistingOrder: null;
    NotAllowed: null;
}>;
export type CancelOrderReceipt = Variant<{
    Ok: OrderId;
    Err: CancelOrderErr;
}>;
export type WithdrawErr = Variant<{
    BalanceLow: null;
    TransferFailure: null;
}>;
export type WithdrawReceipt = Variant<{
    Ok: nat;
    Err: WithdrawErr;
}>;
export type DepositErr = Variant<{
    BalanceLow: null;
    TransferFailure: null;
}>;
export type DepositReceipt = Variant<{
    Ok: nat;
    Err: DepositErr;
}>;
export type Balance = Variant<{
    owner: Principal;
    token: Token;
    amount: nat;
}>;
