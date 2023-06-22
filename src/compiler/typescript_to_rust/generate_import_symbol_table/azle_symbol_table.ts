import * as ts from 'typescript';
import { SymbolTable } from '../../utils/types';
import { processSymbol } from './process_symbol';

export function toAzleSymbolTable(
    tsSymbolTable: ts.SymbolTable,
    program: ts.Program
): SymbolTable {
    let symbolTable = createEmptyAzleSymbolTable();
    tsSymbolTable.forEach((symbol, name) => {
        const subSymbolTable = processSymbol(name, symbol, program);
        if (subSymbolTable) {
            symbolTable = mergeSymbolTables(symbolTable, subSymbolTable);
        }
    });
    return symbolTable;
}

export function createSingleEntrySymbolTable(
    originalName: ts.__String,
    name: ts.__String
): SymbolTable | undefined {
    const symbolTable = createEmptyAzleSymbolTable();
    try {
        const key = stringToSymbolTableKey(name);
        symbolTable[key].push(originalName as string);
        return symbolTable;
    } catch {
        // The key isn't part of the azle symbol table
        return;
    }
}

export function prependNamespaceToSymbolTable(
    symbolTable: SymbolTable,
    namespace: ts.NamespaceImport | ts.NamespaceExport
): SymbolTable {
    const prependString = namespace.name.text;
    return Object.entries(symbolTable).reduce(
        (acc, [propertyName, propertyValue]) => {
            acc[propertyName as keyof SymbolTable] = propertyValue.map(
                (value) => `${prependString}.${value}`
            );
            return acc;
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
            acc[propertyName as keyof SymbolTable] = propertyValue.map(
                (value) => {
                    const indexOfDotOperator = value.indexOf('.');
                    if (indexOfDotOperator !== -1) {
                        return value.replace(/^[^.]+/, newPrefix);
                    }
                    return value;
                }
            );
            return acc;
        },
        {} as SymbolTable
    );
}

export function mergeSymbolTables(
    symbolTable1: SymbolTable,
    symbolTable2: SymbolTable
): SymbolTable {
    const mergedSymbolTable: SymbolTable = { ...symbolTable1 };

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

export function createEmptyAzleSymbolTable(): SymbolTable {
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

export function createDefaultSymbolTable(): SymbolTable {
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

function stringToSymbolTableKey(name: ts.__String): keyof SymbolTable {
    switch (name) {
        case 'Alias':
            return 'alias';
        case 'CallResult':
            return 'call_result';
        case 'blob':
            return 'blob';
        case 'bool':
            return 'bool';
        case 'empty':
            return 'empty';
        case 'float32':
            return 'float32';
        case 'float64':
            return 'float64';
        case 'Func':
            return 'func';
        case 'GuardResult':
            return 'guard_result';
        case '$heartbeat':
            return 'heartbeat_decorator';
        case '$init':
            return 'init_decorator';
        case '$inspectMessage':
            return 'inspect_message_decorator';
        case 'int':
            return 'int';
        case 'int8':
            return 'int8';
        case 'int16':
            return 'int16';
        case 'int32':
            return 'int32';
        case 'int64':
            return 'int64';
        case 'Manual':
            return 'manual';
        case 'nat':
            return 'nat';
        case 'nat8':
            return 'nat8';
        case 'nat16':
            return 'nat16';
        case 'nat32':
            return 'nat32';
        case 'nat64':
            return 'nat64';
        case 'null':
            return 'null';
        case 'Oneway':
            return 'oneway_mode';
        case 'Opt':
            return 'opt';
        case '$postUpgrade':
            return 'post_upgrade_decorator';
        case '$preUpgrade':
            return 'pre_upgrade_decorator';
        case 'Principal':
            return 'principal';
        case '$query':
            return 'query_decorator';
        case 'Query':
            return 'query_mode';
        case 'Record':
            return 'record';
        case 'reserved':
            return 'reserved';
        case 'Service':
            return 'service';
        case 'serviceQuery':
            return 'service_query_decorator';
        case 'serviceUpdate':
            return 'service_update_decorator';
        case 'StableBTreeMap':
            return 'stable_b_tree_map';
        case 'text':
            return 'text';
        case 'Tuple':
            return 'tuple';
        case '$update':
            return 'update_decorator';
        case 'Update':
            return 'update_mode';
        case 'Variant':
            return 'variant';
        case 'Vec':
            return 'vec';
        case 'void':
            return 'void';
        default:
            throw `IMPORTANT: We couldn't find ${name}`;
    }
}
