export type Candid = string;
export type CandidTypeName = {
    text: string;
    typeName: string;
    typeClass: 'primitive' | 'vec' | 'opt' | 'record' | 'variant';
};
export type JavaScript = string;
export type RecordOrVariant = 'record' | 'variant';
export type Rust = string;
export type TypeScript = string;