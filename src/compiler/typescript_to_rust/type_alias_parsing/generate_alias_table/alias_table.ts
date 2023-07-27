import * as ts from 'typescript';
import { AliasTable, GenerationType } from '../types';
import { generateAliasTableForSymbol } from './process_symbol';
import { isNullKeyword } from '../utils';

export function generateAliasTableFromSymbolTable(
    symbolTable: ts.SymbolTable,
    program: ts.Program,
    generationType: GenerationType
): AliasTable | undefined | string[] {
    if (generationType === 'LIST') {
        let aliasList: string[] = [];
        // ts.SymbolTable does not use regular iterator conventions thus it's
        // difficult to turn it into an array, so we have to use forEach instead of
        // reduce here
        symbolTable.forEach((symbol, name) => {
            if (isSymbolTypeAliasDeclaration(symbol)) {
                const result = generateAliasTableForSymbol(
                    symbol,
                    name as string,
                    program,
                    generationType
                );
                if (typeof result === 'boolean' && result) {
                    aliasList = [...aliasList, name as string];
                }
            }
        });

        return aliasList;
    }
    let aliasTable = EMPTY_ALIAS_TABLE;
    // ts.SymbolTable does not use regular iterator conventions thus it's
    // difficult to turn it into an array, so we have to use forEach instead of
    // reduce here
    symbolTable.forEach((symbol, name) => {
        const subAliasTable = generateAliasTableForSymbol(
            symbol,
            name as string,
            program,
            generationType
        );
        if (subAliasTable !== undefined && typeof subAliasTable !== 'boolean') {
            aliasTable = mergeAliasTables(aliasTable, subAliasTable);
        }
    });

    if (isEmpty(aliasTable)) {
        // If the alias table is empty return undefined.
        // We can skip processing a file if it has no alias table. That's easier
        // to determine with undefined than with an empty table
        return undefined;
    }
    return aliasTable;
}

function isSymbolTypeAliasDeclaration(symbol: ts.Symbol): boolean {
    const declarations = symbol.declarations;
    if (declarations === undefined || declarations.length !== 1) {
        return false;
    }
    let declaration = declarations[0];
    if (
        ts.isTypeAliasDeclaration(declaration) &&
        (ts.isTypeReferenceNode(declaration.type) ||
            isNullKeyword(declaration.type) ||
            declaration.type.kind === ts.SyntaxKind.NumberKeyword ||
            declaration.type.kind === ts.SyntaxKind.BigIntKeyword ||
            declaration.type.kind === ts.SyntaxKind.StringKeyword ||
            declaration.type.kind === ts.SyntaxKind.VoidKeyword ||
            declaration.type.kind === ts.SyntaxKind.BooleanKeyword)
    ) {
        return true;
    }
    return false;
}

export function generateSingleEntryAliasTable(
    name: string,
    alias: string
): AliasTable | undefined {
    const key = stringToAliasTableKey(name);
    if (key) {
        return {
            ...EMPTY_ALIAS_TABLE,
            [key]: [alias]
        };
    }
}

export function prependNamespaceToAliasTable(
    aliasTable: AliasTable,
    namespace: ts.NamespaceImport | ts.NamespaceExport
): AliasTable {
    const prependString = namespace.name.text;
    return Object.entries(aliasTable).reduce((acc, [azleName, aliases]) => {
        return {
            ...acc,
            [azleName as keyof AliasTable]: aliases.map(
                (value) => `${prependString}.${value}`
            )
        };
    }, EMPTY_ALIAS_TABLE);
}

export function renameAliasTable(
    aliasTable: AliasTable,
    newPrefix: string
): AliasTable {
    return Object.entries(aliasTable).reduce((acc, [azleName, aliases]) => {
        return {
            ...acc,
            [azleName as keyof AliasTable]: aliases.map((value) => {
                const indexOfDotOperator = value.indexOf('.');
                if (indexOfDotOperator !== -1) {
                    return value.replace(/^[^.]+/, newPrefix);
                }
                return value;
            })
        };
    }, EMPTY_ALIAS_TABLE);
}

export function mergeAliasTables(
    aliasTable1: AliasTable,
    aliasTable2: AliasTable
): AliasTable {
    return Object.entries(aliasTable1).reduce((acc, [azleName, aliases]) => {
        return {
            ...acc,
            [azleName]: [
                ...aliases,
                ...aliasTable2[azleName as keyof AliasTable]
            ]
        };
    }, EMPTY_ALIAS_TABLE);
}

function isEmpty(aliasTable: AliasTable): boolean {
    return Object.values(aliasTable).every((aliases) => aliases.length === 0);
}

export const EMPTY_ALIAS_TABLE: AliasTable = {
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

export const DEFAULT_ALIAS_TABLE: AliasTable = {
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
    Duration: 'nat64',
    TimerId: 'nat64',
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
        return undefined;
    }
    return ALIAS_TABLE_KEYS[name];
}
