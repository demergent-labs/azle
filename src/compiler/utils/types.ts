import { Variant } from '../../lib';
import {
    AliasTables,
    AliasLists
} from '../typescript_to_rust/type_alias_parsing/types';

export {
    AliasTables,
    AliasLists
} from '../typescript_to_rust/type_alias_parsing/types';

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
    env?: string[];
}>;

export type CompilerInfo = {
    plugins: Plugin[];
    alias_tables: AliasTables;
    alias_lists: AliasLists;
    file_names: string[];
    ts_root: string;
    canister_methods: CanisterMethods;
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

export type SpawnSyncError = Variant<{
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
