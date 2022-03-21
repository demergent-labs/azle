export type Candid = string;

export type CandidTypeName = {
    text: string;
    typeName: string;
    typeClass: 'primitive' | 'vec' | 'opt' | 'record' | 'variant';
};

export type CanisterMethodTypeName = 'Query' | 'Update'; // TODO we will also have Heartbeat, Init, PreUpgrade, PostUpgrade, Canister, etc

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

export type RecordOrVariant = 'record' | 'variant';

export type Rust = string;

export type Toml = string;

export type TypeScript = string;