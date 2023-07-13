import { Variant } from '../../lib';

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
    opt_level?: OptLevel;
}>;

export type OptLevel = '0' | '1' | '2' | '3' | '4';

export type CompilerInfo = {
    plugins: Plugin[];
    alias_tables: AliasTables;
    alias_lists: AliasLists;
    file_names: string[];
};

export type Plugin = {
    path: string;
    register_function: string;
};

export type AliasTables = { [filename: string]: AliasTable };
export type AliasLists = { [filename: string]: string[] };

export type AliasTable = {
    alias: string[];
    call_result: string[];
    blob: string[];
    bool: string[];
    empty: string[];
    float32: string[];
    float64: string[];
    func: string[];
    guard_result: string[];
    heartbeat_decorator: string[];
    init_decorator: string[];
    inspect_message_decorator: string[];
    int: string[];
    int8: string[];
    int16: string[];
    int32: string[];
    int64: string[];
    manual: string[];
    nat: string[];
    nat8: string[];
    nat16: string[];
    nat32: string[];
    nat64: string[];
    null: string[];
    oneway_mode: string[];
    opt: string[];
    post_upgrade_decorator: string[];
    pre_upgrade_decorator: string[];
    principal: string[];
    query_decorator: string[];
    query_mode: string[];
    record: string[];
    reserved: string[];
    service: string[];
    service_query_decorator: string[];
    service_update_decorator: string[];
    stable_b_tree_map: string[];
    text: string[];
    tuple: string[];
    update_decorator: string[];
    update_mode: string[];
    variant: string[];
    vec: string[];
    void: string[];
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
