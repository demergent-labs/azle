import * as ts from 'typescript';
import { AliasTable } from '../../utils/types';
import { processSymbol } from './process_symbol';

export function generateAliasTableFromSymbolTable(
    symbolTable: ts.SymbolTable,
    program: ts.Program
): AliasTable {
    let aliasTable = generateEmptyAliasTable();
    symbolTable.forEach((symbol, name) => {
        const subAliasTable = processSymbol(name as string, symbol, program);
        if (subAliasTable) {
            aliasTable = mergeAliasTables(aliasTable, subAliasTable);
        }
    });

    return aliasTable;
}

export function generateSingleEntryAliasTable(
    originalName: string,
    name: string
): AliasTable | undefined {
    const aliasTable = generateEmptyAliasTable();
    const key = stringToAliasTableKey(name);
    if (key) {
        return {
            ...aliasTable,
            [key]: [...aliasTable[key], originalName]
        };
    }
}

export function prependNamespaceToAliasTable(
    aliasTable: AliasTable,
    namespace: ts.NamespaceImport | ts.NamespaceExport
): AliasTable {
    const prependString = namespace.name.text;
    return Object.entries(aliasTable).reduce(
        (acc, [propertyName, propertyValue]) => {
            return {
                ...acc,
                [propertyName as keyof AliasTable]: propertyValue.map(
                    (value) => `${prependString}.${value}`
                )
            };
        },
        {} as AliasTable
    );
}

export function renameAliasTable(
    aliasTable: AliasTable,
    newPrefix: string
): AliasTable {
    return Object.entries(aliasTable).reduce(
        (acc, [propertyName, propertyValue]) => {
            return {
                ...acc,
                [propertyName as keyof AliasTable]: propertyValue.map(
                    (value) => {
                        const indexOfDotOperator = value.indexOf('.');
                        if (indexOfDotOperator !== -1) {
                            return value.replace(/^[^.]+/, newPrefix);
                        }
                        return value;
                    }
                )
            };
        },
        {} as AliasTable
    );
}

export function mergeAliasTables(
    aliasTable1: AliasTable,
    aliasTable2: AliasTable
): AliasTable {
    return Object.entries(aliasTable1).reduce((acc, [key, value]) => {
        return {
            ...acc,
            [key]: [...value, ...aliasTable2[key as keyof AliasTable]]
        };
    }, {} as AliasTable);
}

export function generateEmptyAliasTable(): AliasTable {
    return {
        alias: [],
        call_result: [],
        blob: [],
        bool: [],
        empty: [],
        float32: [],
        float64: [],
        func: [],
        guard_result: [],
        heartbeat_decorator: [],
        init_decorator: [],
        inspect_message_decorator: [],
        int: [],
        int8: [],
        int16: [],
        int32: [],
        int64: [],
        manual: [],
        nat: [],
        nat8: [],
        nat16: [],
        nat32: [],
        nat64: [],
        null: [],
        oneway_mode: [],
        opt: [],
        post_upgrade_decorator: [],
        pre_upgrade_decorator: [],
        principal: [],
        query_decorator: [],
        query_mode: [],
        record: [],
        reserved: [],
        service: [],
        service_query_decorator: [],
        service_update_decorator: [],
        stable_b_tree_map: [],
        text: [],
        tuple: [],
        update_decorator: [],
        update_mode: [],
        variant: [],
        vec: [],
        void: []
    };
}

export function generateDefaultAliasTable(): AliasTable {
    return {
        alias: ['Alias'],
        blob: ['blob'],
        bool: [],
        call_result: ['CallResult'],
        empty: ['empty'],
        float32: ['float32'],
        float64: ['float64'],
        func: ['Func'],
        guard_result: ['GuardResult'],
        heartbeat_decorator: ['$heartbeat'],
        init_decorator: ['$init'],
        inspect_message_decorator: ['$inspectMessage'],
        int: ['int'],
        int8: ['int8'],
        int16: ['int16'],
        int32: ['int32'],
        int64: ['int64'],
        manual: ['Manual'],
        nat: ['nat'],
        nat8: ['nat8'],
        nat16: ['nat16'],
        nat32: ['nat32'],
        nat64: ['nat64'],
        null: [],
        oneway_mode: ['Oneway'],
        opt: ['Opt'],
        post_upgrade_decorator: ['$postUpgrade'],
        pre_upgrade_decorator: ['$preUpgrade'],
        principal: ['Principal'],
        query_decorator: ['$query'],
        query_mode: ['Query'],
        record: ['Record'],
        reserved: ['reserved'],
        service: ['Service'],
        service_query_decorator: ['serviceQuery'],
        service_update_decorator: ['serviceUpdate'],
        stable_b_tree_map: ['StableBTreeMap'],
        text: ['text'],
        tuple: ['Tuple'],
        update_decorator: ['$update'],
        update_mode: ['Update'],
        variant: ['Variant'],
        vec: ['Vec'],
        void: []
    };
}
const ALIAS_TABLE_KEYS: {
    [key: string]: keyof AliasTable;
} = {
    Alias: 'alias',
    CallResult: 'call_result',
    blob: 'blob',
    bool: 'bool',
    empty: 'empty',
    float32: 'float32',
    float64: 'float64',
    Func: 'func',
    GuardResult: 'guard_result',
    $heartbeat: 'heartbeat_decorator',
    $init: 'init_decorator',
    $inspectMessage: 'inspect_message_decorator',
    int: 'int',
    int8: 'int8',
    int16: 'int16',
    int32: 'int32',
    int64: 'int64',
    Manual: 'manual',
    nat: 'nat',
    nat8: 'nat8',
    nat16: 'nat16',
    nat32: 'nat32',
    nat64: 'nat64',
    null: 'null',
    Oneway: 'oneway_mode',
    Opt: 'opt',
    $postUpgrade: 'post_upgrade_decorator',
    $preUpgrade: 'pre_upgrade_decorator',
    Principal: 'principal',
    $query: 'query_decorator',
    Query: 'query_mode',
    Record: 'record',
    reserved: 'reserved',
    Service: 'service',
    serviceQuery: 'service_query_decorator',
    serviceUpdate: 'service_update_decorator',
    StableBTreeMap: 'stable_b_tree_map',
    text: 'text',
    Tuple: 'tuple',
    $update: 'update_decorator',
    Update: 'update_mode',
    Variant: 'variant',
    Vec: 'vec',
    void: 'void'
};

function stringToAliasTableKey(name: string): keyof AliasTable | undefined {
    // Make sure that it's a name we can convert
    if (!(name in ALIAS_TABLE_KEYS)) {
        return;
    }
    return ALIAS_TABLE_KEYS[name];
}
