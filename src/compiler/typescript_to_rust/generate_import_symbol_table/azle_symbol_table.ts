import * as ts from 'typescript';
import { SymbolTable } from '../../utils/types';
import { processSymbol } from './process_symbol';
import { Result, match } from '../../../lib';

export function generateAzleSymbolTableFromTsSymbolTable(
    tsSymbolTable: ts.SymbolTable,
    program: ts.Program
): SymbolTable {
    let symbolTable = generateEmptyAzleSymbolTable();
    tsSymbolTable.forEach((symbol, name) => {
        const subSymbolTable = processSymbol(name as string, symbol, program);
        if (subSymbolTable) {
            symbolTable = mergeSymbolTables(symbolTable, subSymbolTable);
        }
    });

    return symbolTable;
}

export function generateSingleEntryAzleSymbolTable(
    originalName: string,
    name: string
): Result<SymbolTable, string> {
    const symbolTable = generateEmptyAzleSymbolTable();
    const keyResult = stringToSymbolTableKey(name);
    return match(keyResult, {
        Ok: (key) => {
            return Result.Ok<SymbolTable, string>({
                ...symbolTable,
                [key]: [...symbolTable[key], originalName]
            });
        },
        Err: (err) => Result.Err<SymbolTable, string>(err)
    });
}

export function prependNamespaceToSymbolTable(
    symbolTable: SymbolTable,
    namespace: ts.NamespaceImport | ts.NamespaceExport
): SymbolTable {
    const prependString = namespace.name.text;
    return Object.entries(symbolTable).reduce(
        (acc, [propertyName, propertyValue]) => {
            return {
                ...acc,
                [propertyName as keyof SymbolTable]: propertyValue.map(
                    (value) => `${prependString}.${value}`
                )
            };
        },
        {} as SymbolTable
    );
}

export function renameSymbolTable(
    symbolTable: SymbolTable,
    newPrefix: string
): SymbolTable {
    return Object.entries(symbolTable).reduce(
        (acc, [propertyName, propertyValue]) => {
            return {
                ...acc,
                [propertyName as keyof SymbolTable]: propertyValue.map(
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
        {} as SymbolTable
    );
}

export function mergeSymbolTables(
    symbolTable1: SymbolTable,
    symbolTable2: SymbolTable
): SymbolTable {
    const mergedSymbolTable: SymbolTable = { ...symbolTable1 };

    // return Object.keys(symbolTable1).reduce((acc, [key]) => {
    //     let arr1 = symbolTable1[key as keyof SymbolTable];
    //     console.log(arr1);
    //     let arr2 = symbolTable2[key as keyof SymbolTable];
    //     return {
    //         ...acc,
    //         [key]: [...arr1, ...arr2]
    //     };
    // }, {} as SymbolTable);

    for (const propertyName in symbolTable2) {
        const propertyValue2 = symbolTable2[propertyName as keyof SymbolTable];
        const existingPropertyValue =
            mergedSymbolTable[propertyName as keyof SymbolTable];

        if (
            Array.isArray(existingPropertyValue) &&
            Array.isArray(propertyValue2)
        ) {
            mergedSymbolTable[propertyName as keyof SymbolTable] =
                existingPropertyValue.concat(propertyValue2);
        } else {
            mergedSymbolTable[propertyName as keyof SymbolTable] =
                propertyValue2;
        }
    }

    return mergedSymbolTable;
}

export function generateEmptyAzleSymbolTable(): SymbolTable {
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

export function generateDefaultAzleSymbolTable(): SymbolTable {
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
const SYMBOL_TABLE_KEYS: {
    [key: string]: keyof SymbolTable;
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

function stringToSymbolTableKey(
    name: string
): Result<keyof SymbolTable, string> {
    // Make sure that it's a name we can convert
    if (!(name in SYMBOL_TABLE_KEYS)) {
        return Result.Err(`${name} is not a valid Azle Symbol`);
    }
    return Result.Ok(SYMBOL_TABLE_KEYS[name]);
}
