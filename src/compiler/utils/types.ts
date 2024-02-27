import { RequireExactlyOne } from '../../lib';

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
    main: string;
    build: string;
    build_assets?: string;
    candid: string;
    candid_gen?: CandidGen;
    wasm: string;
    env?: string[];
    opt_level?: OptLevel;
    assets?: [string, string][];
    assets_large?: [string, string][];
}>;

export type OptLevel = '0' | '1' | '2' | '3' | '4';

export type CandidGen = 'automatic' | 'custom' | 'http';

export type CompilerInfo = {
    canister_methods: CanisterMethods;
    env_vars: [string, string][];
};

export type CanisterMethods = {
    candid: string;
    queries: CanisterMethod[];
    updates: CanisterMethod[];
    init?: CanisterMethod;
    pre_upgrade?: CanisterMethod;
    post_upgrade?: CanisterMethod;
    heartbeat?: CanisterMethod;
    inspect_message?: CanisterMethod;
    callbacks: {
        [key: string]: (...args: any) => any;
    };
};

export type CanisterMethod = {
    name: string;
    composite?: boolean;
    guard?: () => void;
};

export type Plugin = {
    path: string;
    register_function: string;
};

export type RunOptions = {
    rootPath: string;
};

export type Rust = string;

export type SpawnSyncError = RequireExactlyOne<{
    Error: string;
    Signal: NodeJS.Signals;
    Status: number;
}>;

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
