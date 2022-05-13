export type Candid = string;

export type CandidTypeInfo = {
    text: string;
    typeName: string;
    typeClass: CandidTypeClass;
};

export type CandidTypeClass = 'primitive' | 'vec' | 'opt' | 'func' | 'record' | 'inline_record' | 'inline_tuple_record' | 'variant' | 'inline_variant';

export type CanisterMethodTypeName =
    'Query' |
    // 'QueryAsync' | // TODO enable once this is resolved: https://forum.dfinity.org/t/inter-canister-query-calls-community-consideration/6754
    'Update' |
    'UpdateAsync' |
    'Init' |
    'Heartbeat' |
    'PreUpgrade' |
    'PostUpgrade';

export type DfxJson = Readonly<{
    canisters: Readonly<{
        [key: string]: JSCanisterConfig;
    }>;
}>;

export type JavaScript = string;

type JSCanisterConfig = Readonly<{
    type: 'custom';
    build: string;
    root: string;
    ts: string;
    candid: string;
    wasm: string;
}>;

export type Rust = string;

export type Toml = string;

export type TypeScript = string;

export type CallFunctionInfo = {
    functionName: string;
    params: {
        paramName: string;
        paramType: string;
    }[];
    text: Rust;
};

export type StableStorageVariableInfo = {
    name: string;
    rustType: string;
    migrate: boolean;
};