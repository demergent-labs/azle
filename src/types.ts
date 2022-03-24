export type Candid = string;

export type CandidTypeInfo = {
    text: string;
    typeName: string;
    typeClass: CandidTypeClass;
};

export type CandidTypeClass = 'primitive' | 'vec' | 'opt' | 'record' | 'inline_record' | 'variant' | 'inline_variant';

export type CanisterMethodTypeName = 'Query' | 'QueryAsync' | 'Update' | 'UpdateAsync'; // TODO we will also have Heartbeat, Init, PreUpgrade, PostUpgrade, Canister, etc

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