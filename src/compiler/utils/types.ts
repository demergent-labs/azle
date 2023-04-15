export type AzleError = {
    error?: string;
    suggestion?: string;
    exitCode?: number;
};

export type DfxJson = Readonly<{
    canisters: Readonly<{
        [key: string]: JSCanisterConfig;
    }>;
}>;

export type JavaScript = string;

export type JSCanisterConfig = Readonly<{
    type: 'custom';
    build: string;
    root: string;
    ts: string;
    candid: string;
    wasm: string;
}>;

export type RunOptions = {
    rootPath: string;
};

export type Rust = string;

export type Toml = string;

export type TsCompilationError = {
    stack: string;
    message: string;
    errors: TsSyntaxError[];
    warnings: unknown[];
};

export type TsSyntaxErrorLocation = {
    column: number;
    file: string;
    length: number;
    line: number;
    lineText: string;
    namespace: string;
    suggestion: string;
};

export type TsSyntaxError = {
    detail?: unknown;
    location: TsSyntaxErrorLocation;
    notes: unknown[];
    pluginName: string;
    text: string;
};

export type TypeScript = string;
