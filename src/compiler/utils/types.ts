import { RequireExactlyOne } from '../../lib/experimental';
import { ConsumerConfig } from '../get_consumer_config';

export type AzleError = {
    error?: string;
    suggestion?: string;
    exitCode?: number;
};

export type DfxJson = Readonly<{
    canisters: Readonly<{
        [key: string]: CanisterConfig;
    }>;
}>;

export type JavaScript = string;

export type CanisterConfig = Readonly<{
    type: 'azle';
    main: string;
    build?: string;
    build_assets?: string;
    candid?: string;
    candid_gen?: CandidGen;
    wasm?: string;
    env?: string[];
    opt_level?: OptLevel;
    assets?: [string, string][];
    esm_aliases?: Record<string, string>;
    esm_externals?: string[];
    // TODO we should move all custom properties into custom in a subsequent PR
    custom?: {
        experimental?: boolean;
        openValueSharing?: ConsumerConfig;
    };
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
    index: number;
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
