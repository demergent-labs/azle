export { StringLiteral as ModuleSpecifier } from 'typescript';
export type GenerationType = 'LIST' | 'TABLE';
export type AliasList = string[];
export type AliasLists = { [filename: string]: AliasList };

export type AliasTables = { [filename: string]: AliasTable };

export type AliasListsOrTables = {
    [filename: string]: AliasTable | AliasList;
};

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
